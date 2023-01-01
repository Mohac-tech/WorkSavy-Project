const supertest = require('supertest');
const app = require('../index');
const request = supertest(app)
const mongoose = require('mongoose');
require('dotenv').config();

beforeAll(async () => {

    mongoose.connect(process.env.CONNECTION_STRING,
        () => console.log('Connected'), {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
  }, 10000);

  afterAll(async () => {
    await mongoose.connection.close();
  });

describe('Test users register', () => {
    it('Should be 403', async () => {
        const res = await request
        .post('/api/v1/users/register')
        .send({
            "firstN": "Mohamed Junior",
            "lastN": "Cisse",
            "email": "junylivre@gmail.com",
            "image": "link im",
            "password": "Enfant097",
            "phoneN": "506-888-3677",
            "dob": "06 May 1997",
            "localisation": "Moncton",
            "dept": "Data"
        })
        .expect(403)
    })

    it('Should be 401', async () => {
        const res = await request
        .post('/api/v1/users/register')
        .send({
            "firstN": "Mohamed Junior",
            "lastN": "Cisse",
            "email": "juny",
            "image": "link im",
            "password": "Enfant097",
            "phoneN": "506-888-3677",
            "dob": "06 May 1997",
            "localisation": "Moncton",
            "dept": "Data"
        })
        .expect(401)
    })
})

describe('Test users login', () => {

       it('Shoult be 200', async () => {
        const res = await request
        .post('/api/v1/users/login')
        .send({
            "username": "moha5662@gmail.com",
            "password": "Enfant97"
        })
        .expect(200)
    })

    it('Should be 500', async () => {
        const res = await request
        .post('/api/v1/users/login')
        .send({
            "username": "moha5662@gmail.com",
            "password": "Enfant7"
        })
        .expect(401)      
    })
})