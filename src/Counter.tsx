import React, {useCallback, useImperativeHandle, useState} from "react";
//
// function SubCounter({ onClick, data }) {
//     return <button onClick={onClick}>{data}</button>;
// }
// const MemoSubCounter = React.memo(SubCounter);
// let oldData, oldAddClick;
//
//
// function counter(props,ref){
//     const [name, setName] = useState("计数器");
//     const [number, setNumber] = useState(0);
//
//     // 有没有后面的依赖项数组很重要，否则还是会重新渲染
//     const addClick = useCallback(() => {
//         setNumber(number + 1);
//     }, [props.num]);
//     console.log("addClick===oldAddClick ", addClick === oldAddClick);
//     oldAddClick = addClick;
//
//     useImperativeHandle(ref,()=>({
//         addClick:addClick
//     }))
//
//     return (
//       <div>
//           <p>Counter1</p>
//           <input
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//           />
//           <MemoSubCounter data={number} onClick={addClick} />
//           <button onClick={props.onClick}>fatherButton</button>
//       </div>
//   );
// }

// import React from "react"

// export default React.forwardRef(counter)

import {Routes, Route, Link, useParams} from 'react-router-dom'

function Nav() {
    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/article/1">Article</Link>
            <Link to="/contact">Contact</Link>
        </nav>
    )
}

function Home() {
    return (
        <main>
            <h2>Home</h2>
            <Nav />
        </main>
    )
}

function About() {
    return (
        <main>
            <h2>About</h2>
            <Nav />
        </main>
    )
}

function Comment() {
    return <div>This is comment list.</div>
}

function Statistics() {
    return <div>This is statistics.</div>
}

function Article() {
    let params = useParams()
    return (
        <main>
            <h2>Article</h2>
            <Nav />
            <p>id: {params.id}</p>
            <Link to="comment">Comment</Link>
            <Link to="statistics">Statistics</Link>
            <Routes>
                <Route path="comment" element={<Comment />} />
                <Route path="statistics" element={<Statistics />} />
            </Routes>
        </main>
    )
}

function Contact() {
    return (
        <main>
            <h2>Contact</h2>
            <Nav />
            <Link to="address">Address</Link>
            <Link to="phone">Phone</Link>
            {/*<Outlet/>*/}
        </main>
    )
}

function ContactIndex() {
    return <div>ContactIndex</div>
}

function Address() {
    return <div>This is address: xxxxxxxxxxx</div>
}

function Phone() {
    return <div>This is phone: xxxxxxxxxxx</div>
}

function NotFound() {
    return <div>404 Not Found</div>
}

function App(props) {
    return (
        <div className="App">
            <h1>Welcome to React Router!</h1>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />}>
                    <Route index element={<ContactIndex />}></Route>
                    <Route path="address" element={<Address />}></Route>
                    <Route path="*" element={<NotFound />} />
                    <Route path="phone" element={<Phone />}></Route>
                </Route>
                <Route path="/article/:id/*" element={<Article />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    )
}

export default App