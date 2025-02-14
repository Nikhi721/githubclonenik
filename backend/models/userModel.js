const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
    },
    repositories: [{
        default: [],
        type: Schema.Types.ObjectId,
        ref: "Repository",
    }],
    followedUsers: [{
        default: [],
        type: Schema.Types.ObjectId,
        ref: "Users",
    }],
    startRepos: [{
        default: [],
        type: Schema.Types.ObjectId,
        ref: "Repository",
    }],
}, { timestamps: true });  // <-- Move timestamps here as an option

const User = mongoose.model("User", UserSchema);
module.exports = User;
