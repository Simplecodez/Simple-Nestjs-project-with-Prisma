import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { Prisma, User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  // Registers a new user after hashing the password
  async register(createUserInput: Prisma.UserCreateInput) {
    const hashedPassword = await this.hashPassword(createUserInput.password);
    return this.userService.createUser({
      ...createUserInput,
      password: hashedPassword,
    });
  }

  // Finds a user by their ID
  async findUserById(id: string): Promise<any> {
    return this.userService.findUniqueUserWhere({ id });
  }

  // Validates user credentials during login
  async validateUser(
    email: string,
    password: string,
  ): Promise<
    Omit<User, 'password' | 'createdAt' | 'updatedAt' | 'biometricKey'>
  > {
    const user = await this.userService.findUniqueUserWhere({ email });

    if (!user) throw new UnauthorizedException('Incorrect email or password');

    if (!user || !(await this.comparePasswords(password, user.password))) {
      throw new UnauthorizedException('Incorrect email and password');
    }
    return user;
  }

  // Issues a JWT after successful login
  async login(user: Partial<User>) {
    const payload = { sub: user.id, username: user?.email };
    return {
      access_token: this.jwtService.sign(payload),
      id: user.id as string,
    };
  }

  // Saves a biometric public key to the user record
  async addBiometricKey(userId: string, biometricKey: string) {
    await this.userService.updateUser({ id: userId }, { biometricKey });
    return 'Biometric login setup successfully';
  }

  // Authenticates a user via their biometric key
  async verifyBiometricKey(biometricKey: string) {
    const user = await this.userService.findUserWhere({
      biometricKey,
    });

    if (!user) throw new UnauthorizedException('Invalid credentials');

    return this.login(user);
  }

  // Compares raw password with hashed password
  private async comparePasswords(candidatePassword, encryptedPassword) {
    return bcrypt.compare(candidatePassword, encryptedPassword);
  }

  // Hashes a plain password using bcrypt
  private async hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }
}
