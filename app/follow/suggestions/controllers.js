const Follow = require('../Follow');
const User = require('../../auth/User');
const sequelize = require('sequelize');

const suggestions = async (req, res) => {
    try {
        const follows = await Follow.findAll({
            where: {
                user_id: req.user.id
            },
            order: [
                [sequelize.fn('RANDOM')]  
            ],
            limit: 5
        });

        const ids = follows.map(item => item.follower_id);
        console.log(ids);

        const users = await User.findAll({
            where: {
                id: ids
            },
            include: [
                {
                    model: Follow,
                    as: 'following',
                    separate: true,
                    order: [['id', 'DESC']],
                    limit: 1,
                    attributes: ['follower_id'] 
                }
            ]
        });

        const arr = users
            .filter(user => user.following.length > 0)  
            .map(user => user.following[0].follower_id);

       

        const  recommendationUser  = await User.findAll({
            where:{
                id : arr
            }
        })
        res.status(200).send(recommendationUser);


    } catch (error) {
        console.error('Error fetching suggestions:', error);
        res.status(500).send({ message: 'Server Error' });
    }
}

module.exports = suggestions;
