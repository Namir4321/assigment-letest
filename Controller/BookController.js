const {
  validateWithZodSchema,
  CreateBookSchema,
} = require("../Validation/validation");
const { readJsonFile, writeJsonFile } = require("../utils/Helper");
const { v4: uuidv4 } = require("uuid");

exports.createBook = async (req, res) => {
  const { title, author, genere,publishedyear } = req.body;
  console.log(req.user.userId)
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized access." });
  }
  try {
      const validateFields = await validateWithZodSchema(
        CreateBookSchema,
        req.body
      );
    const books = readJsonFile("books.json");
    const newBook = {
      id: uuidv4(),
      title,
      author,
      genere,
      publishedyear,
      userId:req.user.userId
      
    };

    books.push(newBook);
    writeJsonFile("books.json", books);
    res.status(201).json({ message: "Book created", book: newBook });
  } catch (err) {
    console.log(err);
     res.status(400).json({ error: err.message });
  }
};
exports.getAllBooks = async (req, res, next) => {
  try {
    const allBooks = readJsonFile("books.json");

    if (!allBooks || allBooks.length === 0) {
      return res.status(404).json({ message: "No books found" });
    }

    const { genre, page = 1, limit = 10 } = req.query;

    let filteredBooks = allBooks;

    if (genre) {
      filteredBooks = filteredBooks.filter(
        (book) => book.genere.toLowerCase() === genre.toLowerCase()
      );
    }

    const pageInt = parseInt(page);
    const limitInt = parseInt(limit);
    const startIndex = (pageInt - 1) * limitInt;
    const endIndex = pageInt * limitInt;

    const paginatedBooks = filteredBooks.slice(startIndex, endIndex);

    res.status(200).json({
      totalBooks: filteredBooks.length,
      currentPage: pageInt,
      totalPages: Math.ceil(filteredBooks.length / limitInt),
      books: paginatedBooks,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch books" });
  }
};
  
exports.getSingleBook = (req, res,next) => {
    try {
        const books = readJsonFile("books.json");
        const bookId = req.params.id;
        console.log(bookId)

    const book = books.find((b) => b.id === bookId);

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.status(200).json({ book });
  } catch (error) {
    console.error("Error fetching book:", error);
    res.status(500).json({ error: "Failed to fetch book" });
  }
};
exports.updateBook = async (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized access." });
  }

  const bookId = req.params.id;
  const userId = req.user.userId;

  try {
    const books = readJsonFile("books.json");
    const bookIndex = books.findIndex((b) => b.id === bookId);

    if (bookIndex === -1) {
      return res.status(404).json({ error: "Book not found" });
    }

    const book = books[bookIndex];

    if (book.userId !== userId) {
      return res
        .status(403)
        .json({ error: "Unauthorized to update this book" });
    }

    
    const updatedData = await validateWithZodSchema(CreateBookSchema, req.body);

    books[bookIndex] = { ...book, ...updatedData };

    writeJsonFile("books.json", books);

    res.status(200).json({
      message: "Book updated successfully",
      book: books[bookIndex],
    });
  } catch (err) {
    console.error("Error updating book:", err.message);
    res.status(400).json({ error: err.message });
  }
};
  
exports.deleteBook = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized access." });
  }

  const bookId = req.params.id;
  const userId = req.user.userId;

  try {
    const books = readJsonFile("books.json");
    const bookIndex = books.findIndex((b) => b.id === bookId);

    if (bookIndex === -1) {
      return res.status(404).json({ error: "Book not found" });
    }

    const book = books[bookIndex];

    if (book.userId !== userId) {
      return res
        .status(403)
        .json({ error: "Unauthorized to delete this book" });
    }

    books.splice(bookIndex, 1);
    writeJsonFile("books.json", books);

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (err) {
    console.error("Error deleting book:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
  