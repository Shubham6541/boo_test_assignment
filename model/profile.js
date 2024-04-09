const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const ProfileSchema = new mongoose.Schema({
    name: {
        type: 'String',
        required: true,
        lowercase: true,
    }
}, { versionKey: false })

ProfileSchema.plugin(mongooseDelete, { overrideMethods: "all" })

const Profile = mongoose.model('Profile', ProfileSchema);

module.exports = Profile;