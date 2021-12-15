import React, {Component, useEffect, useImperativeHandle, useRef, useState} from "react";
import ReactDOM from 'react-dom';
import {useDispatch, useSelector, useStore} from "react-redux";
import './style/init.less'
import {debounce} from "./util/utils";
interface students{
    name:string;
    age:number;
    [key:string]:any;
}

export default function component1(props){
    const inputRef = useRef<HTMLInputElement>(null)
    const store = useStore()
    const b = useSelector(selector=>selector['initReducer'])
    const dispatch = useDispatch()
    const [count,setCount] = useState(0)
    let user = {name:'a'}

    const [obj,setobj] = useState({})
    function add<Number>(a:number,b:number){
        return a+b
        // return a+b
    }

    interface User{
        id:string;
        name:string;
    }


    useEffect(()=>{
        let fun1 = f1().f2()
        let fun2 = f1().f3()
        console.log(fun1,fun2)
        Object.defineProperty(user, 'name', {
            set : function(value){
                console.log('set: name:' + value)
            }
        })
        test({
            name: 'w',
            age: 1,
            work: 'w'
        }, 'name');
    },[])

    function test<T, Key extends keyof T> (obj: T, key: Key): T[Key] {
        console.log(obj[key])
        return obj[key];
    }

    function f1(){
        var a = 999
        var b = 1000
        function f2(){
            console.log(a)
            return a
        }
        function f3(){
            console.log(b)
            return b
        }
        return {f2,f3}
    }
    //
    // function debounce(fn,wait = 1000){
    //     let timer : any= false
    //     console.log(timer)
    //     return function debounced(...args){
    //         console.log(timer)
    //         if(timer) {
    //             clearTimeout(timer)
    //         }
    //         // @ts-ignore
    //         timer = setTimeout(()=>{
    //             // fn.apply(this,...args)
    //             console.log(args)
    //             fn(...args)// @ts-ignore
    //             timer = null
    //         },wait)
    //     }
    // }


    // function throttle(fn,delay = 1000){
    //     let flag = true
    //     return function (...args){
    //         if(!flag){
    //             return false
    //         }
    //         flag = false
    //         setTimeout(()=>{
    //             fn.apply(this,...args)
    //             flag = true
    //         },delay)
    //     }
    // }
    //
    // function throttle2(fn,delay = 1000){
    //     let prevTime
    //     return function(...args){
    //         const _this = this
    //         const nowTime = Date.now()
    //         if(nowTime - prevTime >= delay){
    //             fn.apply(_this,...args)
    //             prevTime = nowTime;
    //         }
    //     }
    // }

    function divonmouseover(){
        user.name = 'b'
        debounce(()=>{
            console.log('111')},500)
    }

    return(
        <>
            {/*<div className={'tri-angle-test'}></div>*/}
        {/*<div>hhhhh</div>*/}
        {/*<button onClick={()=>{let numb = add<Number>(count,1);setCount(numb);if(inputRef.current) {*/}
        {/*    inputRef.current.focus()*/}
        {/*}}}>+({count})</button>*/}
        {/*    <button onClick={()=>*/}
        {/*        dispatch({type:'addCount',payload:10})*/}
        {/*    }>reducer</button>*/}
        {/*<RefButton ref={inputRef}></RefButton>*/}
        {/*<div className={'container'}>*/}
        {/*    <div className={'items'} style={{flexGrow:1}}></div>*/}
        {/*    <div className={'items'} style={{flexGrow:1}}></div>*/}
        {/*    <div className={'items'} style={{flexGrow:1}}></div>*/}
        {/*    <div className={'items'} style={{flexGrow:1}}></div>*/}
        {/*    <div className={'items'} style={{flexGrow:1}}></div>*/}
        {/*    <div className={'items'} style={{flexGrow:1}}></div>*/}
        {/*    <div className={'items'} style={{flexGrow:1}}></div>*/}
        {/*</div>*/}
        {/*<div className={'parent'}>*/}
        {/*    <div className={'child'}></div>*/}
        {/*</div>*/}
            <div className={'BFC-margin-test'}>
                <div className={'bfc1'}></div>
                <div className={'bfc2'}></div>
            </div>
        </>
    )
}
const RefButton = React.forwardRef((props,ref)=>{
    const inputRef = useRef<HTMLInputElement>(null)
    useImperativeHandle(ref,()=>({
        focus:()=>{
            if(inputRef.current){
                inputRef.current.focus()
            }
        }
    }))
    return (
        <input ref={inputRef}/>
    )
})
