const express = require("express");

const Posts = require("../schemas/post.js");

const router = express.Router();


// 게시글 작성 POST
router.post("/posts", async (req, res) => {

     const { user,title,content,password } = req.body;  //바디형식으로 요청이 넘어왔다

     let createdAt = new Date();
     await Posts.create({ user,title,content,password,createdAt });  //Posts에다 넣어주기

    res.json({ "message": "게시글을 생성하였습니다." });
});

// 게시글 조회 GET ( ex) localhost:3000/api/posts )
router.get("/posts", async (req, res) => {
      
    const posts = await Posts.find({}).sort({createdAt:-1})
    const post = posts.map((x) => {
        title = x.title,
        postId = x._id,
        user = x.user,
        createdAt = x.createdAt

    return {'title' : title, 'postId' :postId, 'user' : user, 'createdAt' : createdAt}
})

    res.json({ postlist : post });
});


// 게시글 상세 조회 GET ( ex) localhost:3000/api/posts/postid값 )
router.get("/posts/:postId", async (req, res) => {

    const {postId} = req.params;   //params는 매개변수 

    const posts = await Posts.findOne({_id : postId})
    const {user,title,content,createdAt} = posts
    const post = {
        postId,
        user,
        title,
        content,
        createdAt
    }
    res.json({ detail : post });
});

// 게시글 수정 PUT ( ex) localhost:3000/api/posts/postid값 )
router.put("/posts/:postId", async (req, res) => {

    const {postId} = req.params;
    const { title,content,password } = req.body;

    const userpass = await Posts.findOne({_id : postId})
    if(password === userpass.password){
        await Posts.updateOne({_id : postId},{$set: {title, content}})
        res.send({ result : "댓글수정 완료"})
    } else {
        res.send({ result : "비밀번호가 다릅니다"})
    }

});

// 게시글 삭제 DELETE ( ex) localhost:3000/api/posts/postid값 )
router.delete("/posts/:postId", async (req, res) => {

    const {postId} = req.params;
    const {password } = req.body;

    const userpass = await Posts.findOne({_id : postId})
    if(password === userpass.password){
        await Posts.deleteOne({_id : postId})
        res.send({ result : "삭제 완료"})
    } else {
        res.send({ result : "비밀번호가 다릅니다"})
    }
});

module.exports = router;