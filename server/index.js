import express from "express";
import { PORT } from "./config.js";

const app = express();

app.get('/', (req, res) => {
    res.send('ola');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
