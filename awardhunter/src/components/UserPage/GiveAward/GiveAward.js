import React from 'react';


class GiveAward extends React.Component {
    constructor(props) {
        super(props);
        
        this.state= {
            gave_award: this.props.userId,
            award_type: '',
            got_award: '',
            userData: [],
            awardData: [],
        };

        this.onChange = this.onChange.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fetchUsers = this.fetchUsers.bind(this);
        this.fetchAwardTypes = this.fetchAwardTypes.bind(this);
    }

    componentDidMount() {
        this.fetchUsers();
        this.fetchAwardTypes();
    }

    fetchUsers() {
        fetch("http://13.58.88.116:3000/users", {mode:"cors"})
        .then(response => response.json())
        .then(parsedJSON => parsedJSON.map(user => (
            {
                id: `${user.id}`,
                name: `${user.first_name} ${user.last_name}`,
                firstName: `${user.first_name}`,
                lastName: `${user.last_name}`,
                email: `${user.email}`,
                department: `${user.department}`,
                password: `${user.password}`,
            }
        )))
        .then(userData => this.setState({
            userData,
        }))
        .catch(error => console.log('parsing failed users ', error))
    }

    fetchAwardTypes() {
        fetch("http://13.58.88.116:3000/award_types", {mode:"cors"})
        .then(response => response.json())
        .then(parsedJSON => parsedJSON.map(award => (
            {
                id: `${award.id}`,
                award_name: `${award.award_name}`,
            }
        )))
        .then(awardData => this.setState({
            awardData,
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
        form.append('award_type', this.state.award_type);
        form.append('got_award', this.state.got_award);
        form.append('gave_award', this.state.gave_award);
        
        fetch('http://13.58.88.116:3000/awards', {
          method: 'POST',
          body: form,
        }).then(function(data) {
          console.log(data);
        });

      }


    render() {
        return( 
            <div>
                <h1>Give Award</h1>
                <hr />
                <h5>To whom would you like to give an award?</h5>
                    <select name='got_award' value={this.state.got_award} onChange={this.onChange} >
                        {
                            this.state.userData.map(function (user, i) {
                                return  <option value={user.id}>{user.name} ({user.email})</option>
                            })
                        }
                    </select>
                <br />
                <br />
                <h5>Which award would you like to give?</h5>
                    <select name='award_type' value={this.state.award_type} onChange={this.onChange} >
                        {
                            this.state.awardData.map(function (award, i) {
                                return  <option value={award.id}>{award.award_name}</option>
                            })
                        }                        
                    </select>
                <br />
                <br />
                <button className='btn btn-primary' onClick={this.handleSubmit} data-dismiss='modal'>Give Award</button>   

            </div>
        )
    }
}

export default GiveAward;