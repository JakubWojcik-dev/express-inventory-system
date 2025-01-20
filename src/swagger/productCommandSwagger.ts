/**
 * @swagger
 * tags:
 *   - name: Products
 *     description: Products request
 * /products:
 *   post:
 *     summary: Create a new product
 *     description: Add a new product to the database.
 *     tags:
 *       - Products
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: number
 *           example:
 *             name: "name"
 *             description: "Description of Product"
 *             price: 29.99
 *             stock: 15
 *     responses:
 *       201:
 *         description: Success
 *         content:
 *           application/json:
 *             example:
 *               message: "Success"
 *               result: { "_id": "12345" }
 *       400:
 *         description: Input data must be JSON type
 *       422:
 *         description: Error, invalid input data
 *       500:
 *         description: Error creating product
 */

/**
 * @swagger
 * /products:
 *   put:
 *     summary: Update an existing product
 *     description: Update product information by providing an ID.
 *     tags:
 *       - Products
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: number
 *           example:
 *             _id: "678ed0af894eda89f78a1f22"
 *             name: "Updated Product"
 *             description: "Updated description"
 *             price: 19.99
 *             stock: 20
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       422:
 *         description: Invalid data input
 *       404:
 *         description: Product with id not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /products:
 *   delete:
 *     summary: Delete a product
 *     description: Remove a product by providing its ID.
 *     tags:
 *       - Products
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *           example:
 *             _id: "678ed0af894eda89f78a1f22"
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       422:
 *         description: Invalid data input
 *       404:
 *         description: Product with id not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     description: Fetch all products from the database.
 *     tags:
 *       - Products
 *     responses:
 *       200:
 *         description: List of products
 *         content:
 *           application/json:
 *             example:
 *               products: [
 *                 { "_id": "678ed0af894eda89f78a1f24", "name": "Product A", "price": 29.99, "stock": 10 },
 *                 { "_id": "678ed0af8hg4eda89f78a1f22", "name": "Product B", "price": 32.50, "stock": 7 }
 *               ]
 *       500:
 *         description: Server error
 */
