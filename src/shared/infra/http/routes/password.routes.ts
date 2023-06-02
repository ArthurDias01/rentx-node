import { ResetPasswordUserController } from '@modules/accounts/useCases/resetPasswordUser/ResetPasswordUserController';
import { SendForgotPassowrdMailController } from '@modules/accounts/useCases/sendForgotPasswordMail/SendForgotPassowrdMailController';
import { Router } from 'express';

const passwordRoutes = Router();
const sendForgotPassowrdMailController = new SendForgotPassowrdMailController();
const resetPassowrdMailController = new ResetPasswordUserController();

passwordRoutes.post('/forgot', sendForgotPassowrdMailController.handle);
passwordRoutes.post('/reset', resetPassowrdMailController.handle);

export { passwordRoutes };
