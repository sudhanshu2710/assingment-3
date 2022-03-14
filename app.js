const express = require("express");
const fs = require("fs");

const Books = JSON.parse(fs.readFileSync(`${__dirname}/db.json`));
const app = express();
const router = express.Router();
app.use(express.json());
app.use((req, res, next) => {
  req.api_requested_by = "Sudhanshu Singh";
  next();
});
app.use("/", router);

const getAllBooks = (req, res) => {
  // console.log(req.api_requested_by);
  const api_requested_by = req.api_requested_by;
  res.status(200).json({
    api_requested_by,
    Books,
  });
};
const getBook = (req, res) => {
  const id = req.params.id * 1;
  const Book = Books.find((el) => el.id === id);
  const api_requested_by = req.api_requested_by;
  //console.log("this is tour", tour);
  res.status(200).json({
    api_requested_by,
    Book,
  });
};
const addBook = (req, res) => {
  //console.log(req.body);
  const api_requested_by = req.api_requested_by;
  const newId = Books[Books.length - 1].id + 1;
  const newUser = Object.assign({ id: newId }, req.body);
  Books.push(newUser);
  fs.writeFile(`${__dirname}/db.json`, JSON.stringify(Books), (err) => {
    res.status(201).json({
      api_requested_by,
      Books,
    });
  });
};
const updateBook = (req, res) => {
  const id = req.params.id * 1;
  const Book = Books.find((el) => el.id === id);
  const api_requested_by = req.api_requested_by;
  const newUser = Object.assign(Book, req.body);

  fs.writeFile(`${__dirname}/db.json`, JSON.stringify(Books), (err) => {
    res.status(201).json({
      api_requested_by,
      Books,
    });
  });
};
const deleteBook = (req, res) => {
  const id = req.params.id * 1;
  const api_requested_by = req.api_requested_by;
  Books.splice(id - 1, 1);
  fs.writeFile(`${__dirname}/db.json`, JSON.stringify(Books), (err) => {
    res.status(201).json({
      api_requested_by,
      data: null,
    });
  });
};

router.route("/books").get(getAllBooks).post(addBook);
router.route("/books/:id").get(getBook).patch(updateBook).delete(deleteBook);
const port = 3000;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
