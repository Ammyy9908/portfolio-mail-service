const mongoose = require('mongoose');


const connectDB = async () => {
    try{
        const connected = await mongoose.connect('mongodb+srv://Sumit:2146255sb8@cluster0.0wij2.mongodb.net/portfolioFeedback',{
            useNewUrlParser: true,
            
        });
        return connected;
    }
    catch(err){
        return false;
    }
}

module.exports = connectDB;