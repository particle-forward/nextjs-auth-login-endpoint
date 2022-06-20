import {NextApiResponse} from "next";

export type ApiHandler<T> = {
  (req: T, res: NextApiResponse): Promise<void> | void;
};

export enum GlobalErrors {
  MISSING_DATA = "MISSING_DATA",
  NOT_FOUND = "NOT_FOUND",
  NO_MATCH = "NO_MATCH",
  UNAUTHORIZED = "UNAUTHORIZED",
  UNKNOWN_ERROR = "UNKNOWN_ERROR",
  USER_NOT_FOUND = "USER_NOT_FOUND",
}
