import express from 'express';
const router = express.Router();
import { Book } from "../models/bookModel.js";

router.post("/", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: "send all required fields : title, author, publishYear",
      });
    }

    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear,
    };
    const book = await Book.create(newBook);

    return response.status(201).send(book);
  } catch {
    (error) => {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    };
  }
})
.get("/", async (request, response) => {
  try {
    const books = await Book.find({});

    return response.status(200).json({
      count: books.length,
      data: books,
    });
  } catch {
    (error) => {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    };
  }
})
.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const book = await Book.findById(id);

    return response.status(200).json(book);
  } catch {
    (error) => {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    };
  }
})
.put("/:id", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: "send all required fields : title, author, publishYear",
      });
    }

    const { id } = request.params;
    const result = await Book.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).json({ message: "Book not found" });
    }

    return response.status(200).send({ message: "Book updated successfully" });
  } catch {
    (error) => {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    };
  }
})
.delete("/:id", async (request, response) => {
  const { id } = request.params;

  const result = await Book.findByIdAndDelete(id);

  if (!result) {
    return response.status(404).send({ message: "book not found" });
  }
  return response.status(200).send({ message: "Book deleted successfully" });
});

export { router }
