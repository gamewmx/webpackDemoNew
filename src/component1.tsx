import React, {Component, useEffect, useImperativeHandle, useRef, useState} from "react";
import ReactDOM from 'react-dom';
import {useDispatch, useSelector, useStore} from "react-redux";
import './style/init.less'
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
    function add<Number>(a:number,b:number){
        return a+b
        // return a+b
    }


    useEffect(()=>{
        console.log(store.getState(),b)
    },[])

    return(
        <>
        <div>hhhhh</div>
        <button onClick={()=>{let numb = add<Number>(count,1);setCount(numb);if(inputRef.current) {
            inputRef.current.focus()
        }}}>+({count})</button>
            <button onClick={()=>
                dispatch({type:'addCount',payload:10})
            }>reducer</button>
        <RefButton ref={inputRef}></RefButton>
        <div className={'container'}>
            <div className={'items'} style={{flexGrow:1}}></div>
            <div className={'items'} style={{flexGrow:1}}></div>
            <div className={'items'} style={{flexGrow:1}}></div>
            <div className={'items'} style={{flexGrow:1}}></div>
            <div className={'items'} style={{flexGrow:1}}></div>
            <div className={'items'} style={{flexGrow:1}}></div>
            <div className={'items'} style={{flexGrow:1}}></div>

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
