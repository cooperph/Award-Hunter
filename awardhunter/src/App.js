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
      userName: ''
    };

    this.handleLogIn = this.handleLogIn.bind(this);
  }

  handleLogIn(array){
    this.setState({
      userType: array[0],
      userName: array[1],
    })
  }

  render() {
    let content = null;
    switch(this.state.userType){
      case 'user':
        content = <UserPage />
        break;
      case 'admin':
        content = <AdminPage user={this.state.userName}/>
        break;
      default:
        content = <LoginPage onClick={this.handleLogIn} />
    }
    
    return (
      <div className="container" >
        <div className="inner w3-bar w3-black">
            <p className='inner w3-right w3-bar-item'>Award Hunter</p>
        </div>
        <div className="inner content">
          {content}
        </div>
        <div className="inner blackbar" />
      </div>
    );
  }
}

export default App;
