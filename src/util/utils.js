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
    let timer
    return function (...args) {
        if(timer)   clearTimeout(timer)
        timer = setTimeout(()=>{
            func.apply(this,args)
        },wait)
    }
}

function a1232(fn,wait = 1000){
    let timer
    return function(){
        let context = this
        let args = arguments
        if(timer) clearTimeout(timer)
        timer = setTimeout(()=>{
            fn.apply(context,args)
        },wait)
    }
}


export function throttle(func,wait=1000){
    let timer = null
    return function(){
        if(timer) return
        timer = setTimeout(()=>{
            func()
            timer = null
        },wait)
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

function clone(obj){
    if(typeof obj !== 'object' || obj === null ){
        return obj
    }
    let copy = {}
    if(Array.isArray(obj)){
        copy = []
    }
    for(let key in obj ){
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

// export function myBind(context , ...outerargs){
//     let self = this
//
//     return function F(...innerArgs){
//         if(self instanceof F){
//             return new self(...outerargs,...innerArgs)
//         }
//         return self.apply(context,[...outerargs,...innerArgs])
//     }
// }

function flatten(arr){
    return arr.reduce((total,current)=>{
        return total.concat((Array.isArray(current)?flatten(current):current))
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
    for(let i= 0 ;i< arr.length - 1 ;i++){
        for(let j = 0;j< arr.length - i -1;j++){
            if(arr[j] > arr[j+1]){
                let temp = arr[j+1]
                arr[j+1] = arr[j]
                arr[j] = temp
            }
        }
    }
    return arr
}

function bubbleSort1(array){
    if(!Array.isArray(array))   return
    for(let i = 0 ; i<array.length - 1 ; i ++ ){
        for(let j = 0 ; j <array.length - i - 1 ; j++){
            if(array[j] < array[j+1]){
                let temp = array[j]
                array[j] = array[j+1]
                array[j+1] = temp
            }
        }
    }
    return array
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

function quickSort1 (list){
    if(list.length <=1 )return list
    let midIndex = Math.floor(list.length/2)
    let midValue = list[midIndex]
    let left = []
    let right = []
    for(let i = 0 ; i < list.length ; i++ ){
        if( i === midIndex) continue
        if(list[i]>left[i]){
            right.push(list[i])
        }else{
            left.push(list[i])
        }
    }
    return [quickSort(left),midValue,quickSort(right)]
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

function flat(list){
    return list.reduce((total,current)=>{
        return total.concat((Array.isArray(current)? flat(current) : current))
    },[])
}

function flattenDepp(array){
    return array.reduce((total,current)=>{
        return total.concat((Array.isArray(current) ? flattenDepp(current) : current))
    })
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


function t123(func,wait = 1000){
    let prevTime
    return function(){
        let nowTime = new Date()
        const context = this
        if(nowTime - prevTime > wait){
            func.apply(context,arguments)
            prevTime = nowTime
        }
    }
}

// export function myCall(context,...args){
//     if(!context) context = window
//     const fn = Symbol()
//     context[fn] = this
//     const result = context.fn(...args)
//     delete context[fn]
//     return result
// }

// function call (context,...args){
//     if(!context) context = window
//     const fn = Symbol()
//     context[fn] = this
//     const result = context[fn](...args)
//     delete context[fn]
//     return result
// }


export function myApply(context,args = []){
    if(!context) context = window
    const fn = Symbol()
    context[fn] = this
    const result = context.fn(args)
    delete context[fn]
    return result
}

function call1232(context = window , ...args){
    let fn = Symbol()
    context[fn] = this
    const result = context[fn](...args)
    delete context[fn]
    return result
}

function apply(context,args = []){
    if(!context) context = window
    const fn = Symbol()
    context[fn] = this
    const result = context[fn](args)
    delete context[fn]
    return result
}

export function myBind(){
    const self = this
    const args = Array.prototype.slice.call(arguments)
    const thisValue = args.shift()
    return function(){
        return self.apply(thisValue,args)
    }
}

function bind(){
    const self = this
    const args = [...arguments]
    return function(){
        self.apply(arguments[0],args.slice(1))
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

// export function apply(context,args = []){
//     if(!context)    context = window
//     const fn = Symbol()
//     context[fn] = this
//     const result = context[fn](args)
//     delete context[fn]
//     return result
// }

// export function bind(context,...args){
//     const fn = this
//     if(!context)    context = window
//     return function (...otherArgs){
//         return fn.apply(context,[...args,...otherArgs])
//     }
// }

function myNew(obj,...rest){
    //基于obj的原型创建一个新的对象
    const newObj = Object.create(obj.prototype)
    //添加属性到新创建的obj上，并获取obj函数执行的结果
    const result =  obj.apply(newObj,rest)
    //如果执行结果有返回值并且是一个对象，返回执行的结果，否则返回新创建的对象
    return typeof result === 'object'?result:newObj
}

function new123(obj,...args){
    const newObj = Object.create(obj.prototype)
    const result = obj.apply(newObj , args)
    return  typeof result === 'object' ? result : newObj
}

class Person{
    constructor(name) {
        this.name = name
    }
}
const myPerson = myNew(Person,'wmx')
// console.log(myPerson)


Array.prototype.myReduce = function(fn, initialValue) {
    let pre, index;
    let arr = this.slice();
    console.log(arr)
    if (initialValue === undefined) {
        // 没有设置初始值
        for (let i = 0; i < arr.length; i++) {
            // 找到数组中第一个存在的元素，跳过稀疏数组中的空值
            if (!arr.hasOwnProperty(i)) continue;
            console.log(arr.hasOwnProperty(i))
            pre = arr[i]; // pre 为数组中第一个存在的元素
            index = i + 1; // index 下一个元素
            break; // 易错点：找到后跳出循环
        }
    } else {
        index = 0;
        pre = initialValue;
    }
    for (let i = index; i < arr.length; i++) {
        // 跳过稀疏数组中的空值
        if (!arr.hasOwnProperty(i)) continue;
        console.log(arr.hasOwnProperty(i))
        // 注意：fn函数接收四个参数，pre之前累计值、cur 当前值、 当前下标、 arr 原数组
        pre = fn(pre, arr[i], i, this);
    }
    return pre;
};

function myReduce(arr,fn,initialValue){
    let pre , index
    let tempArr = [...arr]
    if(!initialValue){
        for(let i = 0 ; i < tempArr.length ; i ++ ){
            if(!tempArr.hasOwnProperty(i)) continue
            pre = arr[i]
            index = i + 1
            break;
        }
    }else{
        pre = initialValue
        index = 0
    }
    for(let i = index ; i < tempArr.length ; i ++ ){
        if(!tempArr.hasOwnProperty(i)) continue
        pre = fn(pre,tempArr[i],i , this)
    }
    return pre
}

Array.prototype.myMap = function (fn,content){
    let arr = this.slice()
    let result = []
    for(let i = 0 ; i < arr.length ; i++){
        result[i] = fn(arr[i])
    }
    return result
}

function myInstanceOf (example , classFunc){
    let proto = Object.getPrototypeOf(example)
    while(true){
        if( proto === null ) return false
        if( proto === classFunc.prototype) return true
        proto = Object.getPrototypeOf(proto)
    }
}

// 组合式继承

function Parent(name){
    this.name = name
}

class Child {
    constructor() {
        Parent.call(this)
        Child.prototype = Object.create(Parent.prototype)
        Child.prototype.constructor = Child
    }
}

console.log(Child)