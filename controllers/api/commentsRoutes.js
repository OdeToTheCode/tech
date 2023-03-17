const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { Post, User, Comment } = require('../../models');

router.get('/', async (req, res) => {
  try {
    let getAllComments = await Comment.findAll({
      where: { post_id: post.id },
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Post,
          attributes: ['id', 'user_id', 'post_title', 'post_content'],
        },
      ],
    });
    res.json(getAllComments);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


router.post('/post/:id', async (req, res) => {
  if (req.session) {
    try {
      let comment = await Comment.findAll({
        user_id: req.session.user_id,
        post_id: req.params.id,
        include: [
          {
            model: User,
            attributes: ['username'],
          },
        ],
      });
      const user = await User.findByPk(req.session.user_id);
      comment.dataValues.user_name = user.user_name;
      res.json(comment);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
});

module.exports = router;

