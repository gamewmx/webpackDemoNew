import React, { Component } from "react";
import Component1 from '../src/component1'
import {getStore} from "./store/createStore";
import Demo from './demo'
import Hoc from "./Hoc";
import A from "./A";
import Counter from './Counter'

class App extends React.Component<any, any> {
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
    render() {
        let Wrap = Hoc(A)
        return (
            <>
                <h1> Hello111, World! ！！！！</h1>
                {/*<Component1 App={this}>*/}
                {/*    <div>1</div>*/}
                {/*    <div>2</div>*/}
                {/*</Component1>*/}
                <Demo/>
                {/*<Wrap/>*/}
                {/*<Counter num={this.state.num} onClick={this.onClick}/>*/}
            </>
        );
    }
}

export default App;
