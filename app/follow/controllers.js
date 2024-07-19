const Follow = require('./Follow')
const User = require('../auth/User')
const Post =require('../post/Post') 
const Story = require('../story/Story')
const Comment = require('../post/Comment')

const follows = async (req, res) => {
    try {
        const followFind = await Follow.findOne({
            where: {
                user_id: req.user.id,
                follower_id: req.body.id
            }
        });

        if (followFind) {
            return res.status(404).send('Уже существует');
        }

        if (req.body.id) {
            const follow = await Follow.create({
                user_id: req.user.id,
                follower_id: req.body.id
            });
            return res.status(200).send('Подписка создана');
        } else {
            return res.status(400).send('Отсутствует follower_id');
        }
    } catch (error) {
        console.error('Ошибка при создании подписки:', error);
        return res.status(500).send('Внутренняя ошибка сервера');
    }
};


const unsubscribe = async (req, res) => {
    try {
        const follows = await Follow.findAll({
            where: {
                user_id: req.user.id,
                follower_id: req.params.id
            }
        });

        if (follows.length > 0) {
            for (const follow of follows) {
                await follow.destroy();
            }
            res.status(200).end();
        } else {
            res.status(404).json({ message: 'Subscription not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
const getFollowing = async (req, res) => {
    try {
      
        const user = await User.findOne({
            where: {
                fullName: req.params.username
            }
        });
        console.log('username',req.params.username , user);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const following = await Follow.findAll({
            where: {
                user_id: user.id
            },
            include: [{
                model: User,
                as: 'userFollower',
                attributes: ['id', 'fullName']
            }]
        });

        if (following.length === 0) {
            return res.status(404).json({ message: 'No followers found' });
        }

        res.status(200).json(following);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


const getFollowers = async (req, res) => {
    try {
        console.log('Username received from params:', req.params.username);

        const user = await User.findOne({
            where: {
                fullName: req.params.username
            }
        });

        if (!user) {
            console.log('User not found');
            return res.status(404).send({ error: 'User not found' });
        }

        console.log('Found user:', user);

        const followers = await Follow.findAll({
            where: {
                follower_id: user.id
            },
            include: [{
                model: User,
                as: 'userFollowing',
                attributes: ['id', 'fullName']
            }]
        });

        if (!followers.length) {
            console.log('No followers found for this user');
            return res.status(200).send({ message: 'No followers found' });
        }

        console.log('Followers found:', followers);

        res.status(200).send(followers);
    } catch (error) {
        console.error('Error in getFollowers:', error);
        res.status(500).send({ error: 'An error occurred' });
    }
};


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