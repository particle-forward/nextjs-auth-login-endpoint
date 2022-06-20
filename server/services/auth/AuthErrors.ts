import {GlobalErrors} from "../../global";

enum AuthErrorsEnum {
  ACCOUNT_CREATION_FAILED = "ACCOUNT_CREATION_FAILED",
  ALIAS_TOO_LONG = "ALIAS_TOO_LONG",
  ALREADY_CONFIRMED = "ALREADY_CONFIRMED",
  EXISTING_USER = "EXISTING_USER",
  ERROR_SENDING_EMAIL = "ERROR_SENDING_EMAIL",
  INVALID_CREDENTIALS = "INVALID_CREDENTIALS",
  INVALID_PASSWORD = "INVALID_PASSWORD",
  INVALID_PWD = "INVALID_PWD",
  INVALID_USR = "INVALID_USR",
  LIMIT_REACHED = "ALIAS_TOO_LONG",
  NO_ALIAS = "NO_ALIAS",
}

const AuthErrors = {
  ...AuthErrorsEnum,
  ...GlobalErrors,
};

export default AuthErrors;
