import React from 'react';
import $ from 'jquery';
import Form from '../AdminPage/Form/Form'

class Table extends React.Component {
    constructor(props) {
		super(props);
		this.state = {
            formType: this.checkFormType(this.props.type),
            firstName: '',
            lastName: '',
            department: '',
            email: '',
            password: '',
        };

        this.makeTableSchema = this.makeTableSchema.bind(this);
        this.makeButton = this.makeButton.bind(this);
        this.buttonClick = this.buttonClick.bind(this);
        this.checkFormType = this.checkFormType.bind(this);
        this.getFormData = this.getFormData.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
            if(this.refs.tableRef){
                this.setState({
                    schema: tableSchema,
                })
            }
        } 
    }

    makeTableBody(data) {
        if(data.data){
            let tableData = data.data.map((m1, idx) => {
                return <tr key={'row-'+idx}>
                        {m1.map((m2) => {
                            return <td key={m2}>{m2}</td>
                        })}
                        { this.props.buttons === 'true' ? (
                            <td key={idx + '_edit'}>{this.makeButton('edit')}</td>
                        ) : ('') }
                        { this.props.buttons === 'true' ? (
                            <td key={idx + '_delete'}>{this.makeButton('window-close')}</td>
                        ) : ('') }
                    </tr>
            })
            this.setState({
                data: tableData,
            })
        }
    }

    makeButton(type) {
        let button = (<button className="button" id={type} data-toggle='modal' modal={'#'+type} onClick={this.buttonClick.bind(this, {type})}>
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

        })
    }

    checkFormType(props) {
        if( props === 'Admin' ) {
            return 2;
        }
        return 1;
    }

    getFormData(e) {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    handleSubmit(e) {
        e.preventDefault();
    
        var FormData = require('form-data');
        var form = new FormData();
        form.append('first_name', this.state.firstName);
        form.append('last_name', this.state.lastName);
        form.append('email', this.state.email);
        form.append('password', this.state.password);
        form.append('department', this.state.department);
        form.append('image', '');
        form.append('account_type', this.state.formType);
    
        fetch('http://13.58.88.116:3000/user', {
          method: 'POST',
          body: form,
        }).then(function(data) {
          console.log(data);
        });
        this.props.repull(this.props.type)
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
            <div ref='tableRef'>
                <table className="table table-striped table-bordered table-hover">
                    <thead>
                        {this.state.schema}
                    </thead>
                    <tbody>
                        {this.state.data}
                    </tbody>
                </table>
                <hr/>
                {this.props.buttons === 'true' ? (
                    <div>
                        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#myModal">
                            Create New {this.props.type}
                        </button>
                        <div className="modal fade" id="myModal" tabIndex="-1">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Add New {this.props.type}</h5>
                                <button type="button" className="close" data-dismiss="modal">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <Form type={this.props.type} getFormData={this.getFormData}/>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" onClick={this.handleSubmit} data-dismiss='modal'>Create Account</button>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                ) : ('')}
            </div>
        )
    }
}

export default Table;