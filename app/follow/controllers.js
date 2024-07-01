const Follow = require('./Follow')
const User = require('../auth/User')
const Post =require('../post/Post') 
const Story = require('../story/Story')
const Comment = require('../post/Comment')
const follows  = async (req , res)=>{
    if(req.body.id){
        const follow  = await Follow.create({
            user_id :  11, 
            follower_id : req.body.id

    })
    res.status(200).end()
    }
 
}

const unsubscribe = async (req , res)=>{
    await Follow.destroy({
        where:{
            user_id : 6,
            follower_id : req.body.id
        }
    })
    res.status(200).end()
}
const getFollowing = async (req , res)=>{
    const user = await User.findOne({
        where:{
            fullName : req.params.username
        }
    })
    const following = await Follow.findAll({
        where: {
            user_id: user.id
        },
        include: [{
            model: User,
            as: 'following',
            attributes: ['id', 'fullName']
        }]
    })
    res.status(200).send(following)
}

const getFollowers = async (req , res)=>{
    const user = await User.findOne({
        where:{
            fullName : req.params.username
        }
    })
    const follower = await Follow.findAll({
        where: {
            follower_id: user.id
        },
        include: [{
            model: User,
            as: 'follower',
            attributes: ['id', 'fullName']
        }]
    })
    res.status(200).send(follower)

}

const detail = async (req , res)=>{
    const user = await User.findOne({
        where:{
            fullName : req.params.username
        },
        include:[
            {
                model: Follow,
                as : 'following'
            },
            {
                model : Follow,
                as : 'follower'
            },
            {
                model: Post,
                as: 'posts',
                include: [
                    {
                        model: Comment,
                        as: 'comments'
                    }
                ]
            },
            {
                model : Story,
                as : 'story'
            }
        ]
    })
    res.status(200).send(user)

}




module.exports = {
    follows,
    unsubscribe,
    getFollowing,
    getFollowers,
    detail
}