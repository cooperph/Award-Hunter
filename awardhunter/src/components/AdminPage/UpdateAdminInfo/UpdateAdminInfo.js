import React from 'react';
import Table from '../../Table/Table'

class UpdateAdminInfo extends React.Component {
    constructor(props) {
		super(props);
		this.state = {
            
		};
        
        this.buildSchema = this.buildSchema.bind(this);
        this.buildData = this.buildData.bind(this);
    }

    componentDidMount() {
        if(this.props.rawData !== null || this.props.rawData !== undefined) {
            this.buildSchema(this.props.rawData);
            this.buildData(this.props.rawData);
        } else {
            console.log('UUA no props data!');
        }

    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.rawData !== null && nextProps.rawData !== undefined && nextProps.rawData.length > 0){
            if( nextProps !== this.props ) {
                this.buildSchema(nextProps);
                this.buildData(nextProps);
            }
        }
    }
    
    buildSchema(data) {
        if(data.rawData){
            let temp = data.rawData[0];
            let newSchema = Object.keys(temp);
            newSchema.push('Edit');
            newSchema.push('Delete');
            if(this.refs.adminRef){
                this.setState({
                    schema: newSchema,
                });
            }
        } 
    }

    buildData(data) {
        if(data.rawData){
            let newData = [];
            for( var i = 0; i < data.rawData.length; i++) {
                let innerData = [];
                innerData = Object.values(data.rawData[i])
                newData.push(innerData)
            }
            if(this.refs.adminRef){
                this.setState({
                    data: newData,
                })
            }
        }
    }

    render() {
        return(
            <div ref='adminRef'>
                <br/>
                <h1>Update Admin Data</h1>
                <hr />
                <Table schema={this.state.schema} data={this.state.data} 
                        type={this.props.type} repull={this.props.repull}
                        buttons='true'/>
            </div>
        )
    }
}

export default UpdateAdminInfo;