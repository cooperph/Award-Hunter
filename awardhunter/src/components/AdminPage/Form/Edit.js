import React from 'react';

class Edit extends React.Component {
    constructor(props) {
		super(props);
		this.state = {
            id: '',
            firstName: '',
            lastName: '',
            department: '',
            email: '',
            password: '',
            rawData: [],
            userData: [],
            haveData: false,
        };
        
        this.saveData = this.saveData.bind(this);
        this.buildOptions = this.buildOptions.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fetchUserData = this.fetchUserData.bind(this);
    }

    componentDidMount() {
        if(this.props.rawData !== null && this.props.rawData !== undefined){
            this.saveData(this.props.rawData);
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.rawData !== null && nextProps.rawData !== undefined && nextProps.rawData.length > 0){
            if( nextProps !== this.props ) {
                this.saveData(this.props.rawData);
            }
        }
    }

    saveData(data){
        if(this.refs.deleteRef){
            this.setState({
                rawData: data,
            })
        }
    }

    buildOptions() {
        let content = ''
        if(this.state.rawData !== undefined && this.state.rawData !== null) {
            content = 
            <select name='id' value={this.state.idNo} onChange={this.onChange} >
                {this.state.rawData.map((m1)=> {
                    return (
                        <option value={m1[0]} key={'option_'+m1[0]}>{m1[1]}</option>
                    )
                })}
            </select>
        } 
        return content;
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

    fetchUserData(e) {
        fetch("http://13.58.88.116:3000/users/" + this.state.id, {mode:"cors"})
        .then(response => response.json())
        .then(parsedJSON => this.setState({
            firstName: parsedJSON['first_name'],
            lastName: parsedJSON['last_name'],
            email: parsedJSON['email'],
            password: parsedJSON['password'],
            department: parsedJSON['department'],
        }))
        .catch(error => console.log('parsing failed users ', error))

        this.setState({
            haveData: true,
        })
               
    }

    render() {
        return(
            <div className="form" ref='deleteRef'>
            {this.state.haveData ? (
                <div>
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
                </div>
            ) : (
                <div>
                    <div className='form-group'>
                        <label>{this.props.type} Name: </label>
                        {this.buildOptions()}
                    </div>
                    <button className="btn btn-primary" onClick={this.fetchUserData}>Get {this.props.type} Data</button>
                </div>
            )}
                
            </div>
        )
    }
}

export default Edit;