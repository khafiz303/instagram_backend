const Post = require('./Post');
const Comment = require('./Comment');
const User = require('../auth/User');
const { where } = require('sequelize');
const postCreate = async (req, res) => {
    try {
        console.log(req.body);
        console.log(req.body.comments);

        // Проверяем наличие файла изображения
        if (req.file && req.file.filename) {
            const imageUrl = '/uploads/' + req.file.filename;
            const description = req.body.description;
            const userId = req.user.id;

            // Создаем пост
            const post = await Post.create({
                imageUrl,
                description,
                userId
            });

           

            res.status(200).send('Данные успешно обработаны');
        } else {
            res.status(401).send('Ошибка: изображение не загружено');
        }
    } catch (error) {
        console.error('Ошибка при создании поста:', error);
        res.status(500).send('Произошла ошибка на сервере');
    }
};


const getMyPost =async (req , res)=>{
    const myPost = await Post.findAll({
        where: {
            userId: req.user.id
        },
        include: [
            {
                model: Comment,
                as: 'comments'
            }
        ]
    });
    
    res.status(200).send(myPost)
}

const getAllPosts = async (req , res)=>{
     const allPost = await Post.findAll()
     res.status(200).send(allPost )
}


const findPost = async(req , res)=>{
    const postFind = await Post.findOne({
        where:{
            id : req.params.id
        },
        include:[
            {
                model : Comment,
                as : 'comments',
                include : [
                    {
                        model : User,
                        as : 'userC',
                    }
                ]
            }
        ]

    })

    res.status(200).send(postFind)
}

const deletePost = async (req , res)=>{
    const postDelete = await Post.findOne({where: {id : req.params.id}})
    if(postDelete){
        await postDelete.destroy()
        res.status(200).json({ message: 'Post deleted successfully', postId: req.params.id });
    }else{
        res.status(404).send('Данный пост не найден')
    }
   
}

const postEdit = async (req , res)=>{
    console.log(req.body);
    if (req.file && req.file.filename) {

        var post = await Post.update({
            imageUrl : '/uploads/' + req.file.filename ,
            description :req.body.description ,
            userId : req.user.id
        },
        {
            where:{
                id : req.body.id
            }
        });
    }
    console.log(req.body.id);
    await Comment.destroy({
        where:{
            id : req.body.id
        }
    })
        // const deleteComment = await Comment.destroy({where:{postId : req.params.id}})
        if(req.body.comments){
            req.body.comments.forEach(async  (com)=>{
                const comment = await Comment.create({
                    postId : req.body.id , 
                    userId : req.user.id,
                    text : com.text
                })
            })
           

        }
        res.status(200).send('ok')

       

}

const getPost = async(req , res)=>{
    const {username} = req.params

    const user = await User.findOne({
        where:{
            fullName : username
        }
    })
    const post = await Post.findAll({
        where:{
            userId : user.id
        }
    })
    res.status(200).send(post)
}

module.exports ={
    postCreate, 
    getMyPost,
    getAllPosts,
    findPost,
    deletePost,
    postEdit,
    getPost
}


