import React, {useEffect, useRef, useState} from 'react'
import './slidingWindowsScrollHook.less'
const THRESHOLD = 15;

interface IProps{
    thresHold?: number;
    dataSource: Array<any>;
    height: number;
}

const SlidingWindowScrollHook = (props:IProps) =>  {
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(15);
    const [observer, setObserver] = useState(null);

    const {dataSource, height} = props; // 数据，节点高度
    const updatedList = dataSource.slice(start, end); // 数据切割

    const $bottomElement = useRef();
    const $topElement = useRef();

    // 停止滚动时放弃观察
    const resetObservation = () => {
        observer && observer.unobserve($bottomElement.current);
        observer && observer.unobserve($topElement.current);
    }

    // 渲染时，头尾ref处理
    const getReference = (index, isLastIndex) => {
        if (index === 0)
            return $topElement;
        if (isLastIndex)
            return $bottomElement;
        return null;
    }

    const initObservation = ()=>{
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        const Observer = new IntersectionObserver((entries,observer)=>{
            const length = dataSource.length;
            entries.forEach(entry=>{
                // 向下滚动 刷新数据
                if(entry.isIntersecting && entry.target.id === 'bottom'){
                    const maxStartIndex = length - 1 - 15;
                    const maxEndIndex = length -1 ;
                    const newEnd = (end + 10) <= maxEndIndex ? end + 10 : maxEndIndex; // 下一轮增加尾部
                    const newStart = (end - 5) <= maxStartIndex ? end - 5 : maxStartIndex; // 在上一轮的基础上计算头部
                    if (start !== newStart || end !== newEnd) {
                        setStart(newStart)
                        setEnd(newEnd)
                    }
                }
                // 向上滚动，刷新数据
                if (entry.isIntersecting && entry.target.id === "top") {
                    const newEnd = end === THRESHOLD ? THRESHOLD : (end - 10 > THRESHOLD ? end - 10 : THRESHOLD); // 向上滚动尾部元素索引不得小于15
                    let newStart = start === 0 ? 0 : (start - 10 > 0 ? start - 10 : 0); // 头部元素索引最小值为0
                    if (start !== newStart || end !== newEnd) {
                        setStart(newStart)
                        setEnd(newEnd)
                    }
                }
            })



        }, options)
        // 分别观察开头和结尾的元素
        if ($topElement.current) {
            Observer.observe($topElement.current);
        }
        if ($bottomElement.current) {
            Observer.observe($bottomElement.current);
        }
        // 设初始值
        setObserver(Observer)
    }

    useEffect(() => {
        // 定义观察
        initObservation();
        return () => {
            // 放弃观察
            resetObservation()
        }
    },[end]) //因为[end] 是同步刷新，这里用一个就行了。

    console.log(start,end)
    const lastIndex = updatedList.length - 1;
    return (
        <ul style={{position: 'relative'}}>
            {updatedList.map((item, index) => {
                const top = (height * (index + start)) + 'px'; // 基于相对 & 绝对定位 计算
                const refVal = getReference(index, index === lastIndex); // map循环中赋予头尾ref
                const id = index === 0 ? 'top' : (index === lastIndex ? 'bottom' : ''); // 绑ID
                return (<li className="li-card" key={item.key} style={{top}} ref={refVal} id={id}>{item.value}</li>);
            })}
        </ul>
    );

}
export default SlidingWindowScrollHook

