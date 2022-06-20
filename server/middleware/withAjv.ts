import Ajv from "ajv";
import addFormats from "ajv-formats"
import {NextApiRequest} from "next";
import {ApiHandler} from "../global";

const IS_LOCAL = process.env.NEXT_PUBLIC_IS_LOCAL || "";

export const ajv = new Ajv({
  allErrors: true,
  // jsPropertySyntax: true, // TODO: check new var
  removeAdditional: "all",
});

addFormats(ajv);

export type SchemaConfig = {
  param: "body" | "query";
  schema: {
    [key: string]: any;
  };
};

export function withAjv<T extends NextApiRequest>(
  config: SchemaConfig,
  handler: ApiHandler<T>
): ApiHandler<T> {
  return async (req, res) => {
    const isValid = ajv.validate(config.schema, req[config.param]);
    if (!isValid) {
      // TODO: log the error somewhere
      IS_LOCAL &&
      console.error(
        `Invalid request ${req.method} ${req.url} with \n${JSON.stringify(
          req.body || req.query || {},
          null,
          2
        )}\nerrors:\n${JSON.stringify(ajv.errors, null, 2)}`
      );

      return res.status(400).send(errorResponse(ajv.errors));
    }
    return handler(req, res);
  };
}

export default withAjv;

/**
 * Format error responses
 * @param  {Object} schemaErrors - array of json-schema errors, describing each validation failure
 * @return {String} formatted api response
 */
function errorResponse(schemaErrors) {
  const errors = schemaErrors.map((error) => {
    return {
      path: error.dataPath,
      message: error.message,
    };
  });
  return {
    status: "failed",
    errors: errors,
  };
}
