import AuthErrors from "./AuthErrors";
import {
  validateCredentials
} from "../../schemas/credentialsSchema";
import {validateUser} from "../../schemas/userSchema";

export type User = {
  "email": string,
  "fullName": string,
  "birthday": string,
  "height": number,
  "sport": string,
  "newsletter": boolean
}

export type CreateUserParameters = User & {
  password: string;
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
      return new Promise<User>((resolve) => {
        // TODO: get the user attributes and return data without the password
        const {
          email,
          fullName,
          birthday,
          height,
          sport,
          newsletter
        } = params

        return resolve({
          email,
          fullName,
          birthday,
          height,
          sport,
          newsletter
        });
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
