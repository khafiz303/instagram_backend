const User = require('../../auth/User');
const Follow = require('../Follow'); 

const { Op, fn } = require('sequelize');
const suggestions = async (req, res) => {
    try {
        const followedUsers = await Follow.findAll({
            attributes: ['user_id'],
            where: { follower_id: req.user.id },
            group: ['user_id'],
            order: [fn('RANDOM')],
            limit: 5
        });

        const followedUserIds = followedUsers.map(follow => follow.user_id);

        if (followedUserIds.length === 0) {
            return res.status(200).send([]);
        }

        const randomFollowersPromises = followedUserIds.map(async (userId) => {
            const randomFollowers = await Follow.findAll({
                attributes: ['follower_id'],
                where: { user_id: userId },
                order: [fn('RANDOM')],
                limit: 1
            });

            return randomFollowers.length > 0 ? randomFollowers[0].follower_id : null;
        });

        const randomFollowerIds = await Promise.all(randomFollowersPromises);

        const usersPromises = randomFollowerIds.filter(id => id !== null).map(id => 
            User.findOne({ where: { id } })
        );

        const users = await Promise.all(usersPromises);

        res.status(200).send(users);

    } catch (error) {
        console.error('Error fetching suggestions:', error);
        res.status(500).send({ message: 'Server Error' });
    }
}

module.exports = suggestions;
