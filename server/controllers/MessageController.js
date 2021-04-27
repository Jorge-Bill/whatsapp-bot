import dotenv from "dotenv";
import twilio from "twilio";

dotenv.config();

const { SID: accountSid, KEY: TwilloAuthToken } = process.env;
const client = twilio(accountSid, TwilloAuthToken); 

/**
 * @class MessageController
 * @description class will implement functionality of send messages
 */

class MessageController {
  /**
   * @memberof MessageController
   * @param {object} req - Request sent to the route
   * @param {object} res - Response sent from the controller
   * @param {object} next - Error handler
   * @returns {object} - object representing response message
   */
   static async sendMessage(req, res, next) {
   const sender = req.body.sender
   const recipient = req.body.recipient
   const message = req.body.message

    try {
    client.messages 
      .create({ 
         body: message.toString(), 
         from: `whatsapp:+${sender}`,      
         to: `whatsapp:+${recipient}` 
       }) 
      .then(message => () => {
        console.log(message.sid)
        return res.status(200)
      }) 
      .done();
    }
    
    catch (error) {
      return next(error);
    }
  }
}

export default MessageController;