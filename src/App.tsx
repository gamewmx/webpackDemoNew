import React, { Component } from "react";
import Component1 from '../src/component1'
import {getStore} from "./store/createStore";
import Demo from './demo'
import Hoc from "./Hoc";
import A from "./A";
import Counter from './Counter'
import {BrowserRouter} from "react-router-dom";
import Map from './MapContainer'
import {connect} from "react-redux";
class App extends React.Component<any, any> {
    private counterRef = React.createRef()
    private connectRef = React.createRef()
    constructor(props) {
        super(props);
        this.state = {
            num : 0
        }
    }
    onClick = ()=>{
        let num = this.state.num
        num += 1
        this.setState({num})
    }

    componentDidMount() {
        // for(var i = 0 ; i <100 ; i++){
        //     (function(j){
        //         setTimeout(()=>{
        //             console.log(j)
        //         },1000*j)
        //     })(i)
        //
        //
        // }


    }

    render() {
        // const Wrap = Hoc(A)
        console.log(this.connectRef)
        return (
            <>
            {/*<Map/>*/}
            <A name={'why'} ref={this.connectRef}/>
                <button onClick={()=>this.props.dispatch({
                    type:'dispatchTest',
                    payload:[1,2,3]
                })}>test</button>
            <BrowserRouter>
                <h1> Hello111, World! ！！！！</h1>
                {/*<Component1 App={this}>*/}
                {/*    <div>1</div>*/}
                {/*    <div>2</div>*/}
                {/*</Component1>*/}
                <Demo/>
                {/*<div id={'mapContainer'}>*/}

                {/*</div>*/}



                <Counter num={this.state.num} onClick={this.onClick}/>
            </BrowserRouter>
            </>
        );
    }
}

const mapStateToProps= state=>{
    return({
        initReducer:state.initReducer
    })
}
export default connect(mapStateToProps)(App);
