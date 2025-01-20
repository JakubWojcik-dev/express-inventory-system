import { body, ValidationChain } from "express-validator";
export const validateProductsData = (isOrderObject: {
  isOrder: boolean;
}): ValidationChain[] => {
  const isArray = isOrderObject.isOrder;

  const data: ValidationChain[] = [
    ...(isArray
      ? [
          body("customerId")
            .notEmpty()
            .withMessage("Customer ID is required")
            .bail()
            .isString()
            .withMessage("Customer ID must be a string type")
            .bail()
            .isLength({ max: 50 })
            .withMessage("Max variable length is 50"),
          body("products")
            .isArray({ min: 1 })
            .withMessage("Order must includes at least one product"),
        ]
      : []),
    body(isArray ? "products.*.name" : "name")
      .notEmpty()
      .withMessage("Name is required")
      .bail()
      .isString()
      .withMessage("Name must be a string")
      .bail()
      .isLength({ max: 50 })
      .withMessage("Max variable length is 50"),
    body(isArray ? "products.*.description" : "description")
      .notEmpty()
      .withMessage("Description is required")
      .bail()
      .isString()
      .withMessage("Description must be a string")
      .bail()
      .isLength({ max: 50 })
      .withMessage("Max variable length is 50"),
    body(isArray ? "products.*.price" : "price")
      .notEmpty()
      .withMessage("Price is required")
      .bail()
      .isFloat({ gt: 0 })
      .withMessage("Price must be a positive number")
      .bail()
      .isLength({ max: 50 })
      .withMessage("Max variable length is 50"),
    body(isArray ? "products.*.stock" : "stock")
      .notEmpty()
      .withMessage("Stock is required")
      .bail()
      .isInt(isArray ? { min: 1 } : { min: 0 })
      .withMessage(
        isArray
          ? "Stock must be a positive integer"
          : "Stock must be a non-negative integer"
      )
      .bail()
      .isLength({ max: 50 })
      .withMessage("Max variable length is 50"),
  ];
  return data;
};

export const validateUpdatedProductData = (): ValidationChain[] => [
  body("_id")
    .notEmpty()
    .withMessage("ID is required")
    .bail()
    .isString()
    .withMessage("ID must be a string")
    .bail()
    .isMongoId()
    .withMessage("ID must be a valid MongoDB ObjectId"),
  body("name")
    .optional()
    .isString()
    .withMessage("Name must be a string")
    .bail()
    .isLength({ max: 50 })
    .withMessage("Max variable length is 50"),
  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string")
    .bail()
    .isLength({ max: 50 })
    .withMessage("Max variable length is 50"),
  body("price")
    .optional()
    .isFloat({ gt: 0 })
    .withMessage("Price must be a positive number")
    .bail()
    .isLength({ max: 50 })
    .withMessage("Max variable length is 50"),
  body("stock")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Stock must be a non-negative integer")
    .bail()
    .isLength({ max: 50 })
    .withMessage("SMax variable length is 50"),
];

export const validateDeleteProducts = (): ValidationChain[] => [
  body("_id")
    .notEmpty()
    .withMessage("ID is required")
    .bail()
    .isString()
    .withMessage("ID must be a string")
    .bail()
    .isMongoId()
    .withMessage("ID must be a valid MongoDB ObjectId"),
];
