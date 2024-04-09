const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const{ expect}  = require('chai');
const {app}  = require('../app');
const request = require('supertest');



describe('POST: Create new user', () => {


    it('Creates a New User', async () => {
        const profileData = { name: 'shubham' }
        const res = await request(app).post('/profile/create').send(profileData);

        expect(res.status).to.equal(200)
        expect(res._body.data).to.includes(profileData)

        describe('GET: Existing user', () => {
            it('Get User By Id', async () => {
                const id = res._body.data._id;
                const getResult = await request(app).get(`/profile/${id}`);

                expect(getResult.status).to.equal(200);
                expect(getResult.type).to.equal('text/html');
            })
        })

        describe('GET: Not existing user', () => {
            it('If user is not exist, throws an error', async () => {
                const id = 'test_id';
                const getResult = await request(app).get(`/profile/${id}`);

                const message = { message: 'Profile not found' }

                expect(getResult.status).to.equal(404);
                expect(getResult._body).to.includes(message);
            })
        })

        describe('POST: Add comment function', () => {
            it('add comment', async () => {
                const id = res._body.data._id;
                const commentData = {
                    mbti: 'INTJ',
                    enneagram: '1w2',
                    zodiac: 'Cancer',
                    title: 'first comment',
                    comment: 'test is working well.'               
                }
                const postComment = await request(app).post(`/comment/postComment/${id}`).send(commentData);

                expect(postComment.status).to.equal(200);
                expect(postComment._body.data).to.includes(commentData);

                describe('POST: Like function', () => {
                    it('run like function', async () => {
                        const userId = postComment._body.data.createdBy
                        const commentId = postComment._body.data._id
                        const addLike = await request(app).post(`/comment/likeComment?userId=${userId}&commentId=${commentId}`);
                        const likeResponse = { message: 'like success.' }
                        
                        expect(addLike.status).to.equal(200);
                        expect(addLike._body).to.includes(likeResponse);
                    })
                })

                describe('POST: Unlike function', () => {
                    it('if hitted by same userId, run dislike', async () => {
                        const userId = postComment._body.data.createdBy
                        const commentId = postComment._body.data._id
                        const addLike = await request(app).post(`/comment/likeComment?userId=${userId}&commentId=${commentId}`);
                        const likeResponse = { message: 'unlike success.' }
                        
                        expect(addLike.status).to.equal(200);
                        expect(addLike._body).to.includes(likeResponse);
                    })
                })
            })
        })

    });
});


// before(async () => {
//     // Start a MongoDB server instance in memory
//     mongoServer = await MongoMemoryServer.create();

//     // Get the URI of the in-memory MongoDB instance
//     const mongoUri = mongoServer.getUri();

//     // Connect Mongoose to the in-memory MongoDB instance
//     await mongoose.connect(mongoUri, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     });
// });

after(async () => {
    // Disconnect Mongoose from the in-memory MongoDB instance
    await mongoose.disconnect();

    // Stop the MongoDB server instance
    await mongoServer.stop();
});
