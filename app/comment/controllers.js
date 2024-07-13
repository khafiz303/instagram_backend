const Comment = require('../post/Comment');

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

        res.status(200).end(); // Отправка созданного комментария в ответе
    } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).json({ message: 'Failed to add comment', error: error.message });
    }
};

module.exports = {
    commentAdd
};
