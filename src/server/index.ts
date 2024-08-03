import express from 'express';
import { makeSignUpController } from '../factories/makeSignUpController';
import { makeSignInController } from '../factories/makeSignInController';

const app = express();

app.use(express.json());

app.post('/sign-up', async (request, response) => {
  const signUpController = makeSignUpController();

  const { statusCode, body } = await signUpController.handle({
    body: request.body,
  });

  response.status(statusCode).json(body);
});

app.post('/sign-in', async (request, response) => {
  const signInController = makeSignInController();

  const { statusCode, body } = await signInController.handle({
    body: request.body,
  });

  response.status(statusCode).json(body);
});

app.listen(6969, () => {
  console.log('Server started at http://localhost:6969');
});
