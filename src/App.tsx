import React, { Component } from "react";
import Component1 from '../src/component1'
import {getStore} from "./store/createStore";
class App extends Component {
    render() {
        console.log(this.props,getStore().getState())
        return (
            <>
                <h1> Hello111, World! ！！！！</h1>
                <Component1 App={this}>
                    <div>1</div>
                    <div>2</div>
                </Component1>
            </>
        );
    }
}

export default App;
