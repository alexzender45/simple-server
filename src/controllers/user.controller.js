const Mailgun = require('mailgun-js');
import { config as dotConfig } from 'dotenv';
import 'dotenv/config';
import { BaseController } from '.';
import User from '../model/user.model';
import { throwError } from '../utils/handleErrors';
dotConfig();

const api_key = process.env.API_KEY_MAILGUN;
const domain = process.env.DOMAIN_MAILGUN;
const from_who = process.env.FROM_WHO_MAILGUN;
export class UserController extends BaseController {
  constructor() {
    super();
  }

  async register(req, res) {
    try {
      const data = req.body;
      
      const newUser = new User(data);
      const user = await newUser.save();
       const mailgun = new Mailgun({apiKey: api_key, domain: domain});
       const data1 = {
       //Specify email data
       from: from_who,
       //The email to contact
       to: req.body.email,
       //Subject and text data  
       subject: 'Hello from Mailgun',
       html: `<h1>Welcom to Simple server ${req.body.firstname} </h1> <p>We are happy to see you register with us</p>`
       }
     //Invokes the method to send emails given the above data with the helper library
      mailgun.messages().send(data1)
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
      super.error(res);
    } 
    if(user)
    super.success(res, user);
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
      const mailgun = new Mailgun({apiKey: api_key, domain: domain});
      const data1 = {
        //Specify email data
          from: from_who,
        //The email to contact
          to: user.email,
        //Subject and text data  
          subject: 'Hello from Mailgun',
          html: `<h1>So sad to see you leave Simple server ${req.body.firstname} </h1> <p>Please come back</p>`
        }
        //Invokes the method to send emails given the above data with the helper library
        mailgun.messages().send(data1)
        await user.remove();
      super.success(res, user, 'Delete Successful');
    } catch (e) {
      super.error(res, e);
    }
  }
}
