import { SignInUseCase } from "../app/useCases/SignInUseCase";

export function makeSignInUseCase() {
  return new SignInUseCase();
}
