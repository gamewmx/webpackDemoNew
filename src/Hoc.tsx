import React, {useEffect} from "react";
import {useState} from "react";

export default function Hoc(WrappedComponent){
    const a = '12323'
    return class extends React.Component<any, any> {
        constructor(props) {
            super(props);
            console.log(props)
            this.state = {
                loading: true
            }
        }
        componentDidMount() {
            setTimeout(()=>{
                this.setState({loading:false})
            },5000)
        }


        render() {
            const {loading} = this.state
            return loading? 'loading' :<WrappedComponent {...this.props} a={a}/>
        }
    }
}