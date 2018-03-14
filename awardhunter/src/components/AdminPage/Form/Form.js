import React from 'react';

class Form extends React.Component {
    constructor(props) {
		super(props);
		this.state = {
            formType: this.checkFormType(this.props.type),
            firstName: '',
            lastName: '',
            department: '',
            email: '',
            password: '',
		};

        this.checkFormType = this.checkFormType.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    checkFormType(props) {
        if( props === 'Admin' ) {
            return 2;
        }
        return 1;
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        })
        this.props.getFormData(e);
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log(this.state)
    }

    render() {
        return(
            <div className="form">
                <div className='form-group'>
                    <label>First Name: </label>
                    <input name='firstName' input='text' placeholder='First Name' value={this.state.firstName} onChange={this.onChange} />
                </div>
                <div className='form-group'>
                    <label>Last Name: </label>
                    <input name='lastName' input='text' placeholder='Last Name' value={this.state.lastName} onChange={this.onChange} />
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
                    <input name='email' type='email' placeholder='Email@email.com' value={this.state.email} onChange={this.onChange} />
                </div>
                <div className='form-group'>
                    <label>Password: </label>
                    <input name='password' type='password' placeholder='Password' value={this.state.password} onChange={this.onChange} />
                </div>
                <div className='form-group'>
                    <label>Account Type: </label>
                    <input name='accounttype' value={this.props.type} disabled/>
                </div>
            </div>
        )
    }
}

export default Form;