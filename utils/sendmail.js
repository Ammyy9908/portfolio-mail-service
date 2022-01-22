const sgMail = require('@sendgrid/mail')





const send_mail = async (name,message)=>{
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
        to: 'sb78639@gmail.com', // Change to your recipient
        from: 'reactgraminfo@gmail.com', // Change to your verified sender
        subject: 'Client Feedback from '+name,
        text: message,
        html: `<strong>${message}</strong>`,
      }

      try{
        let issented = await sgMail.send(msg)
        if(issented){
            return true;
        }
      }
      catch(e){
        console.log(e);
          return false;
      }
  
      
}

module.exports = send_mail;