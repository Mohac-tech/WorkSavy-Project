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
    // it('Should be 201', async () => {
    //     const res = await request
    //     .post('/api/v1/employee/register')
    //     .send({
    //         "firstN": "Junior",
    //         "lastN": "Cisse",
    //         "email": "jojo5662@gmail.com",
    //         "role": "user",
    //         "sin": "1234567",
    //         "dob": "06 May 1990",
    //         "phoneN": "506-888-3677",
    //         "image": "link",
    //         "localisation": "Moncton",
    //         "dept": "Data"
    //     })
    //     .expect(201)
    // })

    it('Should be 401', async () => {
        const res = await request
        .post('/api/v1/employee/register')
        .send({
            "firstN": "Junior",
            "lastN": "Cisse",
            "email": "jo566",
            "role": "user",
            "sin": "1234567",
            "dob": "06 May 1990",
            "phoneN": "506-888-3688",
            "image": "link",
            "localisation": "Moncton",
            "dept": "Data"
        })
        .expect(401)
    })
})
