import React, {useState} from 'react'
import Hoc from "./Hoc";
import {connect} from "react-redux";
import { getStore } from './store/createStore';


const Auth = enhanceComponent(carPage)

class Index extends React.Component<any, any>{
    constructor(props) {
        super(props);
    }
    render(){
        console.log(this.props);
        
        return (
            <div>
                <Auth a={123}></Auth>
                <button onClick={()=>this.props.dispatch({
                    type:'refTest',
                    payload:'1111'
                })}>refTest</button>
            </div>
        )
    }
}

function LoginPage(props){
    return(
        <div>
            <h2>LoginPage</h2>
        </div>
    )
}

function carPage(props){
    return(
        <div>
            <h2>carPage</h2>
        </div>
    )
}

function enhanceComponent(WrappedComponent){
    console.log(getStore());
    
    function newComponent(props){
        const [isLogin,setLogin] = useState(false)
        return(
            <div>
                <button onClick={()=>setLogin(!isLogin)}>切换</button>
                {
                    isLogin ? <WrappedComponent {...props}/> : <LoginPage {...props}/>
                }
            </div>
        )
    }
    return newComponent
}
export default connect(null,null,null,{forwardRef:true})(Index)