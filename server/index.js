import express from "express";

const app = express();

app.listen(3000, () => console.log("server started at port 3000"));

app.get("/", (req, res) => {
    res.json({message:"Hello world"})
});
