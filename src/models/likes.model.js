import mongoose from "mongoose";

const likeSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
        food: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "food",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

// Prevent a user from liking the same food multiple times
likeSchema.index({ user: 1, food: 1 }, { unique: true });

const likeModel = mongoose.model("like", likeSchema);

export default likeModel;