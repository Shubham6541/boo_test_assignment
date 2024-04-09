const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const CommentSchema = new mongoose.Schema({
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile'
    },
    mbti: {
        type: 'String',
        enum: ['', 'INFP', 'INFJ', 'ENFP', 'ENFJ', 'INTJ', 'INTP', 'ENTP', 'ENTJ', 'ISFP', 'ISFJ', 'ESFP', 'ESFJ', 'ISTP', 'ISTJ', 'ESTP', 'ESTJ'],
    },
    enneagram: {
        type: 'String',
        enum: ['', '1w2', '2w3', '3w2', '3w4', '4w3', '4w5', '5w4', '5w6', '6w5', '6w7', '7w6', '7w8', '8w7', '8w9', '9w8', '9w1'],
    },
    zodiac: {
        type: 'String',
        enum: ['', 'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'],
    },
    title: {
        type: 'String',
        lowercase: true,
        required: true,
    },
    comment: {
        type: 'String',
        lowercase: true,
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Profile'
        }
    ],
    totalLike: {
        type: 'Number',
        default: 0
    },

}, { timestamps: true, versionKey: false })

CommentSchema.plugin(mongooseDelete, { overrideMethods: "all" })

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;