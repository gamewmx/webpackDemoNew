// import React from 'react'
import  React,{useState,useEffect} from 'react'
import {bubbleSort, debounce, debouncea, flattenDeep, quickSort} from "./util/utils";
import './style/init.less'
import _ from 'lodash'


export default class demo extends React.Component<any, any>{
    constructor(props) {
        super(props);
        this.state={
            word:""
        }
    }

    componentDidMount() {
        // let arr = [10,22,[31,4,[5,6]]]
        // arr= flattenDeep(arr)
        // arr = quickSort(arr)
        // console.log(arr)
        // for(let i = 0 ;i < 10;i++ ){
        //     // (function(j){
        //     //     setTimeout(()=>{console.log(j+1)},j*1000)
        //     // })(i)
        //     setTimeout(()=>{
        //         console.log(i+1)},i*1000)
        // }
        // let a = BigInt(10)
        // console.log(typeof a)
    }

    myCall(context=window,...args){
        let key = Symbol('key')
        context[key] = window
        let result = context[key](...args)
        return result
    }

    myBind(context=window,...args){

    }

    wordChange = (e)=>{
        console.log('value:',e.target.value)
        this.setState({word:e.target.value})
    }

    debounce (func,wait = 1000){
        let timer:any = 0
        return function (...args) {
            console.log(timer,func)
            if(timer)   clearTimeout(timer)
            timer = setTimeout(()=>{
                func.apply(this,args)
            },wait)
        }
    }

    // throttle(func,wait=1000){
    //     let lastTime = 0
    //     return function (...args) {
    //         let now = new Date()
    //         if(now - lastTime > wait){
    //             lastTime = now
    //             func.apply(this,args)
    //         }
    //
    //     }
    // }


    render(){
        return(
            <div className={'wrapper'} onMouseMove={debouncea(function(){
                    console.log('===')
            }
                ,1000,true)}>
                <div className={'box'}/>
            </div>
            // <div onMouseMove={_.debounce(this.buttonClick)}>
            //     <button onClick={this.buttonClick}>debounceTest</button>
            //     <input value={this.state.word} onChange={_.debounce(this.wordChange,1000)}/>
            // </div>
        )
    }

}