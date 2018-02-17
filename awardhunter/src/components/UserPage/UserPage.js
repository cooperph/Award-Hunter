import React from 'react';

class UserPage extends React.Component {
    render() {
        return(
            <div>
                
                <div id="circle" className="center">Profile picture here</div>
                <div id="name" className="center"><b>FirstName LastName</b></div>
                <div id="email" className="center"><em>Email address</em></div>
                <div className="center"><b>Let me know what else we want on the user page!</b></div>
                <div id="awards" className="box">Awards</div>
                <p id="shapes" className="center">&#9681; &#9673; &#9678; &#9680; </p>
            </div>
        )
    }
}

export default UserPage;