const express = require('express');
const notesController = require('../controllers/notes');
const { validateCreateNote, validateUpdateNote } = require('../middleware/validation');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Notes
 *   description: CRUD operations for notes
 */

/**
 * @swagger
 * /notes:
 *   get:
 *     summary: List notes
 *     tags: [Notes]
 *     responses:
 *       200:
 *         description: Array of notes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id: { type: string }
 *                   title: { type: string }
 *                   content: { type: string }
 *                   createdAt: { type: string, format: date-time }
 *                   updatedAt: { type: string, format: date-time }
 */
router.get('/', notesController.list.bind(notesController));

/**
 * @swagger
 * /notes/{id}:
 *   get:
 *     summary: Get a note by ID
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema: { type: string }
 *         required: true
 *         description: Note ID
 *     responses:
 *       200:
 *         description: A single note
 *       404:
 *         description: Note not found
 */
router.get('/:id', notesController.get.bind(notesController));

/**
 * @swagger
 * /notes:
 *   post:
 *     summary: Create a new note
 *     tags: [Notes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, content]
 *             properties:
 *               title: { type: string }
 *               content: { type: string }
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Invalid payload
 */
router.post('/', validateCreateNote, notesController.create.bind(notesController));

/**
 * @swagger
 * /notes/{id}:
 *   put:
 *     summary: Update a note
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema: { type: string }
 *         required: true
 *         description: Note ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title: { type: string }
 *               content: { type: string }
 *     responses:
 *       200:
 *         description: Updated
 *       400:
 *         description: Invalid payload
 *       404:
 *         description: Note not found
 */
router.put('/:id', validateUpdateNote, notesController.update.bind(notesController));

/**
 * @swagger
 * /notes/{id}:
 *   delete:
 *     summary: Delete a note
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema: { type: string }
 *         required: true
 *         description: Note ID
 *     responses:
 *       204:
 *         description: Deleted
 *       404:
 *         description: Note not found
 */
router.delete('/:id', notesController.remove.bind(notesController));

module.exports = router;
