import React from 'react';

class LoginPage extends React.Component {
    render() {
        return(
        
            <div className='w3-content'>
                <header className='w3-container w3-center w3-padding-32 w3-theme'>
                    <h1>Welcome to AwardHunter</h1>
                    <p>Please login to get started!</p>
                </header>   
                <h3>Login Page!</h3>
                
                  	<table>
						<tbody>
							<tr>
								<th>User Name: </th>
									<td>
										<input type="text" name="userName" id="userName" value size="30" />
									</td>
							</tr>
							<tr>
								<th>Password: </th>
									<td>
										<input type="text" name="password" id="password" value size="30" />
									</td>
							</tr>
							<tr>
								<th></th>
									<td>
										<span>
											<button type="button" className="btn btn-primary">Sign In</button>
										</span>
										<span>
											<button type="button" className="btn">Forget your password?</button>
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

export default LoginPage;