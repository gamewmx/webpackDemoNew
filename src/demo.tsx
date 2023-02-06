// import React from 'react'
import  React,{useState,useEffect} from 'react'
import  {bubbleSort, debounce, debouncea, flattenDeep, quickSort} from "./util/utils";
import './style/init.less'
import _ from 'lodash'
import EventBus from "./EventBus";

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
        // this.getLocalStream({
        //     audio: false,
        //     video: true,
        // })
        // this.getDevices()
        // var eventBus = new EventBus()
        // eventBus.on('change',()=>{
        //     console.log('1111')
        // })
        // this.setState({
        //     test:eventBus
        // })

    }

    // 获取所有视频输入设备
    async getDevices() {
        const devices = await navigator.mediaDevices.enumerateDevices()
        console.log('🚀🚀🚀 / devices', devices)
        // let videoDevices = devices.filter((device) => device.kind === 'videoinput')
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

    canvastest(){
        const cnv : HTMLElement = document.getElementById('c')
        const cxt = (cnv as any).getContext('2d')
        const ctx = (cnv as any).getContext('2d')
        // cxt.moveTo(100,100)
        // cxt.lineTo(200,100)
        // // cxt.lineTo(300,500)
        // cxt.strokeStyle = 'red'
        // cxt.stroke()
        // cxt.beginPath()
        // cxt.moveTo(0,100)
        // cxt.lineWidth = 20
        // cxt.strokeStyle = 'blue'
        // cxt.lineCap = 'round'
        // cxt.lineTo(20,100.5)
        // // cxt.lineTo(100,500.2)
        // cxt.stroke()
        // cxt.fillStyle='red'
        // cxt.fillRect(0,100,100,202)
        // setTimeout(()=>{
        //     cxt.clearRect(0,0,(cnv as any).width,(cnv as any).height)
        // },2000)

        // cxt.moveTo(0,0)
        // cxt.lineTo(100,100)
        // cxt.lineTo(0,100)
        // cxt.strokeStyle = 'red'
        // cxt.closePath()
        // cxt.stroke()
        // cxt.font= '30px 宋体'
        // cxt.strokeStyle='red'
        // cxt.strokeText('陈曼琦',100,100,500)
        //
        //
        //
        // cxt.beginPath()
        // cxt.arc(300,200,100,0, 360 * Math.PI / 180,true)
        // // cxt.closePath()
        // cxt.lineWidth = 10
        // cxt.strokeStyle = 'red'
        // // cxt.setLineDash([10,20,30])
        // cxt.fillStyle = 'blue'
        // cxt.fill()
        // cxt.stroke()
        function clock(){
            cxt.save()
            cxt.clearRect(0,0,1000,1000)
            cxt.translate(300,300)
            cxt.save()


            cxt.beginPath()
            cxt.arc(0,0,100,0,360 * Math.PI / 180)
            cxt.stroke()
            cxt.closePath()

            cxt.beginPath()
            cxt.arc(0,0,5,0,360 * Math.PI / 180)
            cxt.stroke()
            cxt.closePath()


            let time = new Date()
            let hour = time.getHours() % 12
            let min = time.getMinutes()
            let sec = time.getSeconds()

            //时针
            cxt.rotate( 360 * Math.PI / 180 / 12 * hour + 360 * Math.PI / 180 /12 * min / 60 - Math.PI / 2)
            cxt.beginPath()
            cxt.moveTo(-10,0)
            cxt.lineTo(40,0)
            cxt.lineWidth = 10
            cxt.stroke()
            cxt.closePath()
            cxt.restore()
            cxt.save()
            //分针
            cxt.rotate(2 * Math.PI / 60 * min + 2 * Math.PI / 60 * (sec / 60) - Math.PI / 2)
            cxt.beginPath()
            cxt.moveTo(-10, 0)
            cxt.lineTo(60, 0)
            cxt.lineWidth = 5
            cxt.strokeStyle = 'blue'
            cxt.stroke()
            cxt.closePath()
            cxt.restore()
            cxt.save()
//秒针
            cxt.rotate(2 * Math.PI / 60 * sec -  - Math.PI / 2)
            cxt.beginPath()
            cxt.moveTo(-10, 0)
            cxt.lineTo(80, 0)
            cxt.strokeStyle = 'red'
            cxt.stroke()
            cxt.closePath()
            cxt.restore()
            cxt.save()
// 绘制刻度，也是跟绘制时分秒针一样，只不过刻度是死的
            ctx.lineWidth = 1
            for (let i = 0; i < 60; i++) {
                ctx.rotate(2 * Math.PI / 60)
                ctx.beginPath()
                ctx.moveTo(90, 0)
                ctx.lineTo(100, 0)
                // ctx.strokeStyle = 'red'
                ctx.stroke()
                ctx.closePath()
            }
            ctx.restore()
            ctx.save()
            ctx.lineWidth = 5
            for (let i = 0; i < 12; i++) {
                ctx.rotate(2 * Math.PI / 12)
                ctx.beginPath()
                ctx.moveTo(85, 0)
                ctx.lineTo(100, 0)
                ctx.stroke()
                ctx.closePath()
            }

            ctx.restore()
            ctx.restore()



        }
        setInterval(()=>{
            clock()
        },1000)



    }

    // 获取本地音视频流
    async getLocalStream(constraints: MediaStreamConstraints) {
        // 获取媒体流
        const stream = await navigator.mediaDevices.getUserMedia({audio: false,
            video: true,})
        this.playLocalStream(stream)
    }
    // 播放本地视频流
    playLocalStream(stream: MediaStream) {
        const videoEl = document.getElementById('localVideo') as HTMLVideoElement
        videoEl.srcObject = stream
    }

    render(){
        return(
            <>
            <div className={'wrapper'} onMouseMove={debouncea(function(){
                    console.log('===')
            }
                ,1000,true)}>
                <div className={'box'} >canvas</div>
            </div>
                <button onClick={()=>{this.state.test.emit('change')}}>eventBus</button>
                <button onClick={()=>{this.state.test.off('change')}}>eventBusDelete</button>
                <button onClick={()=>{
                    (document.querySelector('.wrapper') as HTMLElement).style.display  = (document.querySelector('.wrapper') as HTMLElement).style.display === 'block' ? 'none' : 'block'
                }}>RequestAnimationFrameTest</button>
            {/*<canvas  id="c"*/}
            {/*         width="1000"*/}
            {/*         height="1000"*/}
            {/*         style={{"border": '1px solid #ccc',margin:20}} onClick={this.canvastest}></canvas>*/}
            {/*    <video id="localVideo" autoPlay playsInline muted></video>*/}
            </>
            // <div onMouseMove={_.debounce(this.buttonClick)}>
            //     <button onClick={this.buttonClick}>debounceTest</button>
            //     <input value={this.state.word} onChange={_.debounce(this.wordChange,1000)}/>
            // </div>
        )
    }

}