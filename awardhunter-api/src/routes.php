<?php

use Slim\Http\Request;
use Slim\Http\Response;

// Reference
// https://arjunphp.com/creating-restful-api-slim-framework/

// get award type
$app->get('/award_types', function ($request, $response, $args) {
  $sth = $this->db->prepare("SELECT * FROM Award_Types");
  $sth->execute();
  $award_types = $sth->fetchAll();
  return $this->response->withJson($award_types);
});

// get all departments
$app->get('/departments', function ($request, $response, $args) {
  $sth = $this->db->prepare("SELECT * FROM Departments");
  $sth->execute();
  $departments = $sth->fetchAll();
  return $this->response->withJson($departments);
});

// get all users
$app->get('/users', function ($request, $response, $args) {
  $sth = $this->db->prepare("SELECT * FROM Employee WHERE account_type = 1");
  $sth->execute();
  $users = $sth->fetchAll();
  return $this->response->withJson($users);
});


// get all admins
$app->get('/admins', function ($request, $response, $args) {
  $sth = $this->db->prepare("SELECT * FROM Employee WHERE account_type = 2");
  $sth->execute();
  $users = $sth->fetchAll();
  return $this->response->withJson($users);
});


// get a user with id 
$app->get('/users/[{id}]', function ($request, $response, $args) {
  $sth = $this->db->prepare("SELECT * FROM Employee WHERE id=:id");
  $sth->bindParam("id", $args['id']);
  $sth->execute();
  $users = $sth->fetchObject();
  return $this->response->withJson($users);
});


// Add a new user
$app->post('/user', function ($request, $response) {
  $input = $request->getParsedBody();
  $sql = "INSERT INTO Employee (first_name, last_name, email, password, department, image, account_type) VALUES (:first_name, :last_name, :email, :password, :department, :image, :account_type)";
  $sth = $this->db->prepare($sql);
  $sth->bindParam("first_name", $input['first_name']);
  $sth->bindParam("last_name", $input['last_name']);
  $sth->bindParam("email", $input['email']);
  $sth->bindParam("password", $input['password']);
  $sth->bindParam("department", $input['department']);
  $sth->bindParam("image", $input['image']);
  $sth->bindParam("account_type", $input['account_type']);
  $sth->execute();
  $input['id'] = $this->db->lastInsertId();
  return $this->response->withJson($input);
});

// DELETE a user with given id
$app->delete('/users/[{id}]', function ($request, $response, $args) {
  $sth = $this->db->prepare("DELETE FROM Employee WHERE id=:id");
  $sth->bindParam("id", $args['id']);
  $sth->execute();
  // $users = $sth->fetchAll();
  // return $this->response->withJson($users);
  // return $this->response->withStatus(200);
});

// Update a user with given id
$app->put('/users/[{id}]', function ($request, $response, $args) {
  $input = $request->getParsedBody();
  $sql = "UPDATE Employee SET first_name=:first_name, last_name=:last_name, email=:email, password=:password, department=:department, image=:image WHERE id=:id";
  $sth = $this->db->prepare($sql);
  $sth->bindParam("id", $args['id']);
  $sth->bindParam("first_name", $input['first_name']);
  $sth->bindParam("last_name", $input['last_name']);
  $sth->bindParam("email", $input['email']);
  $sth->bindParam("password", $input['password']);
  $sth->bindParam("department", $input['department']);
  $sth->bindParam("image", $input['image']);
  $sth->execute();
  $input['id'] = $args['id'];
  return $this->response->withJson($input);
});

// get awards
$app->get('/awards', function ($request, $response) {
  $sql = "SELECT award_name, A.first_name AS got_award_first_name, A.last_name AS got_award_last_name, depo_name AS got_award_department, B.first_name AS gave_award_first_name, B.last_name AS gave_award_last_name FROM Awards INNER JOIN Award_Types ON Award_Types.id = Awards.award_type INNER JOIN Employee A ON Awards.got_award = A.id INNER JOIN Employee B ON Awards.gave_award = B.id INNER JOIN Departments ON Departments.id = A.department";
  $sth = $this->db->prepare($sql);
  $sth->execute();
  $results = $sth->fetchAll();
  return $this->response->withJson($results);
});

// create a new award and send email
$app->post('/awards', function ($request, $response) {
  // TODO: change it back to production
  $environment = 'development';

  // insert into Awards
  $input = $request->getParsedBody();
  
  $sql = "INSERT INTO Awards (award_type, got_award, gave_award) VALUES (:award_type, :got_award, :gave_award)";
  $sth = $this->db->prepare($sql);
  $sth->bindParam("award_type", $input['award_type']);
  $sth->bindParam("got_award", $input['got_award']);
  $sth->bindParam("gave_award", $input['gave_award']);
  $sth->execute();
  $input['id'] = $this->db->lastInsertId();

  // find the relevant data
  $sql2 = "SELECT first_name AS got_award_first, last_name AS got_award_last, email AS got_award_email, (SELECT first_name FROM Employee WHERE Employee.id = :gave_award) AS gave_award_first, (SELECT last_name FROM Employee WHERE Employee.id = :gave_award) AS gave_award_last, (SELECT image FROM Employee WHERE Employee.id = :gave_award) AS image, (SELECT award_name FROM Award_Types WHERE Award_Types.id = :award_type) AS award_name FROM Employee WHERE Employee.id = :got_award";
  $sth2 = $this->db->prepare($sql2);
  $sth2->bindParam("award_type", $input['award_type']);
  $sth2->bindParam("got_award", $input['got_award']);
  $sth2->bindParam("gave_award", $input['gave_award']);
  $sth2->execute();
  $results = $sth2->fetchAll();
  $result = $results[0];
  $name = $result["got_award_first"] . " " . $result["got_award_last"];
  $award = $result["award_name"];
  $officer = $result["gave_award_first"] . " " . $result["gave_award_last"];
  $got_award_email = $result["got_award_email"];
  $image = $result["image"];

  // generate the latex
  // generate latex file
  $output_filename = uniqid();
  $file = "pdf/{$output_filename}.tex";

  $str = "\documentclass{slides}\n";
  $str .= "\\nofiles\n";
  $str .= "\usepackage{lscape}\n";
  $str .= "\usepackage{graphicx}\n";
  $str .= "\pagenumbering{gobble}\n";
  $str .= "\graphicspath{ {} }\n";
  $str .= "\usepackage[export]{adjustbox}\n\n";

  $str .= "\begin{document}\n";
  $str .= "\begin{landscape}\n";
  $str .= "\begin{center}\n";
  $str .= "\begin{Huge}\n";
  $str .= "Award Certificate\n";
  $str .= "\\end{Huge}\n";
  $str .= "\linebreak[0]\\end{center}\n\n";

  $str .= "\begin{large}\n";
  $str .= "This award is presented to \\textbf{{$name}} for \\textbf{{$award}}\n";
  $str .= "\\end{large}\n\n";

  $str .= "\begin{large}\n";
  $str .= "Authorized by\n";
  $str .= "\\end{large}\n\n";

  if ($image != "") {
    $str .= "\includegraphics[width=0.2\\textwidth, left]{{$image}}\n\n";  
  }

  $str .= "\begin{large}\n";
  $str .= "\\textbf{{$officer}}\n";
  $str .= "\\end{large}\n\n";

  $str .= "\begin{flushright}\n";
  $str .= "date\n";
  $str .= "\\end{flushright}\n\n";

  $str .= "\\end{landscape}\n";
  $str .= "\\end{document}\n";

  file_put_contents($file, $str);

  // exec shell command
  $cert_link = "<a href=\"http://{$_SERVER['HTTP_HOST']}/pdf/{$output_filename}.pdf\">Certificate</a>";

  if ($environment == 'development') {
      shell_exec("/Library/TeX/texbin/pdflatex -output-directory=pdf -jobname={$output_filename} {$file}");
  } else {
      shell_exec("/usr/bin/pdflatex -output-directory=pdf -jobname={$output_filename} {$file}");
  }

  // send email
  include 'email/mail.php';

  // return $this->response->withJson($input);
  return $this->response->withJson($result);
});
