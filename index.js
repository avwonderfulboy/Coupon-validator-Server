const express = require('express');
const connectToDB = require('./db/connectToDB');
const cors = require('cors')
const app = express();
const PORT = 8000

app.use(cors());

app.use(express.json())
//db connection 
connectToDB();
//routes
app.use('/api', require('./routes/couponRouter'));

app.listen(PORT, () => {
    console.log(`Connection to server http://localhost:${PORT}`);
})