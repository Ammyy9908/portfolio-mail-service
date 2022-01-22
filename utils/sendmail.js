const sgMail = require('@sendgrid/mail')





const send_mail = async (name,message)=>{
    const api_key = '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';
sgMail.setApiKey(api_key);
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