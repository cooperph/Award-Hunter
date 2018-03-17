import React from 'react';
import SideBar from './SideBar/SideBar'
import GiveAward from './GiveAward/GiveAward'
import ManageAccount from './ManageAccout/ManageAccount'

require('./UserPage.css')

class UserPage extends React.Component {
    constructor(props) {
		super(props);
		this.state = {
            activePage: '',
		};
        
        this.changeActivePage = this.changeActivePage.bind(this);
    }
    
    changeActivePage(name) {
        this.setState({
            activePage: name,
        })
    }

    render() {
        let content = null;
        switch(this.state.activePage) {
            case 'manage':
                content = <ManageAccount userId={this.props.userId} />
                break;
            default:
                content = <GiveAward userId={this.props.userId} />
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

export default UserPage;