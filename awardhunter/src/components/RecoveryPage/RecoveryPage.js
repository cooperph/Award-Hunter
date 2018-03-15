import React from 'react';
//import { Link } from 'react-router';
//import './components/RecoveryPage/RecoveryPage.css';


class RecoveryPage extends React.Component {
    render() {
        return(
            <div>
	            <h2>Password recovery page:</h2>
                <form>
                    <label>Username:
                        <input type="text" name="username" />
                    </label>
                    <br />
                    <label>Email Address:
                        <input type="text" name="email" />
                    </label>
                    <br />
                    <label>Last name:
                        <input type="text" name="lastName" />
                    </label>
                    <br />
                    <input type='submit' value='Get Password' />
                </form>
                
           	</div>
        )
    }
}


export default RecoveryPage;