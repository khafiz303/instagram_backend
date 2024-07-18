const Follow = require('./Follow')
const User = require('../auth/User')
const Post =require('../post/Post') 
const Story = require('../story/Story')
const Comment = require('../post/Comment')
const follows  = async (req , res)=>{
    if(req.body.id){
        const follow  = await Follow.create({
            user_id :  req.user.id, 
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
            as: 'userFollower',
            attributes: ['id', 'fullName']
        }]
    })
    res.status(200).send(following)
}

const getFollowers = async (req , res)=>{
    console.log(req.params.username);
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
            as: 'userFollowing' ,
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
                as : 'userFollowing',
                include : [
                    {
                        model : User , 
                        as : 'userFollower'
                    }
                ]
            
            },
            {
                model : Follow,
                as : 'userFollower',
                include : [
                    {
                        model : User , 
                         as : 'userFollowing'
                    }
                ]
            },
            {
                model: Post,
                as: 'posts',
                include: [
                    {
                        model: Comment,
                        as: 'comments',
                        include :[
                            {
                                model : User,
                                as : 'userC'
                            }
                        ]
                    }
                ]
            },
            {
                model : Story,
                as : 'story',
                include :[
                    {
                        model : User,
                        as : 'user'
                    }
                ]
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