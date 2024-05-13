import { Handler } from "@netlify/functions";
import { v2 as cloudinary } from "cloudinary";

import { getAdminFromHeaders } from "../common/get-admin-from-headers";
import { GetAdminByIdQuery } from "../common/sdk";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export const handler: Handler = async (event, context) => {
  const { headers } = event;

  let admin: GetAdminByIdQuery;

  try {
    admin = await getAdminFromHeaders(headers);
  } catch (error) {
    return JSON.parse(error.message);
  }

  if (!admin.admin_by_pk?.id) {
    return {
      statusCode: 403,
      body: JSON.stringify({ message: "Forbidden" }),
    };
  }

  const timestamp = Math.round(new Date().getTime() / 1000);
  const publicId = `menu-${timestamp}`;

  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp,
      folder: "menu",
      public_id: publicId,
    },
    process.env.CLOUDINARY_API_SECRET!
  );

  return {
    body: JSON.stringify({
      apiKey: process.env.CLOUDINARY_API_KEY,
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
      signature,
      timestamp,
      publicId,
    }),
    statusCode: 200,
  };
};
