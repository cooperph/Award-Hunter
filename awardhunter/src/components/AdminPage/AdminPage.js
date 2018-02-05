import React from 'react';
import { Tab,Tabs } from 'react-bootstrap';

class AdminPage extends React.Component {
    render() {
        return(
            <div>
                <div>
                    <p>Admin Page!</p>
                    <p>Admin page info here!</p> 
                </div>
                <div>
                    <Tabs defaultActiveKey={1} id='adminTabBar'>
                        <Tab eventKey={1} title="Create User">
                            <p>Tab 1 content</p>
                        </Tab>
                        <Tab eventKey={2} title="Create Admin">
                            <p>Tab 2 content</p>
                        </Tab>
                        <Tab eventKey={3} title="Other Stuff">
                            <p>Tab 3 content</p>
                        </Tab>
                    </Tabs>
                </div>
            </div>
        )
    }
}

export default AdminPage;