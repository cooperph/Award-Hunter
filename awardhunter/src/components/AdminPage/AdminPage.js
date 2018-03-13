import React from 'react';
import SideBar from './SideBar/SideBar'
import StatsPage from './StatsPage/StatsPage'
import UpdateUserInfo from './UpdateUserInfo/UpdateUserInfo'

require('./AdminPage.css')

class AdminPage extends React.Component {
    constructor(props) {
		super(props);
		this.state = {
            activePage: '',
            serverData: []
		};
        
        this.fetchUsers = this.fetchUsers.bind(this);
        this.changeActivePage = this.changeActivePage.bind(this);
    }
    
    componentDidMount() {
        this.fetchUsers();
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
        .then(serverData => this.setState({
            serverData,
        }))
        .catch(error => console.log('parsing failed ', error))
    }

    changeActivePage(name) {
        this.setState({
            activePage: name,
        })
    }

    render() {
        //console.log(this.state.serverData);

        let content = null;
        switch(this.state.activePage) {
            case 'stats':
                content = <StatsPage />;
                break;
            case 'admin':
                content = <p>Update Admin Page</p>
                break;
            default:
                content = <UpdateUserInfo rawData={this.state.serverData}/>
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