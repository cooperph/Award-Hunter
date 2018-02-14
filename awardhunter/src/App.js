import React, { Component } from 'react';
import UserPage from './components/UserPage/UserPage';
import LoginPage from './components/LoginPage/LoginPage';
import AdminPage from './components/AdminPage/AdminPage';
// import newUserPage from './components/newUserPage';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userType: '',
    };

    this.handleLogIn = this.handleLogIn.bind(this);
  }

  handleLogIn(userValue){
    this.setState({
      userType: userValue
    })
  }

  render() {
    let content = null;
    switch(this.state.userType){
      case 'user':
        content = <UserPage />
        break;
      case 'admin':
        content = <AdminPage />
        break;
      default:
        content = <LoginPage onClick={this.handleLogIn} />
    }
    
    return (
      <div className="w3-container app" >
        <div className="blackbar flex-child" />
        <div className="flex-item w3-container w3-grey content flex-child">
          {content}
        </div>
      </div>
    );
  }
}

export default App;
