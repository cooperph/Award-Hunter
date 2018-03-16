import React from 'react';

class NewUserPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
            formType: '1',
            firstName: '',
            lastName: '',
            department: '',
            email: '',
            password: '',
		};

		this.onChange = this.onChange.bind(this);
		this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
	}
	
	onChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        })
	}
	
	handleSubmit(e) {
        e.preventDefault();
        console.log(this.state)
	}
	
    render() {
        return(
			<div>
				<div className="form">
					<div className='form-group'>
						<label>First Name: </label>
						<input name='firstName' input='text' value={this.state.firstName} onChange={this.onChange} />
					</div>
					<div className='form-group'>
						<label>Last Name: </label>
						<input name='lastName' input='text' value={this.state.lastName} onChange={this.onChange} />
					</div>
					<div className='form-group'>
						<label>Department: </label>
						<select name='department' value={this.state.department} onChange={this.onChange} >
							<option value='10'>Choose Department</option>
							<option value='1'>Accounting</option>
							<option value='2'>Sales</option>
							<option value='3'>Information Technololgy</option>
							<option value='4'>Human Resources</option>
							<option value='5'>Management</option>
							<option value='6'>Customer Service</option>
						</select>
					</div>
					<div className='form-group'>
						<label>Email: </label>
						<input name='email' type='email' value={this.state.email} onChange={this.onChange} />
					</div>
					<div className='form-group'>
						<label>Password: </label>
						<input name='password' type='password' value={this.state.password} onChange={this.onChange} />
					</div>

				</div>
				<button className='btn btn-primary' onClick={this.handleSubmit}>Create New User</button>   
			</div>
        )
    }
}

export default NewUserPage;