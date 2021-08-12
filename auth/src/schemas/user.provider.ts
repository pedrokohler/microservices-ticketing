import { AsyncModelFactory } from '@nestjs/mongoose';
import { PasswordModule } from 'src/password/password.module';
import { PasswordService } from 'src/password/password.service';
import { User, UserSchema } from './user.schema';

export const UserProvider: AsyncModelFactory = {
  name: User.name,
  imports: [PasswordModule],
  useFactory: (passwordService: PasswordService) => {
    const schema = UserSchema;

    schema.pre('save', async function (done) {
      if (this.isModified('password')) {
        const hashed = await passwordService.toHash(this.get('password'));
        this.set('password', hashed);
      }
      done();
    });

    return schema;
  },
  inject: [PasswordService],
};
