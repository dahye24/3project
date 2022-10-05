const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
   
    user: {
        type: String,
        required: true,  //필수로 적어야 하는건지     
      },
      password: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        required: false,
      }
     

})

module.exports = mongoose.model("Post", postSchema);

// {  
//     "user": "Developer",  
//     "password": "1234",  
//     "title": "안녕하세요", 
//     "content": "안녕하세요 content 입니다."
//     }