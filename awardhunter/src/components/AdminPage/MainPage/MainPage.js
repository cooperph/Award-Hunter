import React from 'react'

require('./MainPage.css')

class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          activePage: 'tab1',
        };

        this.changeTab = this.changeTab.bind(this);
      }

    changeTab(e) {
        if(this.nextState !== this.state){
            //console.log(document.getElementById())
            console.log(e.target.id);
            this.setState({
                activePage: e.target.id
            })
        }
    }

    render() {
        let content = null;
        switch(this.state.activePage){
        case 'tab2':
            content = <p>Tab 2</p>
            break;
        case 'tab3':
            content = <p>Tab3</p>
            break;
        default:
            content = <p>Tab 1</p>
        }
        return(
            <div className="main-container">
                {/* tabs */}
                <div className="main-inner main-sub-container tabbar">
                    <div className="tab-item" id='tab1' onClick={this.changeTab}>tab 1</div>
                    <div className="tab-item" id='tab2' onClick={this.changeTab}>tab 2</div>
                    <div className="tab-item" id='tab3' onClick={this.changeTab}>tab 3</div>
                </div>
                {/* tab content part */}
                <div className="main-inner main-content">
                    {content}
                </div>
            </div>
        )
    }
}

export default MainPage;