import React from 'react';
import SideBar from './SideBar/SideBar'
import StatsPage from './StatsPage/StatsPage'
import UpdateUserInfo from './UpdateUserInfo/UpdateUserInfo'
import UpdateAdminInfo from './UpdateAdminInfo/UpdateAdminInfo'

require('./AdminPage.css')

class AdminPage extends React.Component {
    constructor(props) {
		super(props);
		this.state = {
            activePage: '',
            userData: [],
            adminData: []
		};
        
        this.fetchUsers = this.fetchUsers.bind(this);
        this.fetchAdmin = this.fetchAdmin.bind(this);
        this.changeActivePage = this.changeActivePage.bind(this);
        this.repullData = this.repullData.bind(this);
    }
    
    componentDidMount() {
        this.fetchUsers();
        this.fetchAdmin();
    }

    fetchUsers() {
        fetch("http://13.58.88.116:3000/users", {mode:"cors"})
        .then(response => response.json())
        //.then(parsedJSON => console.log(parsedJSON))
        .then(parsedJSON => parsedJSON.map(user => (
            {
                name: `${user.first_name} ${user.last_name}`,
                firstName: `${user.first_name}`,
                lastName: `${user.last_name}`,
                email: `${user.email}`,
                department: `${user.department}`,
                password: `${user.password}`,
            }
        )))
        .then(userData => this.setState({
            userData,
        }))
        .catch(error => console.log('parsing failed ', error))
    }

    fetchAdmin() {
        fetch("http://13.58.88.116:3000/admins", {mode:"cors"})
        .then(response => response.json())
        //.then(parsedJSON => console.log(parsedJSON))
        .then(parsedJSON => parsedJSON.map(user => (
            {
                name: `${user.first_name} ${user.last_name}`,
                firstName: `${user.first_name}`,
                lastName: `${user.last_name}`,
                email: `${user.email}`,
                department: `${user.department}`,
                password: `${user.password}`,
            }
        )))
        .then(adminData => this.setState({
            adminData,
        }))
        .catch(error => console.log('parsing failed ', error))
    }

    repullData(n){
        if(n === 'admin'){
            this.fetchAdmin();
        } else {
            this.fetchUsers();
        }
    }

    changeActivePage(name) {
        this.setState({
            activePage: name,
        }, this.repullData(name))
    }

    render() {
        //console.log(this.state.serverData);

        let content = null;
        switch(this.state.activePage) {
            case 'stats':
                content = <StatsPage />;
                break;
            case 'admin':
                content = <UpdateAdminInfo rawData={this.state.adminData} type='Admin'/>
                //content = <p>admin section</p>
                break;
            default:
                content = <UpdateUserInfo rawData={this.state.userData} type='User'/>
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