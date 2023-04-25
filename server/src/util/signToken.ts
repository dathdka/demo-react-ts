import jwt from 'jsonwebtoken'
import user from '../database/model/user';
export const signToken = (account: user) => {
    return jwt.sign(
      {
        id: account.id,
        email: account.email,
        name: account.name,
        admin: account.admin,
      },
      `${process.env.JWT_SECRETKEY}`,
      {
        expiresIn: "30d",
      }
    );
  };