'use strict';

const express = require('express');
const router = express.Router();
const Comment = require('../model/comment');
const Profile = require('../model/profile');

router.post('/post/:profileId', async (req, res) => {
  try {
    const { profileId } = req.params;
    const { title, comment, mbti, enneagram, zodiac } = req.body;

    const profileExists = await Profile.exists({ _id: profileId });
    if (!profileExists) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    const newComment = await Comment.create({
      createdBy: profileId,
      mbti,
      enneagram,
      zodiac,
      title,
      comment
    });

    res.status(201).json({ statusCode: 201, message: `Comment added by Profile id: ${profileId}`, data: newComment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/*', async (req, res) => {
  const { mbti, enneagram, zodiac, sort } = req.query;
  let filter = {};
  let sortOptions = {};

  if (mbti || enneagram || zodiac) {
    filter = {
      $or: [
        { mbti }, { enneagram }, { zodiac }
      ]
    };
  }

  if (sort && sort.toLowerCase() === 'mostliked') {
    sortOptions = { totalLike: -1 };
  } else if (sort && sort.toLowerCase() === 'mostrecent') {
    sortOptions = { createdAt: -1 };
  }

  try {
    const comments = await Comment.find(filter).sort(sortOptions);
    res.status(200).json({ statusCode: 200, data: comments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/:commentId/like', async (req, res) => {
  const { commentId } = req.params;
  const { profileId } = req.query;

  try {
    const profile = await Profile.findById({ _id: profileId });
    const comment = await Comment.findById(commentId);

    if (profile == null) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    if (comment == null) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    const alreadyLiked = comment.likes.includes(profileId);

    if (alreadyLiked) {
      await Comment.findByIdAndUpdate(commentId, { $pull: { likes: profileId }, $inc: { totalLike: -1 } });
      return res.status(200).json({ message: 'Unliked successfully' });
    } else {
      await Comment.findByIdAndUpdate(commentId, { $push: { likes: profileId }, $inc: { totalLike: 1 } });
      return res.status(200).json({ message: 'Liked successfully' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
