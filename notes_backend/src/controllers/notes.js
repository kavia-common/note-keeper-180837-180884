const notesService = require('../services/notes');

class NotesController {
  /**
   * List all notes.
   */
  // PUBLIC_INTERFACE
  list(req, res) {
    const notes = notesService.list();
    return res.status(200).json(notes);
  }

  /**
   * Get a note by ID.
   */
  // PUBLIC_INTERFACE
  get(req, res) {
    const note = notesService.getById(req.params.id);
    if (!note) {
      return res.status(404).json({ status: 'fail', message: 'Note not found' });
    }
    return res.status(200).json(note);
  }

  /**
   * Create a new note.
   */
  // PUBLIC_INTERFACE
  create(req, res) {
    const created = notesService.create({ title: req.body.title, content: req.body.content });
    return res.status(201).json(created);
  }

  /**
   * Update a note by ID.
   */
  // PUBLIC_INTERFACE
  update(req, res) {
    const updated = notesService.update(req.params.id, { title: req.body.title, content: req.body.content });
    if (!updated) {
      return res.status(404).json({ status: 'fail', message: 'Note not found' });
    }
    return res.status(200).json(updated);
  }

  /**
   * Delete a note by ID.
   */
  // PUBLIC_INTERFACE
  remove(req, res) {
    const ok = notesService.remove(req.params.id);
    if (!ok) {
      return res.status(404).json({ status: 'fail', message: 'Note not found' });
    }
    return res.status(204).send();
  }
}

module.exports = new NotesController();
