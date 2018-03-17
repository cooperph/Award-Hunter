import React from 'react';

class Edit extends React.Component {
    constructor(props) {
		super(props);
		this.state = {
            formType: this.checkFormType(this.props.type),
            firstName: '',
            lastName: '',
            department: '',
            email: '',
            password: '',
            id: '',
            namesList: this.getNames(this.props.rawData),
		};

        this.getNames = this.getNames.bind(this);
        this.checkFormType = this.checkFormType.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    
    getNames(data) {
        console.log(data);

        
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
            <div>
                */*/*/EDIT/*/*/*
            </div>
        )
    }
}

export default Edit;