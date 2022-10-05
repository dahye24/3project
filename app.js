const express = require("express");
const connect = require("./schemas/index") //index만 하는 이유는 index에만 몽구스 연결하는 경로가 있다.
const app = express();
const port = 3000;
const commentsRouter = require('./routes/comments.js')
const postsRouter = require('./routes/posts.js')

connect();

app.use(express.json());  //리퀘스트의 바디 안에 있는 데이터를 정상적으로 보고 싶을때 쓴다.

app.use("/api",[postsRouter, commentsRouter]); 
// app.use("/api", goodsRouter); 두개 이상일때는 []배열처럼 쓸수있다.

// app.use("/api",[postsRouter]); 


app.get("/", (req,res) => {
   

    res.send("겟입니다");
});


app.listen(port, () => {
    console.log(port, '포트로 서버가 열렸어요!');
});