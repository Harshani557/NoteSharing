# NoteSharing

Student Notes Sharing & Resource Management System

##Problem Description
Students often share lecture notes through WhatsApp or other informal platforms, making study materials difficult to organize, search, and access. This leads to inefficiency and loss of valuable resources.

##Proposed Solution
A centralized web-based system where students can upload, manage, search, and download study notes. The system ensures easy access, proper organization, and CRUD functionality for managing notes.

##Features
•	Upload and store lecture notes with metadata (title, subject, content, uploader).
•	Retrieve all notes from the database.
•	Update existing notes with new information.
•	Delete notes when no longer needed.
•	API tested with Postman.
•	GitHub workflow with clean commits and documentation.

##Technologies Used
•	Node.js – Backend runtime
•	Express.js – Web framework
•	MongoDB – Database
•	Mongoose – ODM for MongoDB
•	dotenv – Environment configuration
•	body-parser – Request parsing
•	Postman – API testing
•	GitHub – Version control and documentation

##API Endpoints (Examples)
•	Create Note (POST) 
http://localhost:8000/api/notes/create
{
	  "title": "Algorithms Lecture",
	  "subject": "CS201",
	  "content": "Sorting algorithms explained",
	  "uploadedBy": "Tekla"
	}
•	Get All Notes (GET) 
http://localhost:8000/api/notes/getall
•	Update Note (PUT) 
http://localhost:8000/api/notes/update/:id
•	Delete Note (DELETE) 
http://localhost:8000/api/notes/delete/:id

##Setup Instructions
1.	Clone the repository: 
2.	git clone <your-repo-url>
3.	cd student-notes
4.	Install dependencies: 
5.	npm install
6.	Create .env file: 
7.	PORT=8000
8.	MONGO_URL=mongodb://localhost:27017/studentNotes
9.	Start the server: 
10.	npm start

##How to Run the Project
1.	Ensure MongoDB is running locally.
2.	Start the server with npm start.
3.	Use Postman to test endpoints: 
    o	POST → Create notes
    o	GET → Retrieve notes
    o	PUT → Update notes
    o	DELETE → Remove notes
4.	Check MongoDB Compass to verify stored data.

