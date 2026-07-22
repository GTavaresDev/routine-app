import bcrypt from "bcryptjs";

export interface IUserExampleService {
  hashPassword(password: string): Promise<string>;
  normalizeEmail(email: string): string;
}

export class UserExampleService implements IUserExampleService {
  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  normalizeEmail(email: string): string {
    return email.trim().toLowerCase();
  }
}
