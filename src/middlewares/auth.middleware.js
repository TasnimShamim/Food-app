import foodPartnerModel from "../models/foodpartner.model.js";
import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";

// ================= FOOD PARTNER AUTH =================

export async function authFoodPartnerMiddleware(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "Please login first",
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);//it will verify the token and return the decoded payload, which contains the food partner's ID.

        const foodPartner = await foodPartnerModel.findById(decoded.id);//it will find the food partner in the database using the ID from the decoded token.

        if (!foodPartner) {
            return res.status(401).json({
                message: "Food partner not found",
            });
        }

        req.foodPartner = foodPartner;

        next();
    } catch (err) {
        return res.status(401).json({
            message: "Invalid token",
        });
    }
}

// ================= USER AUTH =================

export async function authUserMiddleware(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "Please login first",
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await userModel.findById(decoded.id);

        if (!user) {
            return res.status(401).json({
                message: "User not found",
            });
        }

        req.user = user;

        next();
    } catch (err) {
        return res.status(401).json({
            message: "Invalid token",
        });
    }
}

export default {
    authFoodPartnerMiddleware,
    authUserMiddleware,
};