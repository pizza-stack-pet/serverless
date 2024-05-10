import jwt from "jsonwebtoken";

export const signJwtToken = (id: string) => {
  return jwt.sign(
    {
      "https://hasura.io/jwt/claims": {
        "x-hasura-allowed-roles": ["admin"],
        "x-hasura-default-role": "admin",
        "x-hasura-user-id": id,
      },
    },
    "eHRYy7R899rwv8UgMvZjJ1MuTMu56C5E"
  );
};
