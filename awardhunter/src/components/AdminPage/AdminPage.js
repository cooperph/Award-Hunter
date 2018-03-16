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
            adminData: [],
            statsData: [],
		};
        
        this.fetchUsers = this.fetchUsers.bind(this);
        this.fetchAdmin = this.fetchAdmin.bind(this);
        this.changeActivePage = this.changeActivePage.bind(this);
        this.repullData = this.repullData.bind(this);
    }
    
    componentDidMount() {
        this.fetchUsers();
        this.fetchAdmin();
        this.fetchStats();
    }

    fetchUsers() {
        fetch("http://13.58.88.116:3000/users", {mode:"cors"})
        .then(response => response.json())
        //console.log('fetch users - ',response.json())
        .then(parsedJSON => parsedJSON.map(user => (
            {
                id: `${user.id}`,
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
        .catch(error => console.log('parsing failed users ', error))
    }

    fetchAdmin() {
        fetch("http://13.58.88.116:3000/admins", {mode:"cors"})
        .then(response => response.json())
        //.then(parsedJSON => console.log(parsedJSON))
        .then(parsedJSON => parsedJSON.map(user => (
            {
                id: `${user.id}`,
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
        .catch(error => console.log('parsing failed admin', error))
    }

    fetchStats() {
        fetch("http://13.58.88.116:3000/awards", {mode:"cors"})
        .then(response => response.json())
        //.then(parsedJSON => console.log(parsedJSON.results))
        .then(parsedJSON => parsedJSON.map(user => (
            {
                awardType: `${user.award_name}`,
                gotName: `${user.got_award_first_name} ${user.got_award_last_name}`,
                gaveName: `${user.gave_award_first_name} ${user.gave_award_last_name}`,
                department: `${user.got_department}`,
            }
        )))
        .then(adminData => this.setState({
            adminData,
        }))
        .catch(error => console.log('parsing failed admin', error))
    }

    repullData(n){
        switch(n){
            case 'Admin': {
                this.fetchAdmin()
                break;
            }
            case 'Stats': {
                this.fetchStats()
                break;
            }
            default:
                this.fetchUsers();
                break;
        }
        // if(n === 'admin'){
        //     this.fetchAdmin();
        // } else {
        //     this.fetchUsers();
        // }
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
            case 'Stats':
                content = <StatsPage rawrData={this.state.statsData}
                    repull={this.repullData} type='Stats' />;
                break;
            case 'Admin':
                content = <UpdateAdminInfo rawData={this.state.adminData} 
                    repull={this.repullData} type='Admin'/>
                break;
            default:
                content = <UpdateUserInfo rawData={this.state.userData} 
                    repull={this.repullData} type='User'/>
        }
        return(
            <div className='admin-container'>
                <div className='sidebar'>
                    <SideBar user={this.props.user} onClick={this.changeActivePage} logOut={this.props.logOut}/>
                </div>
                <div className='main-admin'>
                    {content}
                </div>
            </div>
        )
    }
}

export default AdminPage;