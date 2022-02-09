import React, {useCallback, useState} from "react";

function SubCounter({ onClick, data }) {
    return <button onClick={onClick}>{data}</button>;
}
const MemoSubCounter = React.memo(SubCounter);
let oldData, oldAddClick;


export default function counter(props){
    const [name, setName] = useState("计数器");
    const [number, setNumber] = useState(0);

    // 有没有后面的依赖项数组很重要，否则还是会重新渲染
    const addClick = useCallback(() => {
        setNumber(number + 1);
    }, [props.num]);
    console.log("addClick===oldAddClick ", addClick === oldAddClick);
    oldAddClick = addClick;
    return (
      <div>
          <p>Counter1</p>
          <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
          />
          <MemoSubCounter data={number} onClick={addClick} />
          <button onClick={props.onClick}>fatherButton</button>
      </div>
  );
}
