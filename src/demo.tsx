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

    // debounce = (fn , wait = 1000)=>{
    //     let timer = 0
    //     return function (...args){
    //         if(timer) clearTimeout(timer)
    //         timer = setTimeout(()=>{
    //             fn.apply(this,args)
    //         },wait)
    //     }
    // }

    // throttle = (fn,wait = 1000)=>{
    //     let lastTime
    //     return function(...args){
    //         let now = new Date()
    //         if(now - lastTime > wait){
    //             fn.apply(this,args)
    //             lastTime = now
    //         }
    //     }
    // }
    //
    // throttle(func,wait=1000){
    //     let lastTime
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
          <>
              {/*<div style={{border:'1px solid black',width:500,height:500,position:'relative'}}>*/}
              {/*    <div style={{border:'1px solid black',top:'50%',width:100,height:100,position:'absolute',transform:'translateY(-50%)'}}></div>*/}
              {/*    /!*<div style={{border:'1px solid black',margin:20,width:100,height:100,float:'left'}}></div>*!/*/}
              {/*</div>*/}
              {/*<div style={{height:100}}>*/}
              {/*    <div style={{border:'1px solid black',width:100,height:100,float:'left'}}></div>*/}
              {/*    /!*<div style={{overflow:'hidden'}}>*!/*/}
              {/*    <div style={{border:'1px solid black',height:100,marginLeft:'100px'}}></div>*/}
              {/*    /!*</div>*!/*/}
              {/*</div>*/}
              {/*<div className="container">*/}

              {/*    <div className="left"></div>*/}
              {/*    <div className="main"></div>*/}
              {/*    <div className="right"></div>*/}
              {/*</div>*/}
              <div className="content">
                  <div className="main"></div>
              </div>
              <div className="left"></div>
              <div className="right"></div>
          </>
        )
    }

}