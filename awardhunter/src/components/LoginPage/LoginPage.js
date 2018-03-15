import React from 'react';
import data from './data.json';
import RecoveryPage from '../RecoveryPage/RecoveryPage';
import NewUserPage from '../NewUserPage/NewUserPage';
//import { Link } from 'react-router';
//import { Redirect } from 'react-router';

class LoginPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			pass: ''
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.userAuth = this.userAuth.bind(this);
	}

	handleSubmit(event) {
		event.preventDefault();
		let temp = this.userAuth(this.state.email, this.state.pass);
		this.props.onClick(temp)
	}

	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		})
	}


	handleForgot() {
		//alert('forgot');
		//<RecoveryPage />
	}

	handleNewUser() {
		//alert('New user');
		//<NewUserPage />
	}

	userAuth(name, pass) {
		for(var i = 0; i < data.users.length; i++) {
			if(data.users[i].name === name) {
				if(data.users[i].password === pass) {
					let values = [data.users[i].accountType, data.users[i].name];
					return values;
				}
				else {
					alert('Invalid Password, please try again');
					return '';
				}
			}
		}
		alert(name + ' is not a valid username, try again');
		return ''
	}
    render() {
        return(
            <div className='w3-content w3-padding-32'>
                <header className='w3-container w3-center'>
                    <h1>Welcome to AwardHunter</h1>
                    <p>Please login to get started!</p>
                </header>   
                <div className='w3-container w3-center'>
					<form onSubmit={this.handleSubmit}>
						<label>Username:
						<input type="text" name="email" onChange={this.handleChange} />
						</label><br />
						<label>Password:
						<input type="password" name="pass" onChange={this.handleChange}/>
						</label><br />
						<input type='submit' value='Log In' />
					</form>
					<br />
					{/* <form onSubmit={this.handleForgot}>
						<input type='submit' value='Forgot Password' />
					</form> */}
					<div>
						<button type="button" className="btn btn-primary" data-toggle="modal" data-target="#forgotPassword">
							Forgot Password?
						</button>
						<div className="modal fade" id="forgotPassword" tabIndex="-1">
						<div className="modal-dialog" role="document">
							<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title" id="exampleModalLabel">Add New {this.props.type}</h5>
								<button type="button" className="close" data-dismiss="modal">
								<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<div className="modal-body">
								<RecoveryPage />
							</div>
							<div className="modal-footer">
								{/* <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
								<button type="button" className="btn btn-primary" data-dismiss='modal'>Save changes</button> */}
							</div>
							</div>
						</div>
						</div>
					</div>
					<br />
					{/* <form onSubmit={this.handleNewUser}>
						<input type='submit' value='New User' />
					</form> */}
					<div>
						<button type="button" className="btn btn-primary" data-toggle="modal" data-target="#newUser">
							New User
						</button>
						<div className="modal fade" id="newUser" tabIndex="-1">
						<div className="modal-dialog" role="document">
							<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title" id="exampleModalLabel">Add New {this.props.type}</h5>
								<button type="button" className="close" data-dismiss="modal">
								<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<div className="modal-body">
								<NewUserPage />
							</div>
							<div className="modal-footer">
								{/* <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
								<button type="button" className="btn btn-primary" data-dismiss='modal'>Save changes</button> */}
							</div>
							</div>
						</div>
						</div>
					</div>
				</div>
				<p>user:user123</p>
				<p>admin:admin123</p>
            </div>
        )
    }
}

export default LoginPage;