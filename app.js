const express = require("express")
const cors = require("cors")
const contactRouter = require("./app/routes/contact.route")
const ApiError = require("./app/api-error")
const app = express()

app.use(cors())
app.use(express.json())
app.use("api/contacts",contactRouter)

app.get("/", (req,res) => {
    res.json({ message : "Welcome to contact book application."})
})

app.get("/api/contacts/favorite", (req, res)=> {
    res.json({ massage : "Welcome to Favorite"})
}) 

//handler 404 respone 
app.use((req, res, next) => {
    const error = new Error('Resource not found');
    error.status = 404;
    next(error);
  });
  
app.use((err, req, res, next) => {
    if (err.status === 404) {
        res.status(404).json({
            message: 'Resource not found',
        });
    } else {
    // Xử lý các lỗi khác
    next(err);
    }
});
// define error-handling middleware last, after other app.use() and routes calls
app.use((err, req, res, next) => {
    // Middleware xử lý lỗi tập trung.
    // Trong các đoạn code xử lý ở các route, gọi next(error)
    // sẽ chuyển về middleware xử lý lỗi này
    return res.status(error.statusCode || 500).json({
        message: error.message || "Internal Server Error",
    });
});
module.exports = app