
import React, { useState, useCallback, useEffect } from 'react';
import SlidingWindowScrollHook from "./util/SlidingWindowScrollHook";
const MY_ENDLESS_LIST = [
    {
        key: 1,
        value: 'A'
    },
    {
        key: 2,
        value: 'B'
    },
    {
        key: 3,
        value: 'C'
    },{
        key: 4,
        value: 'D'
    },{
        key: 5,
        value: 'E'
    },{
        key: 6,
        value: 'F'
    },{
        key: 7,
        value: 'G'
    },{
        key: 8,
        value: 'H'
    },{
        key: 9,
        value: 'I'
    },{
        key: 10,
        value: 'J'
    },{
        key: 11,
        value: 'K'
    },{
        key: 12,
        value: 'L'
    },{
        key: 13,
        value: 'M'
    },{
        key: 14,
        value: 'N'
    },{
        key: 15,
        value: 'O'
    },{
        key: 16,
        value: 'P'
    },{
        key: 17,
        value: 'Q'
    },{
        key: 18,
        value: 'R'
    },{
        key: 19,
        value: 'S'
    },{
        key: 20,
        value: 'T'
    },{
        key: 21,
        value: 'U'
    },
    {
        key: 45,
        value: 'AS'
    }
]

const MockMemo: React.FC<any> = () => {
    const [count,setCount] = useState(0)
    const [show,setShow] = useState(true)

    const add = useCallback(()=>{
        setCount(count + 1)
    },[count])

    const fn = useCallback(()=>{},[])

    // useEffect(()=>{
    //     fn()
    // },[count])

    useEffect(()=>{
        setCount(count+1)
        // var observer = new IntersectionObserver(((entries, observer1) => {
        //     entries.forEach(entry=>{
        //         if(entry.isIntersecting){
        //             console.log('进入啦')
        //         }else{
        //             console.log('退出啦')
        //         }
        //     })
        // }))
        // observer.observe(document.querySelector('#test3'))
    },[fn])


    return (
        <div style={{height:300}} id={'test'}>
            {/*<div style={{height:'1500px'}} id={'test2'}>*/}
            {/*    <TestButton title="普通点击" onClick={() => setCount(count + 1) }/>*/}
            {/*    <TestButton title="useCallback点击" onClick={add}/>*/}
            {/*</div>*/}
            {/*<div style={{marginTop: 20}} id={'test3'}>count: {count}</div>*/}
            {/*<button onClick={() => {setShow(!show)}}> 切换</button>*/}
            {/*<SlidingWindowScrollHook dataSource={MY_ENDLESS_LIST} height={100}/>*/}
        </div>
    )
}

const TestButton = React.memo((props:any)=>{
    console.log(props.title)
    return <button color='primary' onClick={props.onClick} style={props.title === 'useCallback点击' ? {
        marginLeft: 20
    } : undefined}>{props.title}</button>
})

export default MockMemo;