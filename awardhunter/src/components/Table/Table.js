import React from 'react';
import $ from 'jquery';

class Table extends React.Component {
    constructor(props) {
		super(props);
		this.state = {

        };

        this.makeTableSchema = this.makeTableSchema.bind(this);
        this.makeButton = this.makeButton.bind(this);
        this.buttonClick = this.buttonClick.bind(this);
    }

    componentDidMount() {
        this.makeTableSchema(this.props);
        this.makeTableBody(this.props);
    }

    componentWillReceiveProps(nextProps) {
        if( nextProps !== this.props ) {
            this.makeTableSchema(nextProps);
            this.makeTableBody(nextProps);
        }
    }

    makeTableSchema(data) {
        if(data.schema) {
            let tableSchema = <tr>
                {data.schema.map((s1) => {
                    return <th key={s1}>{s1}</th>
                })}
            </tr>
            this.setState({
                schema: tableSchema,
            })   
        } 
    }

    makeTableBody(data) {
        if(data.data){
            let tableData = data.data.map((m1, idx) => {
                return <tr key={'row-'+idx}>
                        {m1.map((m2) => {
                            return <td key={m2}>{m2}</td>
                        })}
                        <td key={idx + '_edit'}>{this.makeButton('edit')}</td>
                        <td key={idx + '_delete'}>{this.makeButton('window-close')}</td>
                    </tr>
            })
            this.setState({
                data: tableData,
            })
        }
    }
    makeButton(type) {
        let button = (<button className="button" id={type} onClick={this.buttonClick.bind(this, {type})}>
                <div className={'fa fa-' + type}></div>
            </button>)

        return button;
    }

    buttonClick(id, e) {
        console.log(id)
        var tableData = [];
        $('.button').click(function() {
        $(this).closest('tr').find('td').not(':last').each(function() {
            var textval = $(this).text();
            tableData.push(textval);
        })
        console.log(tableData);

        // switch(id.type) {
        //     case 'edit':
        //         console.log('EDITING!!!!');
        //         break;
        //     default:
        //         console.log('EXTERMINATE!');
        //         break;
        // }
    })
    }
    
    render() {
        $('.button').click(function() {
            var tableData = [];
            $(this).closest('tr').find('td').not(':last').each(function() {
                var textval = $(this).text();
                tableData.push(textval)
            })
            console.log(tableData);
            tableData.pop();
        })

        return (
            <div>
                <table className="table table-striped table-bordered table-hover">
                    <thead>
                        {/* {this.makeTableSchema()} */}
                        {this.state.schema}
                    </thead>
                    <tbody>
                        {/* {this.makeTableBody()} */}
                        {this.state.data}
                    </tbody>
                </table>
                <hr/>
                <div>
                    <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#myModal">
                        Create New User
                    </button>
                    <div className="modal fade" id="myModal" tabIndex="-1">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Add New User</h5>
                            <button type="button" className="close" data-dismiss="modal">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" data-dismiss='modal'>Save changes</button>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Table;