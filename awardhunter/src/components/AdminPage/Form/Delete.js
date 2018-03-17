import React from 'react';

class Delete extends React.Component {
    constructor(props) {
		super(props);
		this.state = {
            idNo: '',
            name: '',
            rawData: [],
        };
        
        this.saveData = this.saveData.bind(this);
        this.buildOptions = this.buildOptions.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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

    render() {
        return(
            <div className="form" ref='deleteRef'>
                <div className='form-group'>
                    <label>{this.props.type} Name: </label>
                    {this.buildOptions()}
                </div>
            </div>
        )
    }
}

export default Delete;