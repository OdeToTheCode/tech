const router = require('express').Router();
const { Post, User, Comment } = require('../../models');

router.get ('/', async (req, res) => {
    try {
      let getAllPosts = await Post.findAll({  attributes: { exclude: ['password']}});
      res.json(getAllPosts);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

  router.post('/', async (req, res) => {
    try {
      const newUser = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      });
      req.session.save(() => {
        req.session.user_id = newUser.id;
        req.session.username = newUser.username;
        req.session.logged_in = true;
        res.json(newUser);
      }
      );
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err });

    }
  });

  router.get('/:id', async (req, res) => {
    const oneUser = req.params.id;
    try {
      const singleUser = await User.findOne({
        attributes: { exclude: ['password']},
        where: {
          id: oneUser
        },
        include: [{
          model: Post,
          attributes: [
            'user_id',
            'post_date',
            'post_title',
            'post_content'
          ]
        },
        {
          model: Comment,
          attributes: ['id', 'comment_date', 'comment_content'],
          include: {
            model: Post,
            attributes: ['post_title']
          }
        },
        {
          model: Post,
          attributes: ['post_title']
        }
      ]

      });
      res.json(singleUser);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
  
  module.exports = router;