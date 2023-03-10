import React, {MutableRefObject, useRef} from 'react'
import * as utils from './util/utils'
const Index = ()=>{
    console.log(utils)
    var timer
    const myDiv1  = useRef()
    const test  = useRef()
    // const myDiv : HTMLElement = document.querySelector('#myDiv')
    console.log(myDiv1)

    const click = ()=>{
        console.log(myDiv1)
        let myDiv = myDiv1.current
        let test1 = test.current
        // @ts-ignore
        myDiv.style.width = '10px';
        // @ts-ignore
        myDiv.style.height = "0px";
        // @ts-ignore
        test1.style.top = '20px'
        // @ts-ignore
        test1.style.left = '40px'
        cancelAnimationFrame(timer);
        // timer = requestAnimationFrame(function fn(){
        //     // @ts-ignore
        //     if(parseInt(myDiv.style.width) < 500){
        //         // @ts-ignore
        //         myDiv.style.width = parseInt(myDiv.style.width) + 5 + 'px';
        //         // @ts-ignore
        //         myDiv.innerHTML =     parseInt(myDiv.style.width)/5 + '%';
        //         timer = requestAnimationFrame(fn);
        //     }else{
        //         cancelAnimationFrame(timer);
        //     }
        // });
        timer = requestAnimationFrame(function fn(){
            // @ts-ignore
            if(parseInt(myDiv.style.height) < 500){
                // @ts-ignore
                myDiv.style.height = parseInt(myDiv.style.height) + 5 + 'px';
                // @ts-ignore
                myDiv.innerHTML = parseInt((myDiv.style.height))/5  + '%'
                // @ts-ignore
                test1.style.top = parseInt(test1.style.top) + 5 + 'px'
                timer = requestAnimationFrame(fn)
            }else{
                cancelAnimationFrame(timer)
            }
        })
    }

    return(
        <>
            <div ref={myDiv1} style={{"backgroundColor": 'lightblue',width: 10,height: 20,lineHeight: '20px'}}>0%</div>
            <button onClick={click} style={{position:"absolute",top:'800px'}}>run</button>
            <div ref={test} style={{border:'1px solid black',position:'absolute'}}>test</div>
            <div>
                <div style={{border:'1px solid black',paddingBottom:99,marginBottom:-99, width:200,float:'left'}}>left</div>
                <div style={{border:'1px solid black',paddingBottom:99,marginBottom:-99,width:200,float:'left'}}>center</div>
                <div style={{border:'1px solid black',paddingBottom:99,marginBottom:-99,width:200,float:'left'}}>right</div>
            </div>
        </>


    )
}
export default Index