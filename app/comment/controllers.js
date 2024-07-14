const Comment = require('../post/Comment');
const User = require('../auth/User')

const commentAdd = async (req, res) => {
    console.log('Received request to add comment');
    try {
        console.log('User ID:', req.user.id);
        console.log('Post ID:', req.body.postId);
        console.log('Comment text:', req.body.text);

        const comment = await Comment.create({
            userId: req.user.id,
            postId: req.body.postId,
            text: req.body.text
        });

        res.status(200).send(comment); 
    } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).json({ message: 'Failed to add comment', error: error.message });
    }
};

const commentDelete = async (req, res) => {
    try {
      const user = await User.findByPk(req.user.id);
      if (!user) {
        return res.status(404).send({ message: 'User not found' });
      }
  
      const comment = await Comment.findByPk(req.params.id);
      if (!comment) {
        return res.status(404).send({ message: 'Comment not found' });
      }
  
      if (user.id === comment.userId) {
        await comment.destroy();
        return res.status(200).send({ message: 'Comment deleted successfully' });
      } else {
        return res.status(403).send({ message: 'You do not have permission to delete this comment' });
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
      return res.status(500).send({ message: 'Internal server error', error: error.message });
    }
  };
  
  module.exports = {
    commentAdd,
    commentDelete
  };
 
