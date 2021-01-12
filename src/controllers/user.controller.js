import { BaseController } from '.';
import User from '../model/user.model';
import { throwError } from '../utils/handleErrors';

export class UserController extends BaseController {
  constructor() {
    super();
  }

  async register(req, res) {
    try {
      const data = req.body;
      
      const newUser = new User(data);
      const user = await newUser.save();
      const body = { user };

      super.success(res, body, 'User Registration Successful', 201);
    } catch (e) {
      super.error(res, e);
    }
  }



  async readAll(req, res) {
    try {
      const users = await User.find({});

      super.success(res, users || [], 'Successfully Retrieved all users.');
    } catch (e) {
      super.error(res, e);
    }
  }

  

async fetchOne(req, res, next) {
  try {
    const user = await User.findById(req.params._id);
    if (!user) {
      return res.status(400).send({ error: 'User does not exist' });
    } 
    if(user)
    return res.status(200).send(user);
  } catch (e) {
    super.error(res, e);
  }
}

async updateuser(req, res) {
  try {
    const user = await User.findById(req.params._id);
    if(!user){
      return res.status(400).send({ error: 'User does not exist' });
    }else{
    const updates = Object.keys(req.body);
    const allowedUpdates = [
      'firstname',
      'lastname',
      'mobile',
      'email'
    ];
    const isValidUpdate = updates.every((update) => {
      return allowedUpdates.includes(update);
    });

    if (!isValidUpdate) {
      throwError(400, 'Invalid Field.');
    }

    const userUpdate = req.body;

    updates.map((update) => {
      user[update] = userUpdate[update];
    });

    const updatedUser = await user.save();
    super.success(res, updatedUser, 'Update Successful');
  }
  } catch (e) {
    console.log
    super.error(res, e);
  }
}

  async deleteOne(req, res) {
    try {
      const user = await User.findById(req.params._id);
      await user.remove();

      super.success(res, user, 'Delete Successful');
    } catch (e) {
      super.error(res, e);
    }
  }
}
