import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'src/common/abstract';

@Schema({ timestamps: true, versionKey: false })
export class UserDocument extends AbstractDocument {
  @Prop({ unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop()
  role: string;

  @Prop(() => [String])
  sites: string[];

  @Prop({
    default: true,
  })
  status: boolean;

  @Prop({
    default: false,
  })
  google: boolean;
}
export const UserSchema = SchemaFactory.createForClass(UserDocument);

UserSchema.pre<UserDocument>('save', function (next) {
  this.email = this.email.toLowerCase();
  next();
});
