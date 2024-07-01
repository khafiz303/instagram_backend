const Story = require('./Story')

const isAuthorStory  = async(req , res , next)=>{
    let id = req.body.id || req.params.id

    const story = await Story.findByPk(id)
    if (story.userId === res.user.id ) next()
    else res.status(401).send({message :'Нет доступа'})

}