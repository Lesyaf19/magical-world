import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.post("/potion", async (req, res) => {
    try {
        const response = await axios.get("https://api.potterdb.com/v1/potions");
        const array = response.data.data;
        
        const randPos = Math.floor(Math.random() * array.length);
       
        res.render("index.ejs", { content: array[randPos] });
    } catch (error) {
        console.error("Failed to make request:", error.message);
        res.render("index.ejs", { errorP: "Oops, something went wrong" });
        
    }
});

app.post("/spell", async (req, res) => {
    try {
        const response = await axios.get("https://api.potterdb.com/v1/spells");
        const array = response.data.data;
        
        const randPos = Math.floor(Math.random() * array.length);
       
        res.render("index.ejs", { info: array[randPos] });
    } catch (error) {
        console.error("Failed to make request:", error.message);
        res.render("index.ejs", { errorS: "Oops, something went wrong" });
        
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});