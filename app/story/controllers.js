const Story = require('./Story');

const createStory = async (req, res) => {
    try {
        if (!req.file || !req.file.filename) {
            return res.status(400).send('No file uploaded');
        }
        
        if (!req.user || !req.user.id) {
            return res.status(400).send('User not authenticated');
        }

        const story =  await Story.create({
            userId: req.user.id,
            imageUrl: '/uploads/' + req.file.filename,
            description: req.body.description || ''
        });

        return res.status(201).send(story);
    } catch (error) {
        console.error('Error creating story:', error);
        return res.status(500).send('Internal server error');
    }
};


const deleteStory = async (req, res) => {
    try {
        const storyId = req.params.id;
        if (!storyId) {
            return res.status(400).send('Story ID is required');
        }

        const result = await Story.destroy({ where: { id: storyId } });

        if (!result) {
            return res.status(404).send('Story not found');
        }

        return res.status(200).send('Story deleted successfully');
    } catch (error) {
        console.error('Error deleting story:', error);
        return res.status(500).send('Internal server error');
    }
};

const getStory = async (req, res) => {
    try {
        const stories = await Story.findAll();
        const nowDate = new Date().getTime() - (24 * 60 * 60 * 1000);

        const filteredStories = stories.filter(story => new Date(story.createdAt).getTime() > nowDate);

        return res.status(200).send(filteredStories);
    } catch (error) {
        console.error('Error fetching stories:', error);
        return res.status(500).send('Internal server error');
    }
};

module.exports = {
    createStory,
    deleteStory,
    getStory
};
