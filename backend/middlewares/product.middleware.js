import joi from "joi";

export const addProductMiddleware = async (req, res, next) => {
    const schema = joi.object({
        name: joi.string().min(2).max(40).trim().required(),
        price: joi.number().min(0).required(),
        image: joi.string()
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res
            .status(400)
            .json({
                success: false,
                message: "Validation failed",
                error: error?.details[0].message
            })
    }
    next();
}