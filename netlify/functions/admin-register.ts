import type { Handler } from "@netlify/functions";

import { api } from "../common/api";
import { hashPassword } from "../common/password";
import { signJwtToken } from "../common/jwt";

import { AdminRegisterInput } from "../common/sdk";

export const handler: Handler = async (event, context) => {
  const { body, headers } = event;

  if (
    !headers["x-pizzastack-secret-key"] ||
    headers["x-pizzastack-secret-key"] !== "mypizzastacksecretkey"
  ) {
    return {
      body: JSON.stringify({
        message:
          "x-pizzastack-secret-key header is missing or value is invalid",
      }),
      statusCode: 403,
    };
  }

  const input: AdminRegisterInput = JSON.parse(body!).input.admin;
  const hashedPassword = hashPassword(input.password);

  const data = await api.InsertAdmin(
    {
      username: input.username,
      password: hashedPassword,
    },
    {
      "x-hasura-admin-secret": "myadminsecretkey",
    }
  );

  const accessToken = signJwtToken(data.insert_admin_one?.id);

  return {
    body: JSON.stringify({ accessToken }),
    statusCode: 200,
  };
};
