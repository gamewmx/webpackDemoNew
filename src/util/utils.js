import {value} from "lodash/seq";


export function debounce(fn, delay = 1000) {
        // 定时器，用来 setTimeout
      var timer

        // 返回一个函数，这个函数会在一个时间区间结束后的 delay 毫秒时执行 fn 函数
        return function () {

               // 保存函数调用时的上下文和参数，传递给 fn
               var context = this
               var args = arguments

               // 每次这个返回的函数被调用，就清除定时器，以保证不执行 fn
               clearTimeout(timer)

              // 当返回的函数被最后一次调用后（也就是用户停止了某个连续的操作），
               // 再过 delay 毫秒就执行 fn
             timer = setTimeout(function () {
                    fn.apply(context, args)
                }, delay)
       }
     }

export function debounce1 (func,wait = 1000){
    let timer = 0
    return function (...args) {
        console.log(timer,func)
        if(timer)   clearTimeout(timer)
        timer = setTimeout(()=>{
            func.apply(this,args)
        },wait)
    }
}

export function throttle(func,wait=1000){
    let lastTime = 0
    return function (...args) {
        let now = new Date()
        if(now - lastTime > wait){
            lastTime = now
            func.apply(this,args)
        }

    }
}

export function deepClone (obj){
    if(typeof obj !== 'object' || obj === null){
        return obj
    }

    let copy = {}
    if(obj.constructor === Array){
        copy = []
    }

    for(let key in obj){
        if(obj.hasOwnProperty(key)){
            copy[key] = deepClone(obj[key])
        }
    }
    return copy
}

export function myCall(context = window , ...args){
    let key = Symbol('key')
    context[key] = this
    let result = context[key](...args)
    delete context['key']
    return result
}

export function myBind(context , ...outerargs){
    let self = this

    return function F(...innerArgs){
        if(self instanceof F){
            return new self(...outerargs,...innerArgs)
        }
        return self.apply(context,[...outerargs,...innerArgs])
    }
}


function myPromise(constructor){
    let self = this
    self.status = 'pending'
    self.value = undefined
    self.reason = undefined

    function resolve(value){
        if(self.status === 'pending'){
            self.value = value
            self.status  = 'resolved'
        }
    }
    function reject(reason){
        if(self.status === 'pending'){
            self.reason = reason
            self.status  = 'rejected'
        }
    }

    function then(onFullfilled,onRejected){
        if(self.status === 'resolved'){
            onFullfilled(self.value)
        }else{
            onRejected(self.reason)
        }
    }

    try{
        constructor(resolve,reject)
    }catch (e) {
        reject(e)
    }

}

function flatten(array){
    return array.reduce((total,current)=>{
        return total.concat((Array.isArray(current) ? flatten(current) : current )  )
    },[])
}


export function flattenDeep(arr){
    return arr.reduce((total,current)=>{
        return total.concat((Array.isArray(current)? flattenDeep(current): current))
    },[])
}

export function bubbleSort(arr){
    if(!Array.isArray(arr)){
        return
    }
    for(let i= 0 ;i<arr.length ;i++){
        for(let j = 0;j<arr.length - i -1;j++){
            if(arr[j] > arr[j+1]){
                let temp = arr[j+1]
                arr[j+1] = arr[j]
                arr[j] = temp
            }
        }
    }
    console.log(arr)
    return arr
}
function bubbleSort1(array){
    if(!Array.isArray(array)){
        return
    }
    for(let i = 0 ; i < array.length ; i ++ ){
        for(let j = 0 ; j < array.length - i -1 ; j ++ ){
            if( array[j] > array[j+1] ){
                let temp = null
                temp = array[j+1]
                array[j+1] = array[j]
                array[j] = temp
            }
        }
    }
}

export function quickSort(list){
    if(list.length <= 1)return list

    let midIndex = Math.floor(list.length/2)
    let midValue = list[midIndex]
    let left = []
    let right = []

    for(let i=0;i < list.length;i++){
        if(i === midIndex) continue
        if(list[i] < midValue) {
            left.push(list[i])
        }else{
            right.push(list[i])
        }
    }

    return [...quickSort(left),midValue,...quickSort(right)]
}

function quickSort1(array){
    if(!Array.isArray(array))   return;
    let midIndex = Math.floor((array.length/2))
    let midValue = list[midIndex]
    let left = []
    let right = []
    for(let i = 0 ; i< array.length ; i ++){
        if(midValue === array[i])   continue
        if(array[i] < midValue ){
            left.push(array[i])
        }else{
            right.push(array[i])
        }
    }
    return [...quickSort(left),midValue,...quickSort(right)]

}


class Promise{

    static PENDING = "待定";
    static FULFILLED= "成功";
    static REJECTED = "拒绝";
    constructor(func) {
        this.status = Promise.PENDING
        this.result = null
        try{//直接在func中 throw错误时的捕捉
            func(this.resolve.bind(this),this.reject.bind(this))//new Promise对象时，传入的方法会立刻执行   所以构造函数里执行传入的func
        }catch (e) {
            this.reject(e)
        }

    }

    resolve(result){
        if(this.status === Promise.PENDING){
            this.status = Promise.FULFILLED
            this.result = result
        }
    }

    reject(result){
        if(this.status === Promise.PENDING){
            this.status = Promise.REJECTED
            this.result = result
        }
    }

    then(onFullFilled,onRejected){
        onFullFilled = typeof onFullFilled === 'function'?onFullFilled:()=>{}
        onRejected = typeof onRejected === 'function'?onRejected:()=>{}
        if(this.status === Promise.FULFILLED){
            onFullFilled(this.result)
        }
        if(this.status === Promise.REJECTED){
            onRejected(this.result)
        }
    }
}

function aaa(array){
    return array.reduce((total,current)=>{
        return total.concat((Array.isArray(current) ? aaa(current) : current))
    },[])
}

export function debouncea(func,wait = 300,immediate){
    let timer
    return function(){
        var context = this
        clearTimeout(timer)
        if(immediate){
            var callNow = !timer
            timer = setTimeout(()=>{
                timer = null
            },wait)
            if(callNow)   func.apply(context,arguments)
        }else{
            timer = setTimeout(()=>{
                func.apply(context,arguments)
            },wait)
        }

    }
}

export function throttlea(func,wait){
    let prevTime
    return function(){
        let now = new Date()
        const context = this
        if(now - prevTime>=wait){
            func.apply(context,arguments)
            prevTime = now
        }
    }
}

export function call(context,...args){
    if(!context) context = window
    const fn = Symbol()
    context[fn] = this
    const result = context.fn(...args)
    delete context.fn
    return result
}

export function apply(context,args = []){
    if(!context)    context = window
    const fn = Symbol()
    context[fn] = this
    const result = context[fn](...args)
    delete context[fn]
    return result
}

export function bind(context,...args){
    const fn = this
    if(!context)    context = window
    return function (...otherArgs){
        return fn.apply(context,[...args,...otherArgs])
    }
}