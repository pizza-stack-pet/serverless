import type { Handler } from "@netlify/functions";
import { GraphQLClient } from "graphql-request";
import jwt from "jsonwebtoken";
import crypto from "crypto";

import { getSdk } from "../common/sdk";

interface AdminRegisterInput {
  username: string;
  password: string;
}

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
  const hashedPassword = crypto
    .pbkdf2Sync(input.password, "mysaltsecret", 1000, 64, "sha512")
    .toString("hex");

  const sdk = getSdk(new GraphQLClient("http://localhost:8080/v1/graphql"));
  const data = await sdk.InsertAdmin({
    username: input.username,
    password: hashedPassword,
  });

  const accessToken = jwt.sign(
    {
      "https://hasura.io/jwt/claims": {
        "x-hasura-allowed-roles": ["admin"],
        "x-hasura-default-role": "admin",
        "x-hasura-user-id": data.insert_admin_one?.id,
      },
    },
    "myjwtsecret"
  );

  return {
    body: JSON.stringify({ accessToken }),
    statusCode: 200,
  };
};
