export class myPromise{

    static  PENDING = "待定";
    static FULFILLED= "成功";
    static REJECTED = "拒绝";
    constructor(func) {
        this.status = Promise.PENDING
        this.result = null
        this.resolveCallbacks = []  //数组存储 promise中的异步方法，在resolve或者reject后再遍历执行。
        this.rejectCallbacks = []
        try{//直接在func中 throw错误时的捕捉
            func(this.resolve,this.reject)//new Promise对象时，传入的方法会立刻执行   所以构造函数里执行传入的func
        }catch (e) {
            this.reject(e)
        }

    }

    resolve =  (result)=>{
        //resolve 和 reject在事件循环末尾执行，需要改成异步，用setTimeout套一下
        setTimeout(()=>{
            if(this.status === Promise.PENDING){
                this.status = Promise.FULFILLED
                this.result = result
                this.resolveCallbacks.forEach(callback=>{
                    callback(result)
                })
            }
        })

    }

    reject = (result)=>{
        setTimeout(()=>{
            if(this.status === Promise.PENDING){
                this.status = Promise.REJECTED
                this.result = result
                this.rejectCallbacks.forEach(callback=>{
                    callback(result)
                })
            }
        })
    }

    then(onFullFilled,onRejected){
        //.then的链式调用，返回一个promise对象 就会带着then方法，实现链式调用。
        return new myPromise((resolve,reject)=>{
            //类型判断
            onFullFilled = typeof onFullFilled === 'function'?onFullFilled:()=>{}
            onRejected = typeof onRejected === 'function'?onRejected:()=>{}
            console.log(this)
            if(this.status === Promise.PENDING){
                this.resolveCallbacks.push(onFullFilled)
                this.rejectCallbacks.push(onRejected)
            }

            if(this.status === Promise.FULFILLED){
                setTimeout(()=>{//完成then 的异步性，
                    onFullFilled(this.result)
                })
            }
            if(this.status === Promise.REJECTED){
                setTimeout(()=>{
                    onRejected(this.result)
                })
            }
        })
    }

    all(promises){
        return new Promise((resolve,reject)=>{
            if(!Array.isArray(promises)){
                throw new Error('Promises must be an array!')
            }
            let result = []
            let count = 0
            promises.forEach((promise,index)=>{
                promise.then(res=>{
                    result[index] = res
                    count++
                    count === promises.length && resolve(result)
                },(err)=>{
                    reject(err)
                })
            })
        })
    }

    allSettled(promises){
        return new Promise((resolve,reject)=>{
            if(!Array.isArray(promises)){
                throw new Error('Promises must be an array!')
            }
            let unSettledCount = promises.length
            const _promises = promises.map(item=>{
                return item instanceof Promise ? item : Promise.resolve(item)
            })
            let result = []
            _promises.forEach((promise,index)=>{
                promise.then((value)=>{
                    result[index] = {
                        status:'fulfilled',
                        value
                    }
                    unSettledCount--
                    if(unSettledCount == 0 ){
                        resolve(result)
                    }
                },reason=>{
                    result[index] = {
                        status:'rejected',
                        reason
                    }
                    unSettledCount--
                    if(unSettledCount == 0 ){
                        resolve(result)
                    }
                })
            })
        })
    }
}

export class Promise1{
    static PENDING = '待定';
    static FULFILLED = '成功';
    static REJECTED = '失败'
    constructor(func) {
        this.status = Promise1.PENDING
        this.result = null
        this.resolveCallBacks = []
        this.rejectCallBacks = []
        try{
            func(this.resolve.bind(this),this.reject.bind(this))
        }catch (e) {
            this.reject(e)
        }
    }

    resolve(result){
        setTimeout(()=>{
            if(this.status === Promise1.PENDING){
                this.status = Promise1.FULFILLED
                this.result = result
                this.resolveCallBacks.forEach(item=>{
                    item(result)
                })
            }
        })

    }

    reject(result){
        setTimeout(()=>{
            if(this.status === Promise1.PENDING){
                this.status = Promise1.REJECTED
                this.result = result
                this.rejectCallBacks.forEach(item=> {
                    item(result)
                })
            }
        })
    }

    then(onFulfilled , onRejected) {
        return new Promise1((resolve,reject)=>{
            onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (val) => val
            onRejected = typeof onRejected === 'function' ? onRejected : (reason) => {
                throw reason
            }
            if(this.status === Promise1.PENDING){
                this.resolveCallBacks.push(onFulfilled)
                this.rejectCallBacks.push(onRejected)
            }

            if(this.status === Promise1.FULFILLED){
                setTimeout(()=>{
                    onFulfilled(this.result)
                })
            }
            if(this.status === Promise1.REJECTED){
                setTimeout(()=>{
                    onRejected(this.result)
                })
            }
        })
    }



    all(promises){
        return new Promise((resolve,reject)=>{
            if(!Array.isArray(promises)){
                throw new Error("Promises must be an Array!")
            }
            let result = []
            let count = 0
            promises.forEach((promise,index)=>{
                promise.then(res=>{
                    result[index] = res
                    count ++
                    count === promises.length && resolve(result)
                },reason => {
                    reject(reason)
                })
            })
        })
    }

    allSettled(promises){
        return new Promise1((resolve,reject)=>{
            if(!Array.isArray(promises)){
                throw new Error("Promises must be an Array!")
            }
            const _promises = promises.map(item=>{
                return item instanceof Promise1 ? item : Promise1.resolve(item)
            })
            let unSettled = promises.length
            let result = []
            _promises.forEach((promise,index)=>{
                promise.then((res)=>{
                    result[index] = {
                        status : 'fulfilled',
                        value:res
                    }
                    unSettled --
                    unSettled === 0 && resolve(result)
                },(err)=>{
                    result[index] = {
                        status : 'rejected',
                        value:err
                    }
                    unSettled --
                    unSettled === 0 && resolve(result)
                })
            })
        })
    }

}


// let promise = new Promise((resolve,reject)=>{
//     resolve('123')
// })
// promise.then((data)=>{
//     console.log(data)},(error)=>{
//     console.log(error)
// })

export class MyPromise {
    // 构造方法
    constructor(executor) {

        // 初始化值
        this.initValue()
        // 初始化this指向
        this.initBind()
        // 执行传进来的函数
        try {
            executor(this.resolve, this.reject)
        } catch (e) {
            this.reject(e)
        }
    }


    initBind() {
        // 初始化this
        this.resolve = this.resolve.bind(this)
        this.reject = this.reject.bind(this)
    }

    initValue() {
        // 初始化值
        this.PromiseResult = null // 终值
        this.PromiseState = 'pending' // 状态
    }

    resolve = (value)=> {
        if(this.PromiseResult === ' pending'){
            // 如果执行resolve，状态变为fulfilled
            this.PromiseState = 'fulfilled'
            // 终值为传进来的值
            this.PromiseResult = value
        }

    }

    reject = (reason)=> {
        if(this.PromiseResult === 'pending'){
            // 如果执行reject，状态变为rejected
            this.PromiseState = 'rejected'
            // 终值为传进来的reason
            this.PromiseResult = reason
        }
    }

    // then = (onFulFilled,onRejected)=>{
    //     onRejected = typeof onRejected  === 'function' ? onRejected : (reason)=>{throw (reason)}
    //     onFulFilled = typeof onFulFilled === 'function' ? onFulFilled : val => val
    //
    //     if(this.PromiseState === 'fulfilled'){
    //         onFulFilled(this.PromiseResult)
    //     }
    //     if(this.PromiseState === 'rejected'){
    //         onRejected(this.PromiseResult)
    //     }
    //
    // }

    then=(onFulfilled, onRejected)=> {
        // 接收两个回调 onFulfilled, onRejected

        // 参数校验，确保一定是函数
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : val => val
        onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason }
        console.log(this)
        if (this.PromiseState === 'fulfilled') {
            console.log(onFulfilled)
            // 如果当前为成功状态，执行第一个回调
            onFulfilled(this.PromiseResult)
        } else if (this.PromiseState === 'rejected') {
            // 如果当前为失败状态，执行第二哥回调
            onRejected(this.PromiseResult)
        }

    }
}

// const p = new MyPromise((resolve,reject)=>{
//     setTimeout(()=>{
//         console.log()
//         resolve('1111')
//     },1000)
// })


















