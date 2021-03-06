const express = require('express');
const { body, validationResult } = require('express-validator');
const Feedback = require('./models/Feedback');
const send_mail = require('./utils/sendmail');
const connectDB = require('./db/db_connection');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();


const app = express();
app.use(cors());
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
}).post('/feedback',body('email').isEmail(),async (req,res)=>{
    const {name,email,message} = req.body;
    const feedback = new Feedback({name,email,message});
    await feedback.save();
    const mailsend = await send_mail(name,message);


    const errors = validationResult(req);
   
    if (!errors.isEmpty()) {
      return res.status(200).json({ status:'error',message: errors.array()});
    }

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