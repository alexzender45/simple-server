import { config as dotConfig } from 'dotenv';
import { model, Schema } from 'mongoose';
import validator from 'validator';
import uniqueValidator from 'mongoose-unique-validator';

dotConfig();

const UserSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true,
      trim: true
    },
    lastname: {
      type: String,
      trim: true,
      required: true,
      unique: true
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid Email!');
        }
        return validator.isEmail(value);
      }
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
      validate(value) {
        if (!validator.isMobilePhone(value, ['en-NG', 'en-GH'])) {
          throw new Error('Invalid Phone Number!');
        }
        return validator.isMobilePhone(value);
      }
    },
    
}  );
UserSchema.plugin(uniqueValidator, { message: '{TYPE} must be unique.' });

const User = model('User', UserSchema);

export default User;