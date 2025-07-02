📚 Book Management API

A simple RESTful API for user registration, authentication, and book CRUD operations. Data is stored in local JSON files and validated using Zod. Authentication is handled via JWT.

🔧 Tech Stack
- Node.js
- Express
- Zod (for validation)
- JWT (for authentication)
- bcryptjs (for password hashing)
- uuid (for unique IDs)
- JSON File System (for data persistence)

📁 Project Structure
.
├── Controller
│   ├── AuthController.js
│   └── BookController.js
├── Routes
│   ├── AuthRoute.js
│   └── BookRoute.js
├── Middleware
│   └── middleware.js
├── Validation
│   └── validation.js
├── utils
│   ├── Helper.js
│   └── HashPasswordHelper.js
├── data
│   ├── users.json
│   └── books.json
├── .env
├── package.json
├── server.js
└── README.txt

🚀 Setup Instructions
1. Clone the repository
   git clone <your-repo-url>
   cd your-project

2. Install dependencies
   npm install

3. Environment Variables
   Create a .env file in the root and add:
   SECRET_KEY=your_jwt_secret
   PORT=8000

4. Run the server
   node server.js
   The server will start on http://localhost:8000

🔐 Authentication Endpoints
✅ Register
POST /api/auth/register
Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secure123"
}

✅ Login
POST /api/auth/login
Body:
{
  "email": "john@example.com",
  "password": "secure123"
}
Returns accessToken for authenticated requests.

📘 Book Endpoints (Protected)
All routes below require an Authorization header:
Authorization: <accessToken>

📚 Add Book
POST /api/book/add
{
  "title": "Sample Book",
  "author": "Author Name",
  "genere": "fiction",
  "publishedyear": 2020
}

📚 Get All Books
GET /api/book/getall
Optional Query:
- genre=fiction
- page=1
- limit=5

📖 Get Single Book
GET /api/book/single/:id

✏️ Update Book
PUT /api/book/update/:id

❌ Delete Book
DELETE /api/book/delete/:id

✅ Validation Rules
All user and book inputs are validated using Zod.

Book Schema:
- title: required string
- author: required string
- genere: required string
- publishedyear: integer (1000 - current year)

🧪 Testing
You can test endpoints using:
- Postman
- Thunder Client (VS Code)
- curl commands

📂 Data Storage
Data is stored in:
- data/users.json
- data/books.json
Automatically created if not present.

🛠 TODO
- Add search functionality
- Add admin role
- Persist data using a real database (MongoDB, PostgreSQL, etc.)
- Add unit tests

📄 License
MIT — feel free to use, modify, and distribute.
