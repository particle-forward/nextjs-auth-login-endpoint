import {ApiHandler} from "../global";

const IS_LOCAL = process.env.NEXT_PUBLIC_IS_LOCAL || "";

interface WithSession {
  // TODO: add session data
  user: {
    email: string
  }
}

export function withSession<T extends WithSession>(
  handler: ApiHandler<T>
): ApiHandler<T> {
  return (req, res) => {
    return new Promise<void>((resolve) => {
      // TODO: check auth token in cookie or header,
      //  if it's not set:
      //  - unset cookie
      const error = false
      if (error) {
        // show a log in dev mode
        IS_LOCAL &&
        console.error(
          `Error: failed to parse session, removing cookie`,
          error
        );

        // prevent request from continuing
        res.status(401).send(error);

        // next js send a 500 on reject so we have to resolve() to
        // prevent writing to a closed socket / stream
        return resolve();
      }
      return resolve(handler(req, res));
    })
  }
}
