import React from 'react';
//import './components/NewUserPage/NewUserPage.css';


class newUserPage extends React.Component {
    render() {
        return(
            <div>
                <p>New User Page!</p>
					<span>
						<button type="button" class="btn">Already have and user name? Sign in here</button>
					</span>

				<form>
					<label>Username:
						<input type="text" name="userName" id="userName" value size="30" />
					</label>
					<br />
					<label>Password:
						<input type="text" name="password" id="password" value size="30" />
					</label>
					<br />
					<label>Email Address:
						<input type="text" name="email" id="email" value size="30" />
					</label>
					<br />
					<label>First name:
						<input type="text" name="firstName" id="firstName" value size="30" />
					</label>
					<br />
					<label>Last name:
						<input type="text" name="lastName" id="lastName" value size="30" />
					</label>
					<br />
						<form>
							<label> Upload Profile Picture: <input type="file" name="img" multiple />
								<input type='submit' value='Upload' />
							</label>
							<br />
						</form>
					<input type='submit' value='Create New User' />
				</form>
			<button onClick={this.props.onClick} >Click ME!</button>  
        	</div>
        )
    }
}

export default newUserPage;