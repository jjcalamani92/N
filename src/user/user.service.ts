import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { ListInput } from 'src/common/dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async create(input: CreateUserInput) {
    await this.validateCreateUserData(input);
    const user = new this.userModel({
      ...input,
      password: await bcrypt.hash(input.password, 10),
    });
    return user.save();
  }

  private async validateCreateUserData(input: CreateUserInput) {
    const user = await this.userModel.findOne({ email: input.email });
    if (user) {
      throw new NotFoundException(
        `user with email ${input.email} already exists`,
      );
    }
  }

  async update(id: string, input: UpdateUserInput) {
    const existingUser = await this.userModel
      .findOneAndUpdate({ _id: id }, { $set: input }, { new: true })
      .exec();

    if (!existingUser) {
      throw new NotFoundException(`User ${id} not found`);
    }
    return existingUser;
  }

  async remove(id: string, input: UpdateUserInput) {
    const existingUser = await this.userModel
      .findByIdAndUpdate({ _id: id }, { status: false }, { new: true })
      .exec();
    if (!existingUser) {
      throw new NotFoundException(`User ${id} not found`);
    }
    return existingUser;
  }

  findAll(paginationQuery: ListInput) {
    const { limit, offset } = paginationQuery;
    return this.userModel
      .find({ status: true })
      .skip(offset)
      .limit(limit)
      .exec();
  }

  async findOne(id: string) {
    const user = await this.userModel.findOne({ _id: id, status: true }).exec();
    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }
    return user;
  }

  async getAll(paginationQuery: ListInput) {
    const count = await this.userModel.count({ status: true });
    const users = await this.findAll(paginationQuery);
    return { count, users };
  }


}
