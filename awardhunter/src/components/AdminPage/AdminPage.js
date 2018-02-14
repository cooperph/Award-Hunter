import React from 'react';
import SideBar from './SideBar/SideBar'
import MainPage from './MainPage/MainPage'

require('./AdminPage.css')

class AdminPage extends React.Component {
    render() {
        return(
            <div className='w3-content flex-container'>
                <div className='sideBar w3-red'>
                    <SideBar />
                </div>
                <div className='main w3-blue'>
                    <MainPage />
                </div>
            </div>
        )
    }
}

export default AdminPage;