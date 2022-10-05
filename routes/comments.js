const express = require("express");

const comments = require("../schemas/comment.js");

const router = express.Router();

// 댓글 작성  postId는 작성한 글에 댓글을 달아야 하니 작성한글을 판별하는 아이디(post에서 생성된것) / commentId는 댓글 생성하면 알아서 생기는 아이디
router.post("/comments/:postId", async (req, res) => { 

    const {postId} = req.params                 //postId
    const { user,comment,password } = req.body;  //바디형식으로 요청이 넘어왔다
    if(comment === ''){
        res.json({"message": "댓글을 작성해주세요"})
    }else {
        await comments.create({ postId,user,comment,password});  //comments에다 넣어주기
        res.json({ "message": "댓글을 생성하였습니다." });   
    }
});


router.get("/comments/:postId", async (req,res) => {
    // 댓글목록 조회
    
    const {postId} = req.params
    const Comments = await comments.find({postId}).sort({createdAt:-1})
    const commt = Comments.map((x) => {
        commentId = x._id,
        user = x.user,
        comment = x.comment,
        createdAt = x.createdAt
        

    return {'commentId' :commentId, 'user' : user, 'comment' : comment, 'createdAt' : createdAt}


    })
    res.json({ commentlist: commt});
})



router.put("/comments/:commentId", async (req,res) => {
    // 댓글수정

  
  const {commentId} = req.params;
  const { comment,password } = req.body;

  const userpass = await comments.findOne({_id : commentId})
  console.log(userpass.password)
  if(!userpass.length){
    return res.status(400).json({ result : "댓글을 적어주세요"})
  }
  if(password !== userpass.password){
    return res.status(400).json({ result : "비밀번호가 다릅니다"})
    }
    
    await comments.updateOne({_id : commentId},{$set: {comment}})
    res.json({ result : "댓글수정 완료"})                              
  

})

router.delete("/comments/:commentId", async (req,res) => {
    // 댓글삭제

  
    const {commentId} = req.params;
    const {password } = req.body;

    const userpass = await comments.findOne({_id : commentId})
    if(password === userpass.password){
        await comments.deleteOne({_id : commentId})
        res.send({ result : "삭제 완료"})
    } else {
        return res.status(400).json({ result : "비밀번호가 다릅니다"})
    }

})



module.exports = router;