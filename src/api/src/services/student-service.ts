import { User } from "../data/models";

export class UserService {
  constructor() {}
/* 
  async create(user: User): Promise<any> {
    let existing = await this.db("users").where({ email: user.email }).count("email as cnt");

    console.log("EXISST", existing);

    if (existing[0].cnt > 0) return undefined;

    return await this.db("users").insert(user);
  }

  async update(email: string, item: any) {
    return this.db("users").where({ email }).update(item);
  }

  async getBySub(sub: string): Promise<User | undefined> {
    return this.db("users").where({ sub }).first();
  } */
}
