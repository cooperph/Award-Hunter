import React from 'react';
//import SideBar from './SideBar/SideBar'
//import StatsPage from './StatsPage/StatsPage'
//import { Link } from 'react-router';
//import './components/RecoveryPage/RecoveryPage.css';


class RecoveryPage extends React.Component {
    render() {
        return(
            <div>
	            <p>Recovery Page:</p>
                <form>
                    <label>Username:
                        <input type="text" name="username" />
                    </label>
                    <br />
                    <p>or</p>
                    <label>Email Address:
                        <input type="text" name="email" />
                    </label>
                    <br />
                    <p>or</p>
                    <label>Last name:
                        <input type="text" name="lastName" />
                    </label>
                    <br />
                    <input type='submit' value='Reset Password' />
                </form>

                <form>
                    <input type='submit' value='Remember your password? Sign in' />
                </form>
                
           	</div>
        )
    }
}


export default RecoveryPage;