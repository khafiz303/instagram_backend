const Story = require('./Story')
const createStory =async (req , res)=>{
    if(req.file && req.file.filename){
        const story = await Story.create({
            userId : req.user.id,
            imageUrl : '/img/'+req.file.filename,
            description : req.body.description
        })
       res.status(200).end()

    }
}

const deleteStory = async(req , res)=>{
    Story.destroy({where:{id : req.params.id}})
    res.status(200).end()

}

const getStory = async (req , res)=>{
    const stories = await Story.findAll()
    const nowDate = new Date().getTime() -  (24 * 60 * 60 * 1000);
    const filteredStories = stories.filter(story =>new Date(story.createdAt).getTime() > nowDate) 
    res.status(200).send(filteredStories)
  
}


module.exports={
    createStory,
    deleteStory,
    getStory
}