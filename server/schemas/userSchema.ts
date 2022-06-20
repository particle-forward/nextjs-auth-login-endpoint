import {ajv, SchemaConfig} from "../middleware/withAjv";
import {JTDDataType} from "ajv/dist/jtd";

export const userSchema: SchemaConfig = {
  param: 'body',
  schema: {
    type: "object",
    properties: {
      email: {type: "string", format: "email", minLength: 6, maxLength: 200}, // TODO: email validation
      password: {type: "string", minLength: 8, maxLength: 200},
      fullName: {type: "string"},
      birthday: {
        type: "string",
        format: "date",
        // formatMinimum: "1920-01-01",
      },
      height: {type: "number", multipleOf: 0.1, minimum: 0.5, maximum: 2.5},
      sport: {
        type: 'string',
        enum: [
          "soccer",
          "basketball",
          "tennis",
          "baseball",
          "golf",
          "running",
          "volleyball",
          null
        ], nullable: true
      },
      newsletter: {
        type: "boolean"
      }
    },
    required: ["fullName", "birthday", "height", "sport"],
    additionalProperties: false
  }
}

export type UserType = JTDDataType<typeof userSchema.schema>

export const validateUser = ajv.compile<UserType>(userSchema.schema)
