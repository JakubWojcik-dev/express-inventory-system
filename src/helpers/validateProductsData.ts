import { body } from "express-validator";
export const validateProductsData = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .bail()
    .isString()
    .withMessage("Name must be a string")
    .bail()
    .isLength({ max: 50 })
    .withMessage("Max variable length is 50"),
  body("description")
    .notEmpty()
    .withMessage("Description is required")
    .bail()
    .isString()
    .withMessage("Description must be a string")
    .bail()
    .isLength({ max: 50 })
    .withMessage("Max variable length is 50"),
  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .bail()
    .isFloat({ gt: 0 })
    .withMessage("Price must be a positive number")
    .bail()
    .isLength({ max: 50 })
    .withMessage("Max variable length is 50"),
  body("stock")
    .notEmpty()
    .withMessage("Stock is required")
    .bail()
    .isInt({ min: 0 })
    .withMessage("Stock must be a non-negative integer")
    .bail()
    .isLength({ max: 50 })
    .withMessage("Max variable length is 50"),
];
