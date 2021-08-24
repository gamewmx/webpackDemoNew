import React from "react";
import ReactDOM from "react-dom";
import App from "./App.tsx";
import store from './store/createStore'
import {Provider} from 'react-redux'
ReactDOM.render(<Provider store={store()}>
    <App />
</Provider>, document.getElementById("app"));
