import React from 'react'
import Hoc from "./Hoc";

export default class A extends React.Component<any, any>{
    constructor(props) {
        super(props);
        console.log(props)
    }
    render(){
        return <div>A</div>
    }
}