import React from 'react';
import SideBar from './SideBar/SideBar'


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
            case 'stats':
                content = <p>Third Page</p>;
                break;
            case 'admin':
                content = <p>Second Page</p>
                break;
            default:
                content = <p>First Page</p>
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

export default UserPage;