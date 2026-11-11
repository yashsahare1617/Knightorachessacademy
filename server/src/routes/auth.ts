import { Router } from 'express';
import {
  register,
  login,
  logout,
  refreshToken,
  getMe,
  getLoginHistory,
  registerValidators,
  loginValidators,
} from '../controllers/authController';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

router.post('/register', registerValidators, register);
router.post('/login', loginValidators, login);
router.post('/refresh', refreshToken);
router.post('/logout', authenticate, logout);
router.get('/me', authenticate, getMe);
router.get('/login-history', authenticate, authorize('admin'), getLoginHistory);

export default router;
