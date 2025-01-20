import { body, param } from "express-validator";
export const validateStockData = [
  body("stock")
    .notEmpty()
    .withMessage("Stock value is required")
    .bail()
    .isInt()
    .withMessage("Stock must be a number")
    .bail()
    .isFloat({ gt: 0 })
    .withMessage("Stock value must be a positive number")
    .bail()
    .isLength({ max: 50 })
    .withMessage("Max variable length is 50"),
  param("id")
    .notEmpty()
    .withMessage("id is required as a param")
    .bail()
    .isString()
    .withMessage("id must be a string")
    .bail()
    .isLength({ max: 50 })
    .withMessage("Max variable length is 50"),
];
