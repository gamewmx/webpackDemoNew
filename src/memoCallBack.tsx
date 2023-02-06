
import React, { useState, useCallback, useEffect } from 'react';

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
        console.log(1);
        setCount(count+1)
    },[fn])


    return (
        <div>
            <div>
                <TestButton title="普通点击" onClick={() => setCount(count + 1) }/>
                <TestButton title="useCallback点击" onClick={add}/>
            </div>
            <div style={{marginTop: 20}}>count: {count}</div>
            <button onClick={() => {setShow(!show)}}> 切换</button>
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