import type { Handler } from "@netlify/functions";

import { api } from "../common/api";
import { hashPassword } from "../common/password";
import { signJwtToken } from "../common/jwt";

import { AdminLoginInput } from "../common/sdk";

const invalidUserOrPassword = {
  statusCode: 404,
  body: JSON.stringify({ message: "User not found or password invalid" }),
};

export const handler: Handler = async (event, context) => {
  const { body } = event;

  const input: AdminLoginInput = JSON.parse(body!).input.admin;
  const hashedPassword = hashPassword(input.password);

  const data = await api.GetAdminByUsername(
    {
      username: input.username,
    },
    {
      "x-hasura-admin-secret": "myadminsecretkey",
    }
  );

  if (!data.admin.length) {
    return invalidUserOrPassword;
  }

  if (hashedPassword !== data.admin[0].password) {
    return invalidUserOrPassword;
  }

  const accessToken = signJwtToken(data.admin[0].id);

  return {
    body: JSON.stringify({ accessToken }),
    statusCode: 200,
  };
};
