import { SignInController } from "../app/controllers/SignInController";
import { makeSignInUseCase } from "./makeSignInUseCase";

export function makeSignInController() {
  const signInUseCase = makeSignInUseCase();
  return new SignInController(signInUseCase);
}
