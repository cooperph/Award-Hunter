import React from 'react';
import SideBar from './SideBar/SideBar'
import StatsPage from './StatsPage/StatsPage'

require('./AdminPage.css')

class AdminPage extends React.Component {
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
            case 'stats':
                content = <StatsPage />;
                break;
            case 'admin':
                content = <p>Update Admin Page</p>
                break;
            default:
                content = <p>Update User Settings</p>
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