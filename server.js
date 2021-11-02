const express = require("express");
const app = express();
const PORT = 3001;
const cors = require("cors");

app.use(express.json());
app.use(cors());

const db = require("./server/models");

// Routers
const PostRouter = require("./server/routes/Posts")
app.use("/posts", PostRouter);

db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on localhost:${PORT}`)
    })
})
