import type { Handler } from "@netlify/functions";
import jwt from "jsonwebtoken";

import { api } from "../common/api";
import { HASURA_CLAIMS, HASURA_USER_ID, getTokenData } from "../common/jwt";

export const handler: Handler = async (event, context) => {
  const { headers } = event;
  const authHeader = headers["authorization"];

  if (!authHeader) {
    return {
      statusCode: 403,
      body: JSON.stringify({ message: "Forbidden" }),
    };
  }

  const [_, authToken] = authHeader.split(" ");
  const adminObj = getTokenData(authToken);
  const adminId = adminObj[HASURA_CLAIMS][HASURA_USER_ID];

  const data = await api.AdminGetMe(
    {
      id: adminId,
    },
    {
      "x-hasura-admin-secret": "myadminsecretkey",
    }
  );
  console.log(
    "🚀 ~ consthandler:Handler= ~ data.admin_by_pk?.username:",
    data.admin_by_pk?.username
  );

  return {
    body: JSON.stringify({ id: adminId, username: data.admin_by_pk?.username }),
    statusCode: 200,
  };
};
