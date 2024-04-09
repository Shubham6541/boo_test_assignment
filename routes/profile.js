'use strict';

const express = require('express');
const router = express.Router();
const profileSchema = require('../model/profile');
const Profile = require('../data/profile');


module.exports = function () {

  /**
 * @swagger
 * /profile/{id}:
 *   get:
 *     description: Sample endpoint description
 *     responses:
 *       200:
 *         description: Successful response
 */
  router.get('/:id', async function (req, res, next) {
    try {
      const { id } = req.params;
      
      if (id === 'all') {
        // If id is 'all', fetch details of all registered users
        const allUsers = await profileSchema.find({});
        return res.status(200).json({ statusCode: 200, message: 'Success', data: allUsers });
      }

      const userData = await profileSchema.findById({ _id: id });
      if (userData == null) {
        return res.status(404).json({ message: 'Profile not found' });
      }
      res.render('profile_template', {
        profile: new Profile(id, userData.name),
      });

    } catch (error) {
      console.error(`Error while getting profile with profile id ${id} : ${error}`);
      res.status(500).send('Internal Server Error');
    }
  });


  router.post('/create', async (req, res) => {
    try {
      const { name } = req.body;
      const createUser = await profileSchema.create({ name });

      res.status(200).json({ statusCode: 200, message: `success add ${name}`, data: createUser });
    } catch (error) {
      console.log(`Error while creating profile : ${error}`);
      res.status(500).json({ message: error });
    }
  });

  router.get('/all', async (req, res) => {
    try {
      const profiles = await profileSchema.find({});
      res.status(200).json({ statusCode: 200, message: `success`, data: profiles });
    } catch (error) {
      console.log(`Error while fetching all profiles : ${error}`);
      res.status(500).json({ message: error });
    }
  });

  return router;
}

