import React from 'react'

require('./SideBar.css')

class SideBar extends React.Component {
    render() {
        return(
            <div>
                <div>
                    <p>picture and welcome part</p>
                </div>
                <hr />
                <div>
                    <p>Links to different parts of the admin page</p>
                </div>
            </div>
        )
    }
}

export default SideBar;