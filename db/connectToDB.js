
const mongoose = require('mongoose')

const url = `mongodb+srv://anshumanSingh:vjoQd83a2VFOYCqi@cluster0.tfxuu.mongodb.net/coupon-code?retryWrites=true&w=majority`;

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


