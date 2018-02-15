import React from 'react';
import SideBar from './SideBar/SideBar'
import MainPage from './MainPage/MainPage'

require('./AdminPage.css')

class AdminPage extends React.Component {
    render() {
        return(
            <div className='admin-container'>
                <div className='sidebar'>
                    <SideBar />
                </div>
                <div className='main-admin'>
                    <MainPage />
                </div>
            </div>
        )
    }
}

export default AdminPage;