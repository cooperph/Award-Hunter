import React from 'react';

class LoginPage extends React.Component {
    render() {
        return(
            <div className='w3-content'>
                <header className='w3-container w3-center w3-padding-32 w3-theme'>
                    <h1>Welcome to AwardHunter</h1>
                    <p>Please login to get started!</p>
                </header>   
                <h3>Login Page!</h3>
                <button onClick={this.props.onClick} >Click ME!</button>  
            </div>
        )
    }
}

export default LoginPage;