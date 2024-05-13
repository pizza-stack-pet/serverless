import type { Handler } from "@netlify/functions";

import { getAdminFromHeaders } from "../common/get-admin-from-headers";
import { GetAdminByIdQuery } from "../common/sdk";

export const handler: Handler = async (event, context) => {
  const { headers } = event;

  let admin: GetAdminByIdQuery;

  try {
    admin = await getAdminFromHeaders(headers);
  } catch (error) {
    return JSON.parse(error.message);
  }

  return {
    body: JSON.stringify({
      id: admin.admin_by_pk?.id,
      username: admin.admin_by_pk?.username,
    }),
    statusCode: 200,
  };
};
