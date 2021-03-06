<?php
require_once("environment.php");

// TODO: get the award_type, got_award, gave_award value from $_POST

// $award_type = 2;
// $got_award = 6;
// $gave_award = 2;

$award_type = $_POST['award_type'];
$got_award = $_POST['got_award'];
$gave_award = $_POST['gave_award'];


if ($environment == 'development') {
    require_once("db-development.php");
} else {
   require_once("db-production.php"); 
}

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT first_name AS got_award_first, last_name AS got_award_last, email AS got_award_email, (SELECT first_name FROM Employee WHERE Employee.id = {$gave_award})AS gave_award_first, (SELECT last_name FROM Employee WHERE Employee.id = {$gave_award})AS gave_award_last, (SELECT image FROM Employee WHERE Employee.id = {$gave_award}) AS image, (SELECT award_name FROM Award_Types WHERE Award_Types.id = {$award_type})AS award_name FROM Employee WHERE Employee.id = {$got_award}";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $name = $row["got_award_first"] . " " . $row["got_award_last"];
        $award = $row["award_name"];
        $officer = $row["gave_award_first"] . " " . $row["gave_award_last"];
        $got_award_email = $row["got_award_email"];
        $image = $row["image"];
    }
} else {
    echo "no results";
}


$conn->close();


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

// $str.= "This award is presented to  \textbf{" . $name . "} for";
$str .= "\begin{large}\n";
$str .= "Authorized by\n";
$str .= "\\end{large}\n\n";

$str .= "\includegraphics[width=0.2\\textwidth, left]{{$image}}\n\n";

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
echo $cert_link;

if ($environment == 'development') {
    shell_exec("/Library/TeX/texbin/pdflatex -output-directory=pdf -jobname={$output_filename} {$file}");
} else {
    shell_exec("/usr/bin/pdflatex -output-directory=pdf -jobname={$output_filename} {$file}");
}

// send email
include 'email/mail.php'

?>