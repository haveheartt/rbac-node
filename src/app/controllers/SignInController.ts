import { ZodError, z } from 'zod';

import { IController, IRequest, IResponse } from "../interfaces/IController";
import { SignUpUseCase } from '../useCases/SignUpUseCase';
import { InvalidCredentials } from '../errors/InvalidCredentials';

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email().min(1),
  password: z.string().min(8),
});

export class SignInController implements IController {
  constructor(private readonly signUpUseCase: SignUpUseCase) {}

  async handle({ body } : IRequest): Promise<IResponse> {
    try {
      const { name, email, password } = schema.parse(body);

      await this.signUpUseCase.execute({ email, name, password });

      return {
        statusCode: 204,
        body: null,
      };
    } catch (error) {
      if (error instanceof ZodError) {
        return {
          statusCode: 400,
          body: error.issues,
        };
      }

      if (error instanceof InvalidCredentials) {
        return {
          statusCode: 401, //unauthorized
          body: {
            error: 'Invalid Credentials.',
          },
        };
      }

      throw error;
    }

  }

}