import React from 'react'

require('./SideBar.css')

class SideBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activePage: 'tab1',
        };

    this.handleClick = this.handleClick.bind(this);
    this.logoutButon = this.logoutButon.bind(this);
    }

    handleClick(e) {
        e.preventDefault();
		let temp = e.target.id;
		this.props.onClick(temp)
    }

    logoutButon() {
        //console.log('pressed log out button!')
        this.props.logOut();
    }

    render() {
        return(
            <div className='side-content header'>
                <br />
                <div className='side-inner w3-center'>
                    <div className="w3-col s4">
                        <i className="fas fa-user fa-3x"></i>
                    </div>
                    <div className="w3-col s8 w3-bar">
                        <span>Welcome, <strong>{this.props.user ? this.props.user : 'USER NAME'}</strong></span><br/>
                        <button onClick={this.logoutButon}>Logout</button>
                    </div>
                </div>
                <hr />
                <div className='side-inner links w3-bar-block'>
                    <div className='w3-bar-item w3-button' id='User' onClick={this.handleClick}><i className="fas fa-users"></i> Manage Users</div>
                    <div className='w3-bar-item w3-button' id='Admin' onClick={this.handleClick}><i className="fas fa-user-secret"></i> Manage Admin</div>
                    <div className='w3-bar-item w3-button' id='Stats' onClick={this.handleClick}><i className="fas fa-table"></i> Statistics</div>
                </div>
            </div>
        )
    }
}

export default SideBar;