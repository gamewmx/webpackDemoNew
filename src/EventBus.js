export default class EventBus{
    constructor() {
        this.task = {}
    }

    on(type,fn){
        if(!this.task[type]){
            this.task[type] = []
        }
        this.task[type].push(fn)
    }

    emit(type,...args){
        if(this.task[type]){
            this.task[type].forEach(t=>{
                t.apply(this,...args)
            })
        }
    }

    off(type,fn){
        if (this.task[type]) {
            this.task[type] = this.task[type].filter(item => item !== fn);
        }
    }

    once(type, fn) {
        // 只执行一次
        function f(...args) {
            fn(...args);
            this.off(type, f);
        }
        this.on(type, f);
    }
}