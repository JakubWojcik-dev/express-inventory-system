/**
 * @swagger
 * tags:
 *   - name: Stock
 *     description: Stock request
 * /stock/{id}/restock:
 *   post:
 *     summary: Restock a product
 *     description: Increase the stock of a product based on a stock value.
 *     tags:
 *       - Stock
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Product ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               stock:
 *                 type: number
 *           example:
 *             stock: 2
 *     responses:
 *       201:
 *         description: Stock updated successfully
 *       400:
 *         description: Invalid input data
 *       404:
 *         description: Product doesn't exist in db.
 *       422:
 *         description: Error, invalid input data
 *       500:
 *         description: Error updating stock.
 */

/**
 * @swagger
 * /stock/{id}/sell:
 *   post:
 *     summary: Sell a product
 *     description: Decrease the stock of a product based on a stock value.
 *     tags:
 *       - Stock
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Product ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               stock:
 *                 type: number
 *           example:
 *             stock: 1
 *     responses:
 *       201:
 *         description: Stock updated successfully
 *       400:
 *         description: Stock cannot go below 0.
 *       404:
 *         description: Product doesn't exist in db.
 *       422:
 *         description: Error, invalid input data
 *       500:
 *         description: Error updating stock.
 */
