/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Logg inn en bruker
 *     tags:
 *       - Autentisering
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: bruker@domene.no
 *               password:
 *                 type: string
 *                 example: passord123
 *     responses:
 *       200:
 *         description: Innlogging vellykket
 *       401:
 *         description: Ugyldige opplysninger
 */
router.post('/login', loginHandler);
