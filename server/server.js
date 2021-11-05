const express = require("express");
const app = express();
const PORT = 3001;
const cors = require("cors");

app.use(express.json());
app.use(cors());

const db = require("./models");

// Post Router
const postRouter = require("./routes/Posts")
app.use("/posts", postRouter);
// Comments Router
const commentsRouter = require("./routes/Comments")
app.use("/comments", commentsRouter);


db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on localhost:${PORT}`)
    })
});