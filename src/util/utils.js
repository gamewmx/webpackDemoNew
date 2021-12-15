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
function bubbleSor1t(list) {
    var n = list.length;
    if (!n) return [];

    for (var i = 0; i < n; i++) {
        // 注意这里需要 n - i - 1
        for (var j = 0; j < n - i - 1; j++) {
            if (list[j] > list[j + 1]) {
                var temp = list[j + 1];
                list[j + 1] = list[j];
                list[j] = temp;
            }
        }
    }
    return list;
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