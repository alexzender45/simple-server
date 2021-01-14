const request = require('supertest');
import { config as dotConfig } from 'dotenv';
import 'dotenv/config';
import app from '../src/app';
import User from '../src/model';

dotConfig();

const testUser = {
  firstname: 'hope',
  lastname: 'sam',
  email: 'juniorefe45@gmail.com',
  mobile: 2349068722097,
}

describe('Simple Server', () => {


  it('should create user', async () => {
    const res = await request(app)
      .post('/api/users')
      .send(testUser);
    expect(res.statusCode).toEqual(201);
  },  120000);



  it('should fetch all users', async () => {
    const res = await request(app).get('/api/users');
    expect(res.statusCode).toEqual(200);
  },  120000);

  it('should fetch single user', async () => {
    const user = await User.findOne({ email: "juniorefe45@gmail.com" });
    const res = await request(app).get(`/api/users/${user._id}`);
    expect(res.statusCode).toEqual(200);
  }, 120000);

  it('should update user', async () => {
    const user = await User.findOne({ email: testUser.email });
    const res = await request(app).patch(`/api/users/${user._id}`)
    .send({
      firstname: 'Bose',
      lastname: 'sam',
    });
    expect(res.statusCode).toEqual(200);
  }, 120000);

  it('should delete user', async done => {
    const user = await User.findOne({ email: "juniorefe45@gmail.com" });
    const res = await request(app).delete(`/api/users/${user._id}`)
    await user.remove();;
    expect(res.statusCode).toEqual(200);
    done();
  }, 120000);
})