import React, { Component } from "react";
import Component1 from '../src/component1'
import {getStore} from "./store/createStore";
import Demo from './demo'
import Hoc from "./Hoc";
import A from "./A";
import Counter from './Counter'
import {BrowserRouter, Routes} from "react-router-dom";
import Map from './MapContainer'
import {connect} from "react-redux";
import MockMemo from "./memoCallBack";
import _ from "lodash";
import {myPromise , MyPromise , Promise1} from '../myPromise'
import WebRtc from './WebRtc'
import RafTest from './raftest'
import {Route} from "react-router";

class App extends React.Component<any, any> {
    private counterRef = React.createRef()
    private connectRef = React.createRef()
    constructor(props) {
        super(props);
        this.state = {
            num : 0,
            list : [{
                name:'1'
            },{
                name:"2"
            },{
                name:'3'
            }]
        }
    }
    onClick = ()=>{
        let num = this.state.num
        num += 1
        this.setState({num})
    }

    fn = (arr,checkedKeys,searchStr="")=>{
        console.log(arr,checkedKeys)
        let temp = _.cloneDeep(arr)
        function recursiveFn1(temp, checkedKeys,searchStr) {
            let arr = []
            temp.map(item => {
                if (item.children.length>0) {
                    let children = item.children
                    item.children = recursiveFn1(children, checkedKeys,searchStr)
                    if ((item.name.includes(searchStr) && checkedKeys.includes(item.codePath))) {
                        arr.push(item)
                    }
                } else {
                    if (item.name.includes(searchStr) && checkedKeys.includes(item.codePath)) {
                        arr.push(item)
                    }
                }
            })
            return arr
        }

        recursiveFn1(temp,checkedKeys,searchStr)
    }

    handleTreeData = (treeData, searchValue,checkedKeys) => {
        if (!treeData || treeData.length === 0) {
            return [];
        }
        const array = [];
        for (let i = 0; i < treeData.length; i += 1) {
            if (this.handleTreeData(treeData[i].children, searchValue,checkedKeys).length > 0 || (treeData[i].name.includes(searchValue) && checkedKeys.includes(treeData[i].codePath))) {
                array.push({
                    ...treeData[i],
                    children: this.handleTreeData(treeData[i].children, searchValue,checkedKeys),
                });
            }
        }
        return array;
    }

    componentDidMount() {
        // for(var i = 0 ; i <100 ; i++){
        //     (function(j){
        //         setTimeout(()=>{
        //             console.log(j)
        //         },1000*j)
        //     })(i)
        //
        //
        // }
        // 输出 ”成功“
        const test = new Promise1((resolve, reject) => {
            // resolve('下次一定')
            throw new Error('白嫖失败')
            resolve('下次')
        }).then((res)=>{
            console.log(res)},(reason)=>{
            console.log(reason)}).then(res=>{

        })
        this.bagWeightTest([1,3,4],[15,20,30])

        // const timer = requestAnimationFrame(()=>{
        //     console.log('rafTest')
        // })
        // console.log(timer)
    }

    bagWeightTest = (weight,value)=>{
        let len = weight.length
        let dp = new Array(len).fill(0).map(item=>new Array(value.length).fill(0))
        const bagWeight = 4
        for(let j = weight[0] ; j <= bagWeight ; j++ ){
            dp[0][j] = value[0]
        }
        for(let j = 0 ; j <= bagWeight ; j++ ){
            for(let i = 1 ; i < weight.length ; i++ ){
                if(j < weight[i]){
                    dp[i][j] = dp[i-1][j]
                }else{
                    dp[i][j] = Math.max(dp[i-1][j-weight[i]]+value[i],dp[i-1][j])
                }
            }
        }
        console.log(dp)
    }

    render() {
        const {list} = this.state
        // const Wrap = Hoc(A)
        return (
            <>
                hello world
                {/*<div id={'testtt'}>123</div>*/}
            {/* <Map/> */}
            {/* <A name={'why'} ref={this.connectRef} initReducer={this.props.initReducer}/> */}
            {/*<button onClick={()=>this.props.dispatch({*/}
            {/*    type:'dispatchTest',*/}
            {/*    payload:[1,2,3]*/}
            {/*})}>test</button>*/}
            {/*    <button onClick={()=>{*/}
            {/*        const temp = list*/}
            {/*        temp.push({name:Math.random() * 10})*/}
            {/*        this.setState({list:temp})*/}
            {/*        const arr: HTMLElement = document.querySelector('#testtt')*/}
            {/*        arr.style.display = 'false'*/}
            {/*        console.log(!arr.style.display)*/}
            {/*    }}>test123123</button>*/}
            {/*<MockMemo/>*/}
                {/*{list.map(item=>{return item.name})}*/}
            <BrowserRouter>

                {/*<Component1 App={this}>*/}
                {/*    <div>1</div>*/}
                {/*    <div>2</div>*/}
                {/*</Component1>*/}

                {/*<div id={'mapContainer'}>*/}

                {/*</div>*/}
                {/*<Counter num={this.state.num} onClick={this.onClick}/>*/}
                <Routes>
                        <Route path={'/rtc'} element={<WebRtc/>}/>
                        <Route path={'/demo'} element={<Demo/>}/>
                </Routes>
            </BrowserRouter>
                {/*<RafTest/>*/}
            </>
        );
    }
}

const mapStateToProps= state=>{
    return({
        initReducer:state.initReducer
    })
}
export default connect(mapStateToProps)(App);
