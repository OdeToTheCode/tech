const router = require('express').Router();
const express = require('express');
const { User, Post, Comment } = require('../models');
const sequelize = require('../config/connection.js');

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});


router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

router.get("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      attributes: [
        'id',
        'post_date',
        'post_title',
        'post_content',
      ],  
      include: [{
            model: Comment,
            attributes: [
              'id', 
              'user_id', 
              'post_id', 
              'comment_date', 
              'comment_content'],
            include: {
                model: User,
                attributes: ['username']
            }    
        },    
        {
            model: User,
            attributes: ['username']
        }]    
    })    

    let posts = postData.map((post) => post.get({ plain: true }));

    res.render('homepage', {
      posts,
      logged_in: req.session.logged_in
    });  
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }  
});  

router.get('/post/:id', async (req, res) => {
  const postId = req.params.id;

  try {
    const individualPostData = await Post.findOne({
      where: { 
        id: postId 
      },  
      attributes: [
        'id',
        'post_date',
        'post_title',
        'post_content',
      ],  
      include: [{
            model: Comment,
            attributes: [
              'id', 
              'user_id', 
              'post_id', 
              'comment_date', 
              'comment_content'],
            include: {
                model: User,
                attributes: ['username']
            }    
        },    
        {
            model: User,
            attributes: ['username']
        }]    
    })    

    let post = individualPostData.get({ plain: true });

    res.render('post', {
      post,
      logged_in: req.session.logged_in
    });  
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }  
});  


module.exports = router;