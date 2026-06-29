import foodModel from "../models/food.model.js";
import storageService from "../services/storage.service.js";
import likeModel from "../models/likes.model.js";
import saveModel from "../models/save.model.js";
import { v4 as uuid } from "uuid";

// ================= CREATE FOOD =================

export async function createFood(req, res) {
    const fileUploadResult = await storageService.uploadFile(
        req.file.buffer,
        uuid()
    );

    const foodItem = await foodModel.create({
        name: req.body.name,
        description: req.body.description,
        video: fileUploadResult.url,
        foodPartner: req.foodPartner._id,
    });

    res.status(201).json({
        message: "Food created successfully",
        food: foodItem,
    });
}

// ================= GET ALL FOOD =================

export async function getFoodItems(req, res) {
    const foodItems = await foodModel.find({});

    res.status(200).json({
        message: "Food items fetched successfully",
        foodItems,
    });
}

// ================= LIKE / UNLIKE FOOD =================

export async function likeFood(req, res) {
    const { foodId } = req.body;
    const user = req.user;

    const isAlreadyLiked = await likeModel.findOne({
        user: user._id,
        food: foodId,
    });

    if (isAlreadyLiked) {
        await likeModel.deleteOne({
            user: user._id,
            food: foodId,
        });

        await foodModel.findByIdAndUpdate(foodId, {
            $inc: { likeCount: -1 },
        });

        return res.status(200).json({
            message: "Food unliked successfully",
        });
    }

    const like = await likeModel.create({
        user: user._id,
        food: foodId,
    });

    await foodModel.findByIdAndUpdate(foodId, {
        $inc: { likeCount: 1 },
    });

    res.status(201).json({
        message: "Food liked successfully",
        like,
    });
}

// ================= SAVE / UNSAVE FOOD =================

export async function saveFood(req, res) {
    const { foodId } = req.body;
    const user = req.user;

    const isAlreadySaved = await saveModel.findOne({
        user: user._id,
        food: foodId,
    });

    if (isAlreadySaved) {
        await saveModel.deleteOne({
            user: user._id,
            food: foodId,
        });

        await foodModel.findByIdAndUpdate(foodId, {
            $inc: { savesCount: -1 },
        });

        return res.status(200).json({
            message: "Food unsaved successfully",
        });
    }

    const save = await saveModel.create({
        user: user._id,
        food: foodId,
    });

    await foodModel.findByIdAndUpdate(foodId, {
        $inc: { savesCount: 1 },
    });

    res.status(201).json({
        message: "Food saved successfully",
        save,
    });
}

// ================= GET SAVED FOODS =================

export async function getSaveFood(req, res) {
    const user = req.user;

    const savedFoods = await saveModel.find({
        user: user._id,
    }).populate("food");

    if (!savedFoods || savedFoods.length === 0) {
        return res.status(404).json({
            message: "No saved foods found",
        });
    }

    res.status(200).json({
        message: "Saved foods retrieved successfully",
        savedFoods,
    });
}

export default {
    createFood,
    getFoodItems,
    likeFood,
    saveFood,
    getSaveFood,
};