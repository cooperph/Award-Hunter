import React from 'react';

class NewUserPage extends React.Component {
    render() {
        return(
            <div>
                <h2>New User Page</h2>
				<br />
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
						<input type='text' name='firstName' id='firstName' value size='30' placeholder='Joe'/>
					</label>
					<br />
					<label>Last name:
						<input type="text" name="lastName" id="lastName" value size="30" />
					</label>
					<br />
					
							<label> Upload Profile Picture: <input type="file" name="img" multiple />
							</label>
							<br />
		
					<input type='submit' value='Create New User' />
				</form>


			<button onClick={this.props.onClick} >Click ME!</button>   
           		</div>
        )
    }
}

export default NewUserPage;