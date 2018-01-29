import React from 'react';

class newUserPage extends React.Component {
    render() {
        return(
            <div>
                <p>New User Page!</p>
                <p>New User page info here!</p> 
					<span>
						<button type="button" class="btn">Already have and user name? Sign in here</button>
					</span>
					<br>
					<br>
						<table>
							<tbody>
								<tr>
									<th>User Name: </th>
										<td><input type="text" name="userName" id="userName" value size="30"></td>
								</tr>
								<tr>
									<th>Password: </th>
										<td><input type="text" name="password" id="password" value size="30"></td>
								</tr>
								<tr>
									<th>Retype Password: </th>
									<td><input type="text" name="retypePassword" id="retypePassword" value size="30"></td>
								</tr>
								<tr>
									<th>Email Address: </th>
									<td><input type="text" name="email" id="email" value size="30"></td>
								</tr>
								<tr>
									<th>First Name: </th>
									<td><input type="text" name="firstName" id="firstName" value size="30"></td>
								</tr>
								<tr>
									<th>Last Name: </th>
									<td><input type="text" name="lastName" id="lastName" value size="30"></td>
								</tr>	
								<tr>
									<th>Profile Picture</th>
									<td>
										<span>
											<button type="button" class="btn btn-default">Upload</button>
										</span>
									</td>
								</tr>
								<tr>
									<th></th>
									<td>
										<span>
											<button type="button" class="btn btn-primary">Sign In</button>
										</span>
									</td>
								</tr>
						</tbody>
					</table>
				<button onClick={this.props.onClick} >Click ME!</button>  
           		</div>
        )
    }
}

export default newUserPage;