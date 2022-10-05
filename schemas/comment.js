const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
   
      postId: {
        type: String
      },
      user: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      }
      
    },
    {
      timestamps:true
    }
    );
    
    

module.exports = mongoose.model("Comment", commentSchema);