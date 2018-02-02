import React from 'react';

class UserPage extends React.Component {
    render() {
        return(
            <div>

                <div id="circle" class="center">Profile picture here</div>
                <div id="name" class="center"><b>FirstName LastName</b></div>
                <div id="email" class="center"><em>Email address</em></div>
                <div class="center"><b>Let me know what else we want on the user page!</b></div>
                <div id="awards" class="box">Awards</div>
                <p id="shapes" class="center">&#9681; &#9673; &#9678; &#9680; </p>
            </div>
        )
    }
}

export default UserPage;