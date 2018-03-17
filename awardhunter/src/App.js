import React, { Component } from 'react';
import UserPage from './components/UserPage/UserPage';
import LoginPage from './components/LoginPage/LoginPage';
import AdminPage from './components/AdminPage/AdminPage';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userType: 'admin',
      userName: 'El Dudearino',
      uesrId: '',
    };

    this.handleLogIn = this.handleLogIn.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
  }

  handleLogIn(array){
    this.setState({
      userType: array[0],
      userName: array[1],
      userId: array[2],
    })
  }

  handleLogOut() {
    this.setState({
      userType: '',
      userName: '',
      userId: ''
    })
  }

  render() {
    let content = null;
    switch(this.state.userType){
      case 'user':
        content = <UserPage user={this.state.userName} userId={this.state.userId} logOut={this.handleLogOut}/>
        break;
      case 'admin':
        content = <AdminPage user={this.state.userName} logOut={this.handleLogOut}/>
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
