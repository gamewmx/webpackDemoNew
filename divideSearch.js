
//假设升序
const search = (array,n)=>{
    let left = 0,right = array.length - 1
    while (left <= right){
        // let middle = left + Math.floor((right - left)/2)
        let middle = Math.floor((right+left)/2)
        if(array[middle] > n){
            right = middle - 1
        }else if (array[middle] < n ){
            left = middle + 1
        }else{
            return middle
        }
    }
    return -1
}

const deleteItem = (array,val)=>{
    //暴力双循环法
    let n = array.length
    // for(let i = 0 ;i < n ; i++ ){
    //     if(array[i] === val ){
    //         for(let j = i+1 ; j < n ;j++ ){
    //             array[j-1] = array[j]
    //         }
    //     }
    // }
    // return array
    //双指针法
    //利用原数组空间
    let left = 0
    for(let right = 0 ;right < n ; right ++ ){
        if(array[right] !== val ){
            array[left] = array[right]
            left++
        }
    }
    return left
}

//长度最小的子数组
const minSubArray=(nums , val)=>{
    const n = nums.length
    // let sum = 0
    // let result
    // let sublength = 0
    // //暴力算法 遍历循环
    // for(let i = 0 ; i < n ; i ++){
    //     sum = 0
    //     for(let j = i ; j < n ; j++ ){
    //         sum += nums[j]
    //         if( sum >= val ){
    //             sublength = j - i + 1
    //             result = sublength > result ? result : sublength
    //             break;
    //         }
    //     }
    // }
    // return  result ? result : 0
    //滑动窗口
    let left = 0 ,right = 1, result,sum = 0
    for(right = 0 ; right< n ; right ++ ){//right 从0 开始 因为sum刚开始没算第0个
        sum += nums[right]
        while(sum >= val ){
            result = result < (right-left+1) ? result : right-left+1
            sum -= nums[left]
            left++
        }
    }
    return result

}

var permute = function(nums) {
//    let res = []
//    let temp = []
//    nums.forEach((item,index,array1)=>{
//        if(temp.includes(item)) return;
//        temp.push(item)
//        let array2 = array1.filter(o=>{return o !== item})
//         array2.forEach((it,ind,array2)=>{

//         })
//    })
    let res = []
    let used = [false,false,false]
    let path = []
    const dfs = (nums,used)=>{
        if(path.length == nums.length){
            console.log(path,Array.from(path))
            res.push(path)
            return
        }
        for( let i = 0 ; i < nums.length ; i++ ){
            if(used[i] == true ) continue;
            path.push(nums[i])
            used[i] = true;
            dfs(nums,used)
            path.pop(nums[i])
            used[i] = false
        }
    }
    dfs(nums,used)
    return res
};


function ListNode(val,next){
    this.val = val;
    this.next = next;

}
//反转链表
const reverseList = (head)=>{
    //迭代法
    // let pre = null
    // let cur = head
    // while( cur !== null ){
    //     let p = cur.next//用来存一下原链表 cur的next ，用来前进递推
    //     cur.next = pre
    //     pre = cur
    //     cur = p
    // }
    // return cur

    //递推法
    if(!head || !head.next) return head

    let cur = reverseList(head.next)

    head.next.next = head
    head.next = null
    return cur
}

const swapPairs = (head)=>{
    let node = null
    node.next = head
    let pre = node
    while(head !== null && head.next !== null){
        const next = head.next
        head.next = next.next
        next.next = head
        pre.next = next

        pre = head
        head = head.next
    }
    return node.next
}

var intersection = function(nums1, nums2) {
    let array = []
    for(let i = 0 ;i < nums1.length ; i ++ ){
        if(nums2.find(o=>{return o === nums1[i]}) || nums1[i] == 0){
            console.log(nums1[i])
            array.push(nums1[i])
        }
    }
    return Array.from(new Set(array))
};

var replaceSpace = function(s) {
    const removeExtraSpace = (s)=>{
        let slow = 0 ;
        let fast = 0 ;
        for(fast = 0 ;fast < s.length - 1 ; fast ++ ){
            if(s[fast] !== " "){
                s[slow ++ ] = s[fast]
            }
        }
        return s
    }
    const reverse = (s,start,end)=>{
        let left = start ,right = end
        console.log(s,'===')
        while(left < right){
            let temp = s[left]
            s[left] = s[right]
            s[right] = temp
            left ++
            right --
        }
        return s
    }
    s = Array.from(s)
    s = removeExtraSpace(s)
    s = reverse(s)
    console.log(s)
    let start = 0
    for(let i = 0 ; i <= s.length ; i ++ ){
        if(s[i] == " " || i == s.length ){
            reverse(s,start,i-1)
            start = i + 1
        }
    }
    return s
};

var maxSlidingWindow = function(nums, k) {
    const sum = (array)=>{return array.reduce((total,current)=>{return total+=current},0)}
    const max = (array)=>{
        let temp
        for(let i = 0 ; i < array.length ; i++){
            if( temp <= array[i]){
                temp = array[i]
            }
        }
        console.log(temp)
        return temp
    }
    let total = []
    let n = nums.length - k
    for(let i = 0 ; i <= n  ; i ++ ){
        let arr = []
        for(let j = i  ; j <  i + k  ; j ++ ){
            arr.push(nums[j])
        }
        total.push(sum(arr))
    }
    total.sort((a,b)=>{return b-a})
    return total[0]
};

let s= [1,3,-1,-3,5,3,6,7]

let t = maxSlidingWindow(s,3)
// console.log(t)

function m(){
    var i = 2
    return function(){
        console.log(i++)
    }
}


function myNew(obj,...rest){
    //基于obj的原型创建一个新的对象
    const newObj = Object.create(obj.prototype)
    //添加属性到新创建的obj上，并获取obj函数执行的结果
    const result =  obj.apply(newObj,rest)
    //如果执行结果有返回值并且是一个对象，返回执行的结果，否则返回新创建的对象
    return typeof result === 'object'?result:newObj
}
function Person(firtName, lastName) {
    this.firtName = firtName;
    this.lastName = lastName;

    return 'demo';
}
const myPerson = myNew(Person,'wmx','111')
console.log(myPerson)

