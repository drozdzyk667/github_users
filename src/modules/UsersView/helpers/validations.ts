import * as yup from "yup";
import { usernameRegex } from "./matchers";

export const schema = yup.object({
  username: yup
    .string()
    .min(3, "Username is too short, at least 3 chars")
    .required("Username is required")
    .matches(usernameRegex, "Invalid char"),
});
