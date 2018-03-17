import React from 'react'
import Table from '../../Table/Table'

require('./StatsPage.css')

class StatsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          //activePage: 'tab1',
          schema: ['Award Type', 'Got Award', 'Gave Award', 'Department'],
          data:[]
        };

        //this.changeTab = this.changeTab.bind(this);
        this.buildData = this.buildData.bind(this);
      }
    
    componentDidMount() {
        if(this.props.rawData !== null && this.props.rawData !== undefined){
            this.buildData(this.props.rawData);
        } 
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.rawData !== null && nextProps.rawData !== undefined && nextProps.rawData.length > 0){
            if( nextProps !== this.props ) {
                this.buildData(nextProps);
            }
        }
    }

    // changeTab(e) {
    //     if(this.nextState !== this.state){
    //         this.setState({
    //             activePage: e.target.id
    //         })
    //     }
    // }

    buildData(data) {
        //console.log('stats - raw ',rawData)
        if(data.rawData){
            let newData = [];
            for( var i = 0; i < data.rawData.length; i++) {
                let innerData = [];
                innerData = Object.values(data.rawData[i])
                newData.push(innerData)
            }
            if(this.refs.statsRef){
                this.setState({
                    data: newData,
                })
            }
        }
    }

    render() {
        // let content = null;
        // switch(this.state.activePage){
        // case 'tab2':
        //     content = <p>Tab 2</p>
        //     break;
        // case 'tab3':
        //     content = <p>Tab3</p>
        //     break;
        // default:
        //     content = <p>Tab 1</p>
        // }
        return(
            // <div className="main-container">
            //     {/* tabs */}
            //     <div className="main-inner main-sub-container tabbar">
            //         <div className="tab-item" id='tab1' onClick={this.changeTab}>tab 1</div>
            //         <div className="tab-item" id='tab2' onClick={this.changeTab}>tab 2</div>
            //         <div className="tab-item" id='tab3' onClick={this.changeTab}>tab 3</div>
            //     </div>
            //     {/* tab content part */}
            //     <div className="main-inner main-content">
            //         {content}
            //     </div>
            // </div>
            <div className='statsPage' style={{overflowY:'scroll', height:'90vh'}}>
                <div ref='statsRef'>
                <br/>
                <h1>Statictics</h1>
                <hr />
                <Table schema={this.state.schema} data={this.state.data} 
                        type={this.props.type} repull={this.props.repull}
                        buttons='false'/>
            </div>
            </div>
        )
    }
}

export default StatsPage;