import React, { useState, useEffect ,useRef} from 'react';
import { io } from 'socket.io-client';
import './App.css';
const socket = io('https://new-chat-1-0c5o.onrender.com',{ transports: ["websocket", "polling"] });
function Sh() {
    const [mess, setMess] = useState([]);
    const [input, setInput] = useState("");
    const[sorted,setSorted]=useState([]);
    const[r_mess,setR_mess]=useState([]);  
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
    function on(e){
        const nn={text:input,time:new Date().toLocaleTimeString()}
        setMess((prev)=>[...prev,nn]);
        setInput("");
        // socket.emit("me",(nn));
    }
    function oon(e){
        setInput(e.target.value);
    }
    let curr=useRef(null);
    const [disp,setDisp]=useState(false);
    useEffect(() => {
        socket.on("msgg", (msg) => {
            setR_mess((prev) => [...prev, { text: msg, time: new Date().toLocaleTimeString() }]);
        });
    
        return () => socket.off("rec_msg");
    }, []); 
    // useEffect(() => {
    //     socket.on("mm", (msg) => {
    //         setMess((prev) => [...prev, msg]);   
    //     });

    //     // Cleanup to prevent multiple bindings
    //     return () => socket.off("mm");
    // }, []);
    // const msgg = [
    //     {
    //         m: "Hello This is Sathwik,Hope You Remembered Me"
    //     },
    //     {
    //         m: "Hello This is Vignesh,Hope You Remembered Me"
    //     },
    //     {
    //         m: "Hello This is Lokesh,Hope You Remembered Me"
    //     }
    // ]
    const [sel,setSel]=useState(false);
    const [ic,setIc]=useState("")
    const [t,setT]=useState("");
    function handlemd(){
        setT(new Date());
    }
    function handlec(i){
        setIc(i);
        setSel(true);
    }
    function handlemup(){
        let time=t-Date.now();
        if(t>=-3000){
            setDisp(true);
        }
    }
    useEffect(()=>{
        const a=[...mess,...r_mess];
        a.sort((a,b)=>new Date(a.time)-new Date(b.time));
        setSorted(a);
    },[mess,r_mess]);
    useEffect(()=>{
        if('Notification' in window){
            Notification.requestPermission().then(permission=>{
                console.log('Notification',permission);
            })
        }
        if(Notification.permission=='granted'){
            new Notification('title',r_mess[r_mess.length-1]);
        }
    },[r_mess]);
    return(
        <>
            <div className="dd">
                <header className="hh"><h1 className="hd">Let's Chat</h1></header>
                <br/>
                {sorted.map((i,index)=>(
                    <div className={mess.includes(i)?"hh2":"hhhh"}><div className={mess.includes(i)?"hh3":"hhhh1"}>{i.text}<footer className="fff"><small><sub>{i.time}</sub></small></footer></div></div>))}
                <div className="iii">
                    <input className="iiiii" type="text" name="input" value={input} onChange={oon}/>
                    <button className="bb" type="submit" onClick={on}>🚀</button>
                </div>
            </div>
        </> 
    )
}
export default Sh;
