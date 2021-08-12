import { Injectable } from '@nestjs/common';
import { randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);

@Injectable()
export class PasswordService {
  async toHash(password: string): Promise<string> {
    const salt = randomBytes(8).toString('hex');
    const hashedPassword = await this.computeHash(password, salt);
    return `${hashedPassword}.${salt}`;
  }

  async isCorrect(
    storedPassword: string,
    suppliedPassword: string,
  ): Promise<boolean> {
    const [hashedPassword, salt] = storedPassword.split('.');
    const suppliedPasswordHash = await this.computeHash(suppliedPassword, salt);
    return hashedPassword === suppliedPasswordHash;
  }

  async computeHash(password: string, salt: string) {
    const buffer = (await scryptAsync(password, salt, 64)) as Buffer;
    return buffer.toString('hex');
  }
}
