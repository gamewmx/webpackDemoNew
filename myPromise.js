class Promise{

    static  PENDING = "待定";
    static FULFILLED= "成功";
    static REJECTED = "拒绝";
    constructor(func) {
        this.status = Promise.PENDING
        this.result = null
        this.resolveCallbacks = []  //数组存储 promise中的异步方法，在resolve或者reject后再遍历执行。
        this.rejectCallbacks = []
        try{//直接在func中 throw错误时的捕捉
            func(this.resolve.bind(this),this.reject.bind(this))//new Promise对象时，传入的方法会立刻执行   所以构造函数里执行传入的func
        }catch (e) {
            this.reject(e)
        }

    }

    resolve(result){
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

    reject(result){
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
        return new Promise((resolve,reject)=>{
            //类型判断
            onFullFilled = typeof onFullFilled === 'function'?onFullFilled:()=>{}
            onRejected = typeof onRejected === 'function'?onRejected:()=>{}

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
let promise = new Promise((resolve,reject)=>{
    resolve('123')
})
promise.then((data)=>{
    console.log(data)},(error)=>{
    console.log(error)
})




class Promise1{
    static PENDING = "待定";
    static FULFILLED= "成功";
    static REJECTED = "拒绝";
    constructor(func) {
        this.status = Promise1.PENDING
        this.result = null
        this.resolveCallBacks = []
        this.rejectCallBacks = []
        try{
            func(this.resolve.bind((this),this.reject.bind(this)))
        }catch (e) {
            this.reject(e)
        }
    }
    resolve(result){
        setTimeout(()=>{
            if(this.status === Promise1.PENDING){
                this.status = Promise1.FULFILLED
                this.result = result
                this.resolveCallBacks(callback=>{
                    callback(result)
                })
            }
        })

    }
    reject(result){
        setTimeout(()=>{
            if(this.status === Promise1.PENDING){
                this.status = Promise1.REJECTED
                this.result = result
                this.rejectCallBacks(callback=>{
                    callback(result)
                })
            }
        })
    }
    then(onFulFilled,onRejected){
        return new Promise1((resolve,reject)=>{
            onFulFilled = typeof onFulFilled === 'function' ? onFulFilled : ()=>{}
            onRejected = typeof onRejected === 'function' ? onRejected : ()=>{}
            if(this.status === Promise1.PENDING){
                this.resolveCallBacks.push(onFulFilled)
                this.rejectCallBacks.push(onRejected)
            }
            if(this.status === Promise1.FULFILLED){
                setTimeout(()=>{
                    onFulFilled(this.result)
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
        return new Promise1((resolve,reject)=>{
            if(!Array.isArray(promises)){
                throw new Error('Must be an Array')
            }
            let count = 0
            let result = []
            promises.forEach((promise,index)=>{
                promise.then((res)=>{
                    result[index] = res
                    count ++
                    count === promises.length && resolve()
                },(reason)=>{
                    reject(reason)
                })

            })
        })
    }

    allSettled(promises){
        return new Promise1((resolve,reject)=>{
            if(!Array.isArray(promises)){
                throw new Error('Must be an Array')
            }
            let unSettledCount = promises.length
            let result = []
            const _promises = promises.map(item=>{return item instanceof Promise1 ? item : Promise1.resolve(item)})
            _promises.forEach((promise,index)=>{
                promise.then((value)=>{
                    result[index] = {
                        status : 'fulfilled',
                        value
                    }
                    unSettledCount--
                    if(unSettledCount == 0 ){
                        resolve(result)
                    }
                },(reason => {
                    result[index] = {
                        status : 'rejected',
                        reason
                    }
                    unSettledCount--
                    if(unSettledCount == 0 ){
                        resolve(result)
                    }
                }))
            })
        })
    }
}
class Promise2{
    static
}










