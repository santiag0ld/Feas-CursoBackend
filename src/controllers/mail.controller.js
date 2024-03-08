import generateHtml from "../utils/generateHtml.js";
import { sendMail } from "../middleware/sendMail.js";
import { logger } from "../utils/logger.js";

class MailController {
  constructor() {}

  send = async (req, res, next) => {
    try {
      const { detail, products } = req.body;
      const user = req.user;

      const to = user.email;
      const subject = 'Detalle de tu Compra';
      const htmlContent = generateHtml(detail, products);

      await sendMail(to, subject, htmlContent);

      res.sendSuccess('Email enviado exitosamente');

      const handleEmailSendingSuccess = () => {

        logger.info('Email sent successfully!');
      };

      handleEmailSendingSuccess();

    } catch (error) {
      next(error);
    }
  }
}

export default MailController;
