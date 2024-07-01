const Post = require('./Post')
const Story = require('../story/Story')
const isAuthor = async (req , res , next) =>{
    let id = req.body.id || req.params.id
    const post = await Post.findByPk(id)

    if(!post) res.status(400).send({message : 'post with that is not exist'})
    else if (post.userId === req.user.id) next()
    else  res.status(403).send({message : 'Access Forbiden'})
}


module.exports= {
    isAuthor
}