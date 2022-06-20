import AuthErrors from "./AuthErrors";
import {
  validateCredentials
} from "../../schemas/credentialsSchema";
import {validateUser} from "../../schemas/userSchema";

export type CreateUserParameters = {
  "email": string,
  "password": string,
  "fullName": string,
  "birthday": string,
  "height": number,
  "sport": string,
  "newsletter": boolean
}

class AuthService {
  public async createUser(params: CreateUserParameters) {

    if (!validateCredentials({...params})) {
      // TODO: log error somewhere
      console.log('validateCredentials.errors', validateCredentials.errors);
      return Promise.reject(AuthErrors.INVALID_PWD);
    }

    if (!validateUser({...params})) {
      // TODO: log error somewhere
      console.log('validateUser.errors, params', validateUser.errors, params);
      return Promise.reject(AuthErrors.INVALID_USR);
    }

    try {
      // TODO: create user on database and retrieve user data, necessary tokens, etc
      return new Promise<CreateUserParameters>((resolve) => {
        // TODO: delete user password from the response
        return resolve(params);
      })
    } catch (error) {
      // TODO: validation checks:
      //  - duplication error
      //  - database connection or other issues
      //  - etc
      if (error === "some check") {
      } else {
        throw AuthErrors.UNKNOWN_ERROR;
      }
    }

    return params
  }
}

export default new AuthService()
