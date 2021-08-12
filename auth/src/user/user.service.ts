import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserSignUpDto } from './dtos/user-sign-up.dto';
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(userSignUpDto: UserSignUpDto): Promise<User> {
    const { email } = userSignUpDto;

    const [existingUser] = await this.userModel.find({ email });

    if (existingUser) {
      return null;
    }

    const user = new this.userModel(userSignUpDto);

    return user.save();
  }
}
