import React from "react";
import { useState } from "react";
// import { useEffect } from "react";
import { io } from "socket.io-client";
import './App.css';
import {useNavigate} from 'react-router-dom';
const socket = io("http://localhost:3009/");
function Input() {
    const [room, setRoom] = useState("");
    const nav=useNavigate();
    // const [name,setName]=useState("");
    function change(e){
        setRoom(e.target.value);
    }
    async function sub(e){
        e.preventDefault();
        setRoom((prev)=>[...prev,room]);
        nav("/sock",{state:room});
    }
    return (
        <>
            <div className="odiv">
                <div className="idiv">
                    <form className="f1" onSubmit={sub}method="POST">
                        <input type="text" className="i1" name="name" onChange={change}/>
                        <br/>
                        <br/>
                        <div className="ii">
                        <input type="submit" className="bb" value="JOIN"/></div>
                    </form>
                </div>
            </div>
        </>
    )
}
export default Input;