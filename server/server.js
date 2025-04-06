const express=require('express');
const app=express();
const path=require('path');
const http=require('http');
const {Server}=require('socket.io');
const cors=require('cors');
const server=http.createServer(app);
const io=new Server(server,{cors:{
    origin:['*'],
    methods:['POST','GET']
}});
app.use(cors({
    origin:['*'],
    methods:['POST','GET']
}))
app.use(express.json());
app.use(express.static(path.join(__dirname,"../client/build")));
app.use(express.urlencoded({extended:true}));
io.on("connection",(socket)=>{
    console.log("Connected");
    socket.on("romsg",(room)=>{
        console.log(room);
        socket.on("msg",(data)=>{
            console.log(data);
            socket.to(room).emit("msgg",data);
        })
    });

})
app.post("/",(req,res)=>{
    
});
// app.get("*",(req,res)=>{
//     res.sendFile(__dirname,"../client/build","index.html");
// })
server.listen(3009,"localhost",()=>{
    console.log("Success");
});