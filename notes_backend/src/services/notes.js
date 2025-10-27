const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const DATA_DIR = path.join(__dirname, '..', '..', 'data');
const DATA_FILE = path.join(DATA_DIR, 'notes.json');

/**
 * Ensure the data directory and file exist.
 */
function ensureStorage() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2), 'utf-8');
  }
}

/**
 * Read all notes from storage.
 * @returns {Array} list of notes
 */
function readAll() {
  ensureStorage();
  const raw = fs.readFileSync(DATA_FILE, 'utf-8');
  try {
    const data = JSON.parse(raw);
    if (Array.isArray(data)) return data;
    return [];
  } catch {
    return [];
  }
}

/**
 * Write all notes to storage.
 * @param {Array} notes
 */
function writeAll(notes) {
  ensureStorage();
  fs.writeFileSync(DATA_FILE, JSON.stringify(notes, null, 2), 'utf-8');
}

class NotesService {
  /**
   * Get all notes.
   * @returns {Array}
   */
  // PUBLIC_INTERFACE
  list() {
    return readAll();
  }

  /**
   * Get a single note by id.
   * @param {string} id
   * @returns {object|null}
   */
  // PUBLIC_INTERFACE
  getById(id) {
    const notes = readAll();
    return notes.find(n => n.id === id) || null;
  }

  /**
   * Create a new note.
   * @param {{title:string, content:string}} payload
   * @returns {object} created note
   */
  // PUBLIC_INTERFACE
  create(payload) {
    const notes = readAll();
    const now = new Date().toISOString();
    const note = {
      id: uuidv4(),
      title: payload.title,
      content: payload.content,
      createdAt: now,
      updatedAt: now,
    };
    notes.push(note);
    writeAll(notes);
    return note;
  }

  /**
   * Update an existing note by id.
   * @param {string} id
   * @param {{title?:string, content?:string}} payload
   * @returns {object|null} updated note or null if not found
   */
  // PUBLIC_INTERFACE
  update(id, payload) {
    const notes = readAll();
    const idx = notes.findIndex(n => n.id === id);
    if (idx === -1) return null;
    const existing = notes[idx];
    const updated = {
      ...existing,
      title: payload.title !== undefined ? payload.title : existing.title,
      content: payload.content !== undefined ? payload.content : existing.content,
      updatedAt: new Date().toISOString(),
    };
    notes[idx] = updated;
    writeAll(notes);
    return updated;
  }

  /**
   * Delete a note by id.
   * @param {string} id
   * @returns {boolean} true if deleted, false if not found
   */
  // PUBLIC_INTERFACE
  remove(id) {
    const notes = readAll();
    const idx = notes.findIndex(n => n.id === id);
    if (idx === -1) return false;
    notes.splice(idx, 1);
    writeAll(notes);
    return true;
  }
}

module.exports = new NotesService();
