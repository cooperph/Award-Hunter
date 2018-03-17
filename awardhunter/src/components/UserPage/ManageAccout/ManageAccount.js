import React from 'react';


class ManageAccount extends React.Component {
		constructor(props) {
        super(props);
        
        this.state = {
            userId: this.props.userId,
            firstName: '',
            lastName: '',
        };

        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fetchUser = this.fetchUser.bind(this);
    }

    componentDidMount() {
        this.fetchUser();
    }

    fetchUser() {
    	fetch("http://13.58.88.116:3000/users/" + this.state.userId, {mode:"cors"})
      .then(response => response.json())
      .then(parsedJSON => this.setState({
          firstName: parsedJSON['first_name'],
          lastName: parsedJSON['last_name'],
      }))
      .catch(error => console.log('parsing failed users ', error))
    }


    onChange(e) {
        this.setState({
          [e.target.name]: e.target.value,
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log('handleSubmit');

        console.log(this.state);

        var FormData = require('form-data');
        var form = new FormData();
        form.append('first_name', this.state.firstName);
        form.append('last_name', this.state.lastName);
        
        fetch('http://13.58.88.116:3000/users/profile/' + this.state.userId, {
          method: 'PUT',
          header: {
          	'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
          },
          body: form,
        }).then(function(data) {
          console.log(data);
        });
    }

    render() {
        return( 
            <div>
                <h1>Manage Account</h1>
                <hr />

                
                <div className='form-group'>
               	 	<label>First Name</label>
               	 	<input name='firstName' input='text' placeholder='First Name' value={this.state.firstName} onChange={this.onChange} />
                </div>
                <div className='form-group'>
               	  <label>Last Name</label>
              	  <input name='lastName' input='text' placeholder='Last Name' value={this.state.lastName} onChange={this.onChange} />
                </div>
                <button className='btn btn-primary' onClick={this.handleSubmit} data-dismiss='modal'>Update</button>   
            </div>
        )
    }
}

export default ManageAccount;