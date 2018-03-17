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
		// this.userAuth = this.userAuth.bind(this);
	}

	handleSubmit(event) {
		event.preventDefault();
		// let temp = this.userAuth(this.state.email, this.state.pass);
		// this.props.onClick(temp)
		
		var FormData = require('form-data');
		var form = new FormData();
		form.append('email', this.state.email);
		form.append('password', this.state.pass);

		fetch('http://13.58.88.116:3000/user/login', {
		  method: 'POST',
		  body: form,
		})
		.then(response => response.json())
		.then(pasrsedJSON => {			
			if (Object.keys(pasrsedJSON).length == 0) {
				alert('Invalid Password, please try again');
			}

			var account, name, userId;
			if (pasrsedJSON["account_type"] == 1) {
				account = 'user'
			} else if (pasrsedJSON["account_type"] == 2) {
				account = 'admin'
			}
			name = pasrsedJSON["first_name"] + " " + pasrsedJSON["last_name"]
			userId = pasrsedJSON["id"]
			let values = [account, name, userId];
			this.props.onClick(values);
		});
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

	// userAuth(name, pass) {
	// 	for(var i = 0; i < data.users.length; i++) {
	// 		if(data.users[i].name === name) {
	// 			if(data.users[i].password === pass) {
	// 				let values = [data.users[i].accountType, data.users[i].name];
	// 				return values;
	// 			}
	// 			else {
	// 				alert('Invalid Password, please try again');
	// 				return '';
	// 			}
	// 		}
	// 	}
	// 	alert(name + ' is not a valid username, try again');
	// 	return ''
	// }

    render() {
        return(
            <div className='w3-content w3-padding-32'>
                <header className='w3-container w3-center'>
                    <h1>Welcome to AwardHunter</h1>
                    <p>Please login to get started!</p>
                </header>
                <div className='w3-container w3-center'>
				<div className="form">
					<div className='form-group'>
						<label>Email: </label>
						<input name='email' input='text' value={this.state.email} onChange={this.handleChange} />
					</div>
					<div className='form-group'>
						<label>Password: </label>
						<input name='pass' input='text' value={this.state.password} onChange={this.handleChange} />
					</div>
					<button className='btn btn-primary' onClick={this.handleSubmit}>Log In</button>
				</div>
					<br />
					<div>
						<button type="button" className="btn btn-link" data-toggle="modal" data-target="#forgotPassword">
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
								{/* Put Footer Data Here */}
							</div>
							</div>
						</div>
						</div>
					</div>
					<br />
					<div>
						<button type="button" className="btn btn-link" data-toggle="modal" data-target="#newUser">
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
							{/* Put footer Data Here */}
							</div>
							</div>
						</div>
						</div>
					</div>
				</div>
				
				<p>Normal User:</p>
				<p>email: a@b.com</p>
				<p>password: ab123</p>
				<p>Admin User:</p>
				<p>email: c@d.com</p>
				<p>password: cd123</p>
				</div>
        )
    }
}

export default LoginPage;