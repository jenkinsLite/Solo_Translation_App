const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, '../public')));

app.post("/api/translate", (req, res) => {

    console.log("got Here to the server", req.body)

    res.status(200).send(JSON.stringify({request: req.body}))
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
