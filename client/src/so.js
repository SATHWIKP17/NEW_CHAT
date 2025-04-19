import React from 'react';
import {useState,useEffect} from 'react';
import {io} from 'socket.io-client';
import {useLocation} from 'react-router-dom';
const socket=io("https://new-chat-2.onrender.com");
function Soc(){
    const locate=useLocation();
    const rom=locate.state;
    const [msg,setMsg]=useState([]);
    const [text,setText]=useState("");
    const [sorted,setSorted]=useState([]);
    const[rmsg,setRmsg]=useState([]);
    const [tmsg,setTmsg]=useState([]);
    function oon(e){
        setText(e.target.value);
    }
    useEffect(()=>{
        socket.emit("romsg",rom);
        socket.on("msgg",(data)=>{
            setRmsg((prev)=>[...prev,data])});
        return ()=>{
            socket.off("msgg");
            socket.off("romsg");
        }
    },[]);
      const showNotification = (title, body) => {
  if (Notification.permission === 'granted') {
    new Notification(title, { body });
  }
};

useEffect(() => {
  if ('Notification' in window) {
    Notification.requestPermission().then(permission => {
      console.log("Notification permission:", permission);
    });
  }
}, []);
    function on(e){
        e.preventDefault();
        const tt={tex:text,time:new Date()};
        socket.emit("msg",tt);
        setMsg((prev)=>[...prev,tt]);
        setTmsg((prev)=>[...prev,tt]);
        showNotification('title',rmsg[rmsg.length-1]);
    }
    useEffect(()=>{
        const a=[...tmsg,...rmsg];
        a.sort((a,b)=>new Date(a.time)-new Date(b.time));
        setSorted(a);
    },[tmsg,rmsg]);
  
    return(
        <>
         <div className="dd">
                <header className="hh"><h1 className="hd">Let's Chat</h1></header>
                <br/>
                {sorted.map((i,index)=>(
                    <div className={tmsg.includes(i)?"hh2":"hhhh"}><div className={tmsg.includes(i)?"hh3":"hhhh1"}>{i.tex}<footer className="fff"><small><sub>{new Date(i.time).toLocaleTimeString()}</sub></small></footer></div></div>))}
                <div className="iii">
                    <input className="iiiii" type="text" name="input" onChange={oon}/>
                    <button className="bb" type="submit" onClick={on}>🚀</button>
                </div>
            </div>
        </>
    )
}
export default Soc;
