import express from 'express';
import { SignUpController } from '../app/controllers/SignUpController';
import { SignUpUseCase } from '../app/useCases/SignUpUseCase';
import { SignInController } from '../app/controllers/SignInController';
import { SignInUseCase } from '../app/useCases/SignInUseCase';

const app = express();

app.use(express.json());

app.post('/sign-up', async (request, response) => {
  const SALT = 10;
  const signUpUseCase = new SignUpUseCase(SALT);
  const signUpController = new SignUpController(signUpUseCase);

  const { statusCode, body } = await signUpController.handle({
    body: request.body,
  });

  response.status(statusCode).json(body);
});

app.post('/sign-in', async (request, response) => {
  const signInUseCase = new SignInUseCase();
  const signInController = new SignInController(signInUseCase);

  const { statusCode, body } = await signInController.handle({
    body: request.body,
  });

  response.status(statusCode).json(body);
});

app.listen(6969, () => {
  console.log('Server started at http://localhost:6969');
});
