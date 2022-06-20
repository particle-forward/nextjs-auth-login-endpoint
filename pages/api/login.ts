// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import AuthService, {
  CreateUserParameters
} from "../../server/services/auth/AuthService";
import {ApiHandler} from "../../server/global";
import withAjv from "../../server/middleware/withAjv";
import {userSchema} from "../../server/schemas/userSchema";
import withErrorHandler from "../../server/middleware/withErrorHandler";
import AuthErrors from "../../server/services/auth/AuthErrors";

const createUser: ApiHandler<NextApiRequest> = withAjv(
  userSchema,
  withErrorHandler((req, res) => {
    const {
      email,
      password,
      fullName,
      birthday,
      height,
      sport,
      newsletter
    } = req.body;

    return AuthService.createUser({
      email,
      password,
      fullName,
      birthday,
      height,
      sport,
      newsletter
    }).then((payload) => {
      // create session when account is made
      return res.json({
        success: true,
        // TODO: return some login token and user data
        user: payload
      });
    });
  }, AuthErrors)
);

export const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    return createUser(req, res);
  } else if (req.method === "GET") {
    // TODO: implement get user
    // return getAccount(req, res);
    res.status(200).json({name: 'Test'})
  }
  return res.status(404).end();
};
