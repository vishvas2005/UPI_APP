const express = require('express');
const path = require('path'); 
const cors = require('cors');
const mainRouter = require("./routes/indexroute");
const app = express();


const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api" , mainRouter);
const buildPath = path.join(__dirname, 'client', 'build');


app.use(express.static(buildPath));

app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});