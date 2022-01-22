const express = require('express');

const Feedback = require('./models/Feedback');
const send_mail = require('./utils/sendmail');
const connectDB = require('./db/db_connection');



const app = express();
app.use(express.json());

const port = process.env.PORT || 5000;


connectDB().then((connected)=>{
    if(connected){
        console.log('Connected to DB');
    }
    else{
        console.log('Not Connected to DB');
    }
})

app.get('/', async (req, res) => {

    const feedbacks = await Feedback.find({});
    res.send(feedbacks);
}).post('/feedback',async (req,res)=>{
    const {name,email,message} = req.body;
    const feedback = new Feedback({name,email,message});
    await feedback.save();
    const mailsend = await send_mail(email,name,message);
    if(mailsend){
        res.send({
            status: 'success',
            message: 'Thanks for your feedback'
        });
    }
    else{
        res.send({
            status: 'error',
            message: 'Error in sending Feedback'
        });
    }
})


app.listen(port, () => console.log(`Listening on port ${port}`));