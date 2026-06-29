import mongoose from "mongoose";

const foodSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        video: {
            type: String,
            required: true,
        },
        foodPartner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "foodpartner",
            required: true,
        },
        likeCount: {
            type: Number,
            default: 0,
        },
        savesCount: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

const foodModel = mongoose.model("food", foodSchema);

export default foodModel;