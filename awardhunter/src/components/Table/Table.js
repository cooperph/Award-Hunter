import React from 'react';
import $ from 'jquery';

class Table extends React.Component {
    constructor(props) {
		super(props);
		this.state = {
            schema: this.adjustSchema(this.props.schema),
            data: this.adjustData(this.props.data)
        };

        this.adjustSchema = this.adjustSchema.bind(this);
        this.adjustData = this.adjustData.bind(this);
        this.makeTableSchema = this.makeTableSchema.bind(this);
        this.makeButton = this.makeButton.bind(this);
        this.buttonClick = this.buttonClick.bind(this);
    }

    adjustSchema(schema) {
        let newSchema = schema;
        newSchema.push('Edit');
        newSchema.push('Delete');
        return newSchema;
    }

    adjustData(data) {
        return data;
    }

    makeTableSchema() {
        let schema = <tr>
            {this.state.schema.map((s1) => {
                return <th key={s1}>{s1}</th>
            })}
        </tr>

        return schema;
    }

    makeTableBody() {
        let data = this.state.data.map((m1, idx) => {
            return <tr key={'row-'+idx}>
                    {m1.map((m2)=> {
                        return <td key={m2}>{m2}</td>
                    })}
                    <td>{this.makeButton('edit')}</td>
                    <td>{this.makeButton('window-close')}</td>
                </tr>
        })

        return data;
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
                <table className="table table-striped">
                    <thead>
                        {this.makeTableSchema()}
                    </thead>
                    <tbody>
                        {this.makeTableBody()}
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