# note-keeper-180837-180884

Notes Backend (Express API)
- Runs on port 3001
- Provides CRUD endpoints for notes with basic validation
- Persists notes to a local JSON file at notes_backend/data/notes.json

Start
- Navigate to notes_backend
  - npm install
  - Development: npm run dev
  - Production: npm start

Docs
- Swagger UI: http://localhost:3001/docs

Endpoints
- GET /notes
  - List all notes
- GET /notes/:id
  - Retrieve a note by ID
- POST /notes
  - Create a note
  - Body: { "title": "string", "content": "string" }
- PUT /notes/:id
  - Update a note (partial: title and/or content)
  - Body: { "title": "string", "content": "string" }
- DELETE /notes/:id
  - Delete a note by ID

Note shape
{
  "id": "uuid",
  "title": "string",
  "content": "string",
  "createdAt": "ISO-8601 string",
  "updatedAt": "ISO-8601 string"
}

Example curl
- List:
  curl -s http://localhost:3001/notes | jq .
- Create:
  curl -s -X POST http://localhost:3001/notes \
    -H "Content-Type: application/json" \
    -d '{"title":"First","content":"Hello"}' | jq .
- Get by id:
  curl -s http://localhost:3001/notes/<id> | jq .
- Update:
  curl -s -X PUT http://localhost:3001/notes/<id> \
    -H "Content-Type: application/json" \
    -d '{"title":"Updated title"}' | jq .
- Delete:
  curl -i -X DELETE http://localhost:3001/notes/<id>

Validation and errors
- 400 for invalid payloads
- 404 for missing note IDs
- 500 for unexpected server errors

Notes
- Server listens on port 3001.
- Data persisted in notes_backend/data/notes.json.
