/**
 * @swagger
 * tags:
 *   - name: Orders
 *     description: Orders request
 * /orders:
 *   post:
 *     summary: Create a new order
 *     description: Place a new order by providing customer information and products.
 *     tags:
 *       - Orders
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customerId:
 *                 type: string
 *               products:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     price:
 *                       type: number
 *                     stock:
 *                       type: number
 *                     name:
 *                       type: string
 *                     description:
 *                       type: string
 *           example:
 *             customerId: "678ed0af894eda89f78a1f32"
 *             products:
 *                 _id: "678ed0af894eda89f78a1f22"
 *                 price: 2.30
 *                 name: "name"
 *                 stock: 10
 *                 description: "description"
 *
 *     responses:
 *       201:
 *         description: Success
 *       400:
 *         description: One or more products do not exist in the database
 *       422:
 *         description: Error, invalid input data
 *       500:
 *         description: Error creating order
 */

/**
 * @swagger
 * /orders:
 *   delete:
 *     summary: Delete an order
 *     description: Delete an order by providing its ID.
 *     tags:
 *       - Orders
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
 *             _id: "678ed0f6894eda89f78a1f23"
 *     responses:
 *       200:
 *         description: Order deleted successfully
 *       404:
 *         description: Order with id not found
 *       422:
 *         description: Error, invalid input data
 *       500:
 *         description: Error deleting order
 */

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get all orders
 *     description: Retrieve all orders from the database.
 *     tags:
 *       - Orders
 *     responses:
 *       200:
 *         description: List of orders
 *         content:
 *           application/json:
 *             example:
 *               orders: [
 *                 { "_id": "678ed0f6894eda89f78a1f23", "customerId": "678ed0f6tg4eda39f78a1f23", "products": [{"_id": "678ed0af894eda89f78a1f22","name": "name","description": "description","price": 3.30,"stock": 10}] }
 *               ]
 *       500:
 *         description: Error while fetching orders
 */
