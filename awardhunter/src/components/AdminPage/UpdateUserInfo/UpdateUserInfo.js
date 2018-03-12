import React from 'react';
import Table from '../../Table/Table';

require('./UpdateUserInfo.css');

class UpdateUserInfo extends React.Component {
    render() {
        return(
            <div>
                <br/>
                <h1>Update User Data</h1>
                <hr />
                <Table schema={this.props.schema} data={this.props.data} />
            </div>
        )
    }
}

export default UpdateUserInfo;