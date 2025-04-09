/**
 * @swagger
 * /login:
 *   post:
 *     summary: Logg inn bruker
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Innlogging vellykket
 *       401:
 *         description: Ugyldige påloggingsopplysninger
 */
router.post('/login', loginHandler);
