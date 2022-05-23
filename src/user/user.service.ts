import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateUserInput, GetUserArgs, UpdateUserInput } from './dto';
import { User, UserDocument } from './entities';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(input: CreateUserInput) {
    await this.validateCreateUserData(input);
    const dataDocument = await this.userRepository.create({
      ...input,
      password: await bcrypt.hash(input.password, 10),
    });
    return this.toModel(dataDocument);
  }

  async validateCreateUserData(input: CreateUserInput) {
    try {
      await this.userRepository.findOne({ email: input.email });
      throw new NotFoundException('Email already exists.');
    } catch (err) {}
  }

  async getUser(getuserArgs: GetUserArgs) {
    const dataDocument = await this.userRepository.findOne(getuserArgs);
    return this.toModel(dataDocument);
  }

  async update(id: string, input: UpdateUserInput) {
    const dataDocument = await this.userRepository.findOneAndUpdate(id, input);
    return this.toModel(dataDocument);
  }

  async remove(id: string) {
    const dataDocument = await this.userRepository.remove(id);
    return this.toModel(dataDocument);
  }

  findAll() {
    return this.userRepository.find({});
  }

  async validateUser(email: string, password: string) {
    const userDocument = await this.userRepository.findOne({ email });
    const passwordIsValid = await bcrypt.compare(
      password,
      userDocument.password,
    );
    if (!passwordIsValid) {
      throw new UnauthorizedException('Credentials are not valid.');
    }
    return this.toModel(userDocument);
  }

  private toModel(userDocument: UserDocument): User {
    return {
      _id: userDocument._id.toHexString(),
      email: userDocument.email,
      password: userDocument.password,
      role: userDocument.role,
      sites: userDocument.sites,
      google: userDocument.google,
      status: userDocument.status,
    };
  }
}
