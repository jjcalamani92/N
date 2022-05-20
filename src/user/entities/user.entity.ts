import { ObjectType, Field } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { RelayTypes } from 'src/common/relay/relay.types';
@Schema({ timestamps: true, versionKey: false })
@ObjectType()
export class User {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Prop({
    required: true,
    unique: true,
  })
  @Field(() => String)
  email: string;

  @Prop()
  @Field(() => String)
  password: string;

  @Prop({
    required: true,
  })
  @Field(() => String)
  role: string;

  @Prop({
    default: true,
  })
  @Field(() => Boolean)
  status: boolean;

  @Prop({
    default: false,
  })
  @Field(() => Boolean)
  google: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre<User>('save', function (next) {
  this.email = this.email.toLowerCase();
  // this.firstName = this.email.toLowerCase();

  // if (this.lastName) {
  //     this.lastName = this.lastName.toLowerCase();
  // }
  next();
});

@ObjectType()
export class ListUserResponse extends RelayTypes<User>(User) {}