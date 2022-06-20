import {NextApiRequest} from "next";
import {ApiHandler, GlobalErrors} from "../global";

const IS_LOCAL = process.env.NEXT_PUBLIC_IS_LOCAL || "";

function withErrorHandler<T extends NextApiRequest>(
  handler: ApiHandler<T>,
  errorEnum: Record<string, string> = {}
): ApiHandler<T> {
  return async (req, res) => {
    try {
      await handler(req, res);
    } catch (e) {
      const err = e as string;
      const errMessage = `Error happened in ${req.method} ${
        req.url
      } with \n${JSON.stringify(req.body || req.query || {}, null, 2)}`;

      if (errorEnum[err]) {
        // TODO: log error somewhere
        IS_LOCAL && console.error(`${errMessage}: ${err}`);
        const statusCode =
          errorEnum[err] === GlobalErrors.UNAUTHORIZED ? 401 : 400;
        return res.status(statusCode).json({
          status: "failed",
          errors: [{path: "", message: errorEnum[errorEnum[err]]}]
        });
      } else {
        // something unexpected happened
        // TODO: log error somewhere
        console.error(errMessage, err);
        res.status(500).end();
      }
    }
  };
}

export default withErrorHandler;
