import React from 'react';
import SideBar from './SideBar/SideBar'
import StatsPage from './StatsPage/StatsPage'
import UpdateUserInfo from './UpdateUserInfo/UpdateUserInfo'
//import mysql from 'mysql';

var mysql = require('mysql')

require('./AdminPage.css')

class AdminPage extends React.Component {
    constructor(props) {
		super(props);
		this.state = {
            activePage: '',
            schema: [ 'First Name', 'Last Name', 'Department', 'Email Address' ],
            data: [ ['George', 'Michael', 'Accounting', 'blachblah@glah.org'], ['Michael', 'Bluth', 'Manager', 'MBluth@bananastand.com']]
		};
        
        this.changeActivePage = this.changeActivePage.bind(this);
    }
    
    componentDidMount() {
        //var mysql = require('mysql');

        var con = mysql.createConnection({
            host: 'oniddb.cws.oregonstate.edu',
            user: 'cooperph-db',
            password: 'NKWCQdcXNLL2X6T6',
            database: 'cooperph-db'
        });

        //con.connect();
        
        /*con.query("SELECT * FROM Employee", function (err,results) {
            if(err) {
                console.error(err);
                return;
            }
            console.log(results);
        });
*/        
    }
    changeActivePage(name) {
        this.setState({
            activePage: name,
        })
    }

    render() {
        let content = null;
        switch(this.state.activePage) {
            case 'stats':
                content = <StatsPage />;
                break;
            case 'admin':
                content = <p>Update Admin Page</p>
                break;
            default:
                content = <UpdateUserInfo schema={this.state.schema} data={this.state.data} />
        }
        return(
            <div className='admin-container'>
                <div className='sidebar'>
                    <SideBar user={this.props.user} onClick={this.changeActivePage}/>
                </div>
                <div className='main-admin'>
                    {content}
                </div>
            </div>
        )
    }
}

export default AdminPage;