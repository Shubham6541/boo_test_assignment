const { expect } = require('chai');
const { app } = require('../app');
const request = require('supertest');

describe('POST: Create new user', () => {
    it('Creates a New User', async () => {
        const profileData = { name: 'shubham' }
        const res = await request(app).post('/profile/create').send(profileData);

        expect(res.status).to.equal(200);
        expect(res.body.data).to.deep.include(profileData);
    });


    it('Get Existing User By Id', async () => {
        const res = await request(app).post('/profile/create').send({ name: 'existingUser' });
        const id = res.body.data._id;
        const getResult = await request(app).get(`/profile/${id}`);

        expect(getResult.status).to.equal(200);
        expect(getResult.type).to.equal('text/html');
    });

    describe('POST: Add comment function', () => {
        let postComment;
        it('add comment', async () => {
            const res = await request(app).post('/profile/create').send({ name: 'userForComment' });
            const id = res.body.data._id;
            const commentData = {
                mbti: 'INTJ',
                enneagram: '1w2',
                zodiac: 'Cancer',
                title: 'first comment',
                comment: 'test is working well.'
            };
            postComment = await request(app).post(`/comment/post/${id}`).send(commentData);

            expect(postComment.status).to.equal(201);
            expect(postComment.body.data).to.deep.include(commentData);
        });

        it('Test Like comment', async () => {
            const userId = postComment.body.data.createdBy;
            const commentId = postComment.body.data._id;
            const addLike = await request(app).post(`/comment/${commentId}/like?profileId=${userId}`);
            const likeResponse = { message: 'Liked successfully' };

            expect(addLike.status).to.equal(200);
            expect(addLike.body).to.deep.include(likeResponse);
        });

        it('if hitted by same userId, run dislike comment', async () => {
            const userId = postComment.body.data.createdBy;
            const commentId = postComment.body.data._id;
            const unlike = await request(app).post(`/comment/${commentId}/like?profileId=${userId}`);
            const unlikeResponse = { message: 'Unliked successfully' };

            expect(unlike.status).to.equal(200);
            expect(unlike.body).to.deep.include(unlikeResponse);
        });
    });
});