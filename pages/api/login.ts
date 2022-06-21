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
  withErrorHandler(async (req, res) => {
    const {email, password, fullName, birthday, height, sport, newsletter} =
      req.body;

    const user = await AuthService.createUser({
      email,
      password,
      fullName,
      birthday,
      height,
      sport,
      newsletter,
    });

    // create session when account is made
    return res.json({
      success: true,
      // TODO: return some login token and user data needed by frontend
      user,
    });
  }, AuthErrors)
);

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    return createUser(req, res);
  } else {
    return res.status(404).end();
  }
};

export default handler
