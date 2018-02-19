import React from 'react';

require('./ManageUser.css')

class ManageUser extends React.Component {
    render() {
        return(
            <div className='manage-container'>
                <p className='firstManage'>Change user name</p>
                <button className='firstBtn'>Change User Name</button>

                <p className='secondManage'>Delete user account</p>
                <button className='secondBtn'>Delete account</button>
            </div>
    )
    }
}

export default ManageUser;