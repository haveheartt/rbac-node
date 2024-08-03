import express from 'express';
import { SignUpController } from '../app/controllers/SignUpController';
import { SignUpUseCase } from '../app/useCases/SignUpUseCase';

const app = express();

app.get('/sign-up', (request, response) => {
  const SALT = 10;
  const signUpUseCase = new SignUpUseCase(SALT);
  const signUpController = new SignUpController(signUpUseCase);
});

app.listen(6969, () => {
  console.log('Server started at http://localhost:6969');
});
