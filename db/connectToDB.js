
const mongoose = require('mongoose')

const url = process.env.DB;

const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true 
}

module.exports= connectToDB = ()=>{
mongoose.connect(url,connectionParams)
    .then( () => {
        console.log('Connected to the database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. n${err}`);
    })
}


