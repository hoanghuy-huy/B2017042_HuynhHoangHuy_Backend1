const express = require("express");
const cors = require("cors");
const contactRouter = require("./app/routes/contact.route");
const ApiError = require("./app/api-error");
const app = express();



app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactRouter);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the contact book application." });
});

app.get("/api/contacts/favorite", (req, res) => {
  res.json({ message: "Welcome to Favorites" });
});

// Handler for 404 response
app.use((req, res, next) => {
  const error = new ApiError("Resource not found", 404);
  next(error);
});

app.use((error, req, res, next) => {
  if (error.status === 404) {
    res.status(404).json({
      message: error.message,
    });
  } else {
    // Handle other errors
    next(error);
  }
});

// Define error-handling middleware last, after other app.use() and routes calls
app.use((error, req, res, next) => {
  // Centralized error-handling middleware
  // In route handlers, calling next(error) will transfer to this error-handling middleware
  return res.status(error.status || 500).json({
    message: error.message || "Internal Server Error",
  });
});

module.exports = app;