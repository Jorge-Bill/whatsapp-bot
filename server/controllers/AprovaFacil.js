import dotenv from "dotenv";

dotenv.config();

const {
  SID: accountSid,
  KEY: TwilloAuthToken,
  BOTNUMBER: botNumber
} = process.env;

const client = require('twilio')(accountSid, TwilloAuthToken);

/**
 * @class AprovaFacil
 * @description class will implement bot conversation
 */
class AprovaFacil {
  /**
   * @memberof AprovaFacil
   * @param {object} req - Request sent to the route
   * @param {object} res - Response sent from the controller
   * @param {object} next - Error handler
   * @returns {object} - object representing response message
   */
  static async flowManager(req, res, next) {
    const receivedMessage = req.body.Body.toLowerCase().trim();
    
    const user = [['oi', 'ola', 'oiii', 'olá'], ['quero fazer um pedido', 'quero pedir uma pizza'], ['1', '2', '3', '4'], ['sim', 'não']];
    const bot = [['olá, tudo bem? como posso te ajudar?'], ['ótimo, vou te mandar o cardápio para você escolher o sabor', '1 - peperoni \n 2 - marguerita \n 3 - portuguesa'], [`você escolheu a opção ${receivedMessage}, confirma?`], ['ok pedido confirmado, em breve será enviado', 'deseja refazer o pedido ou encerrar?']];

    try {
      if(user[0].includes(receivedMessage)) {
        AprovaFacil.sendMessages([bot[0][0]], res);
        return
      }
      
      if(user[1].includes(receivedMessage)) {
        AprovaFacil.sendMessages([bot[1][0]], res);
        AprovaFacil.sendMessages([bot[1][1]], res);
        return
      }

      if(user[2].includes(receivedMessage)) {
        AprovaFacil.sendMessages([bot[2][0]], res);
        return
      }

      if(user[3].includes(receivedMessage)) {
        switch (receivedMessage) {
          case user[3][0]:
            AprovaFacil.sendMessages([bot[3][0]], res);
            break;

          case user[3][1]:
            AprovaFacil.sendMessages([bot[3][1]], res);
            break;
        
          default:
            break;
            
        }
        return
        
      } 
      
      AprovaFacil.sendMessages(['não entendi o que você quiz dizer, então vou falar com um humano'], res);
      AprovaFacil.sendMessages(['o cliente perguntou: \n'+receivedMessage], res);

    } catch (error) {
      return AprovaFacil.sendMessages([error.message], res);
    }
  }

  static async sendMessages(msgs, res, recipient = '5511984224753', sender = '14155238886') {
   try {
    msgs.forEach(msg => {
      client.messages
      .create({
         from: `whatsapp:+${sender}`,
         body: msg,
         to: `whatsapp:+${recipient}`
       })
      .then(message => console.log(message.sid));
    });
   } catch (error) {
    AprovaFacil.sendMessages([error.message], res)
   }
  }
}



export default AprovaFacil;
