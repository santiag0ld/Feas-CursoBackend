import generateHtml from "../utils/generateHtml.js";
import { sendConfirmationMail, sendPasswordResetEmail } from "../middleware/sendMail.js";
import { logger } from "../utils/logger.js";

class MailController {
  constructor() {}

  async send(req, res, next) {
    try {
      const { detail, products } = req.body;
      const user = req.user;

      const to = user.email;
      const subject = 'Detalle de tu Compra';
      const htmlContent = generateHtml(detail, products);

      await sendConfirmationMail(to, subject, htmlContent);

      logger.info('Email sent successfully!');
      res.sendSuccess('Email enviado exitosamente');
    } catch (error) {
      next(error);
    }
  }

  async sendPasswordReset(req, res, next) {
    try {
      const { email, token, newPassword } = req.body;

      const currentTime = new Date();
      if (new Date(token.expiryTime) < currentTime) {
        return res.sendError('Password reset link has expired');
      }

      if (newPassword === req.user.password) {
        return res.sendError('New password must be different from the old one');
      }

      await sendPasswordResetEmail(email, token);

      logger.info('Password reset email sent successfully!');
      res.sendSuccess('Password reset email sent successfully!');
    } catch (error) {
      next(error);
    }
  }
}

export default MailController;
