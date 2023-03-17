const {User, Post, Comment} = require('../models');
const sequelize = require('../config/connection');

const user = [
    {
        username: 'TonyStark',
        password: '123456',
        email: 'tonystartk@example.com'
    },
    {
      username: 'SteveRogers',
      password: '123456',
      email: 'steverogers@example.com'
    },
]

const post = [
    {
      user_id: 1,
      post_date: '01/02/2023',
      post_title: 'Tony Stark',
      post_content: 'lorem ipsum'
    },
    {
      user_id: 2,
      post_date: '01/02/2023',
      post_title: 'Steve Rogers',
      post_content: 'lorem ipsum'
    },
]

const comment = [
    {
      user_id: 1,
      post_id: 2,
      comment_date: '01/02/2023',
      comment_content: 'lorem ipsum'
    },
    {
      user_id: 2,
      post_id: 1,
      comment_date: '01/02/2023',
      comment_content: 'lorem ipsum'
    },
]

const seedUser = () => User.bulkCreate(user);

const seedPost = () =>  Post.bulkCreate(post);

const seedComment = () =>  Comment.bulkCreate(comment);


const seedAll = async () => {
    await sequelize.sync({ force: true });

    await seedUser();
    await seedPost();
    await seedComment();
    process.exit(0);
};
  
seedAll();
