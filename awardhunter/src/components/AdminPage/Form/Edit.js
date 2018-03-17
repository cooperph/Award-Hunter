import React from 'react';

class Edit extends React.Component {
    constructor(props) {
		super(props);
		this.state = {
            idNo: '',
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
        this.updateFields = this.updateFields.bind(this);
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
        fetch("http://13.58.88.116:3000/users/"+this.state.id, {mode:"cors"})
        .then(response => response.json())
        //.then(parsedJSON => console.log('JSON - ',parsedJSON.results))
        // .then(parsedJSON => parsedJSON.map(user => (
        //     {
        //         id: `${user.id}`,
        //         name: `${user.first_name} ${user.last_name}`,
        //         firstName: `${user.first_name}`,
        //         lastName: `${user.last_name}`,
        //         email: `${user.email}`,
        //         department: `${user.department}`,
        //         password: `${user.password}`,
        //     }
        // )))
        .then(function(data) {
            // this.setState({
            //     firstName: data.first_name,
            //     lastName: data.last_name,
            //     department: data.department,
            //     email: data.email,
            //     password: data.password,
            //     haveData: true,
            // })
            this.updateFields(data);
        })
        //.then(userData => this.setState({
            // firstName: userData.first_name,
            // lastName: userData.last_name,
            // department: userData.department,
            // email: userData.email,
            // password: userData.password,
            // haveData: true,
            //userData,
        //}), this.updateFields())
        .catch(error => console.log('parsing failed admin', error))
               
    }

    updateFields(data) {
        console.log('UDP - state: ',data)
    }

    render() {
        return(
            <div className="form" ref='deleteRef'>
            {this.state.haveData ? (
                <div>
                    <p>data's here!</p>
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