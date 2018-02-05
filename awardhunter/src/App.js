import React, { Component } from 'react';
//import UserPage from './components/UserPage/UserPage';
import LoginPage from './components/LoginPage';
import AdminPage from './components/AdminPage/AdminPage';
// import newUserPage from './components/newUserPage';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
    };

    this.handleLogIn = this.handleLogIn.bind(this);
  }

  handleLogIn(e){
    e.preventDefault();
    console.log('button clicked!')
    this.setState(prevState => ({
      loggedIn: !prevState.loggedIn
    }))
  }

  render() {
    let content = null;
    if(this.state.loggedIn){
      content = <AdminPage />
    }
    else{
      content = <LoginPage onClick={this.handleLogIn}/>
    }

    return (
      <div className="App w3-theme-l3">
        {content}
      </div>
    );
  }
}

export default App;
