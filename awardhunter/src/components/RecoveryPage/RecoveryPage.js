import React from 'react';
//import { Link } from 'react-router';
//import './components/RecoveryPage/RecoveryPage.css';


class RecoveryPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: ''
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

        // check database with api call
        // if 200 ok to send password
        // if 401 error message, try again

        var FormData = require('form-data');
        var form = new FormData();
        form.append('email', this.state.email);

        fetch('http://13.58.88.116:3000/user/forgot_password', {
          method: 'POST',
          body: form,
        }).then(function(data) {
          console.log(data);
        });
    }
    
    render() {
        return(
            <div>
	            <h5>Enter your email to recover password:</h5>
                <form>
                    <label>Email Address:  </label>
                        <input name='email' type='email' placeholder='Email@email.com' value={this.state.email} onChange={this.onChange} />
                    <br />
                    <button className='btn btn-primary' onClick={this.handleSubmit}>Get Password</button>   
                </form>
                
           	</div>
        )
    }
}


export default RecoveryPage;