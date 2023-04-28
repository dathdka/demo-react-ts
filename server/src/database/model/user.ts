import { JSONSchema, Model } from "objection";

class user extends Model {
  id!: string;
  name!: string;
  phone!: string;
  email!: string;
  password!: string;
  address!: string;
  dob! : string;
  image? : string;
  admin?: boolean;

  static tableName: string = "users";

  static jsonSchema: JSONSchema = {
    type: "object",
    required: ["email", "password", "name", "phone", "address"],
    properties: {
      id: { type: "string" },
      name: { type: "string", minLength: 4, maxLength: 25 },
      phone: { type: "string", minLength: 8, maxLength: 12 },
      email: { type: "string", minLength: 6, maxLength: 40 },
      password: { type: "string" },
      address: { type: "string", minLength: 5, maxLength: 50 },
      dob: {type:'string'},
      image : {type: 'string'},
      admin: { type: "boolean" },
    },
  };
}

export default user;
