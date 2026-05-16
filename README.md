# NoteShare

Student Notes Sharing & Resource Management System
--- 

## Problem Description
Students often share lecture notes through WhatsApp or other informal platforms, making study materials difficult to organize, search, and access. This leads to inefficiency and loss of valuable resources.

---

## Proposed Solution
A centralized web-based system where students can upload, manage, search, and download study notes. The system ensures easy access, proper organization, and CRUD functionality for managing notes.

---

## Features
- Upload and store lecture notes with metadata (title, subject, content, uploader).
- Retrieve all notes from the database.
- Update existing notes with new information.
- Delete notes when no longer needed.
- Responsive React frontend with Material UI components
- API tested with Postman.
- GitHub workflow with clean commits and documentation.

---

## Technologies Used
 
 ## Backend
- **Node.js** – JavaScript runtime
- **Express.js** – RESTful API framework
- **MongoDB** – NoSQL Database
- **Mongoose** – ODM for schema modeling
- **dotenv** – Environment variable management
- **body-parser** – Request parsing
- **Postman** – API testing
- **nodemon** — Auto-restart server during development
- **GitHub** – Version control and documentation

---
 ## Frontend
- **React** — Component-based UI library
- **Material UI** — Prebuilt UI components
- **Axios** — HTTP client for API calls
- **Tailwind CSS** — Utility-first styling framework
- **Custom CSS** — Dark theme and responsive layout


## API Endpoints
- **Create Note (POST)**
- http://localhost:8000/api/notes/create

**Request Body**
```json
{
  "title": "Operating Systems",
  "subject": "IT2244",
  "content": "Memory Management",
  "uploadedBy": "XYA"
}
```

**Success — 200 OK**
```json
{
  "_id": {
    "$oid": "6a0333b5f2f1f47cd3384539"
  },
  "title": "Operating Systems",
  "subject": "IT2244",
  "content": "Memory Management",
  "uploadedBy": "XYA",
  "date": {
    "$date": "2026-05-12T14:05:41.958Z"
  },
  "__v": 0
}
```

**Error — 404 Not Found**
```json
{
  "error": "Internal Server Error"
}
```

- **Get All Notes (GET)**
- http://localhost:8000/api/notes/getall


**Success — 200 OK**
```json
{
  "_id": {
    "$oid": "6a033124f2f1f47cd3384537"
  },
  "title": "Web Services",
  "subject": "IT2234",
  "content": "API",
  "uploadedBy": "MNF",
  "date": {
    "$date": "2026-05-12T13:54:44.430Z"
  },
  "__v": 0
}
{
  "_id": {
    "$oid": "6a0333b5f2f1f47cd3384539"
  },
  "title": "Operating Systems",
  "subject": "IT2244",
  "content": "Memory Management",
  "uploadedBy": "XYA",
  "date": {
    "$date": "2026-05-12T14:05:41.958Z"
  },
  "__v": 0
}
{
  "_id": {
    "$oid": "6a080b14e3e8c7290e8b1776"
  },
  "title": "Browser test",
  "subject": "Integration",
  "content": "Testing database integration",
  "uploadedBy": "Subagent",
  "date": {
    "$date": "2026-05-16T06:13:40.987Z"
  },
  "__v": 0
}
```

**Error — 404 Not Found**
```json
{
  "error": "Internal Server Error"
}
```

- **Update Note (PUT)** 
- http://localhost:8000/api/notes/update/:id

**Request Body**
```json
{
  "title": "Operating Systems",
  "subject": "IT2244",
  "content": "Memory Schedule",
  "uploadedBy": "XYA"
}
```

**Success — 200 OK**
```json
{
  "_id": {
    "$oid": "6a0333b5f2f1f47cd3384539"
  },
  "title": "Operating Systems",
  "subject": "IT2244",
  "content": "Memory Management",
  "uploadedBy": "XYA",
  "date": {
    "$date": "2026-05-12T14:05:41.958Z"
  },
  "__v": 0
}
```

**Error — 404 Not Found**
```json
{
  "error": "Internal Server Error"
}
```

- **Delete Note (DELETE)** 
- http://localhost:8000/api/notes/delete/:id


**Success — 200 OK**
```json
{
  "message": "Note deleted successfully"
}
```

**Error — 404 Not Found**
```json
{
  "error": "Internal Server Error"
}
```

## Setup Instructions

### 1.	Clone the repository: 
```bash
git clone <https://github.com/Harshani557/NoteSharing>
cd notesharing
```

### 2. Configure Environment Variables
Create `.env` in root directory:

- PORT=8000
- MONGO_URL=mongodb://localhost:27017/studentNotes


### 3. Install Backend Dependencies

```bash
npm install
```

### 4. Install Frontend Dependencies

```bash
cd frontend
npm install
```

## How to Run the Project
1.	Ensure MongoDB is running locally.
2.	Run terminals:;
### Terminal 1 - Backend

```bash
npm start
```
Expected output:
```
Database connected successfully.
Server running on port 8000
```

### Terminal 2 - Run Frontend

```bash
cd frontend
npm start
```

Expected output:
```
Compiled successfully!
Local: http://localhost:3000
```

3.	Use Postman to test endpoints: 
    o	POST → Create notes
    o	GET → Retrieve notes
    o	PUT → Update notes
    o	DELETE → Remove notes
4.	Check MongoDB Compass to verify stored data.

## Repository

[https://github.com/Harshani557/NoteSharing]