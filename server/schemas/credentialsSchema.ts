import {ajv, SchemaConfig} from "../middleware/withAjv";
import {JTDDataType} from "ajv/dist/jtd";

export const credentialsSchema: SchemaConfig = {
  param: 'body',
  schema: {
    type: "object",
    properties: {
      email: {type: "string", minLength: 6, maxLength: 200}, // TODO: email validation
      password: {type: "string", minLength: 8, maxLength: 200}
    },
    required: ["email", "password"],
    additionalProperties: false
  }
}

export type CredentialsType = JTDDataType<typeof credentialsSchema.schema>

export const validateCredentials = ajv.compile<CredentialsType>(credentialsSchema.schema)
