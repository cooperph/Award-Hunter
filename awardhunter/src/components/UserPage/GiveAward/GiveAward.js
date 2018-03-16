import React from 'react';


class GiveAward extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            email: '',
            award_type:'',
            //award:'',

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
        //alert('test give award');

        //api get email

        //make sure email exists

        //API post needs work
        //needs work
        fetch("http://13.58.88.116:3000/awards", {
            method: 'POST',
            //body: form,
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
                    <label>Recpient Email:  </label>
                        <input name='email' type='email' value={this.state.email} onChange={this.onChange} />
                <br />
                <br />
                <h5>Which award would you like to give?</h5>
                    <select name='award_type' type='award_type' value={this.state.award_type} onChange={this.onChange} >
                        <option value='10'>Choose Award</option>
                        <option value='1'>Dundee</option>
                        <option value='2'>Employee of the Week</option>
                    </select>
                <br />
                <br />
                <button className='btn btn-primary' onClick={this.handleSubmit} data-dismiss='modal'>Give Award</button>   

            </div>
        )
    }
}

export default GiveAward;