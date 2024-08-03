import { ZodError, z } from 'zod';

import { IController, IRequest, IResponse } from "../interfaces/IController";
import { SignInUseCase } from '../useCases/SignInUseCase';
import { AccountAlreadyExists } from '../errors/AccountAlreadyExists';

const schema = z.object({
  email: z.string().email().min(1),
  password: z.string().min(8),
});

export class SignUpController implements IController {
  constructor(private readonly signInUseCase: SignInUseCase) {}

  async handle({ body } : IRequest): Promise<IResponse> {
    try {
      const { email, password } = schema.parse(body);

      const { accessToken } = await this.signInUseCase.execute({ email, password });

      return {
        statusCode: 200,
        body: {
          accessToken,
        },
      };
    } catch (error) {
      if (error instanceof ZodError) {
        return {
          statusCode: 400,
          body: error.issues,
        };
      }

      if (error instanceof AccountAlreadyExists) {
        return {
          statusCode: 409, //conflict
          body: {
            error: 'This email is already in use.',
          },
        };
      }

      throw error;
    }

  }

}
