import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UserModule } from '../src/user/user.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../src/user/entities/user.entity';

describe('UserController (e2e)', () => {
  let app: INestApplication;

  const mockUserRepository ={
      find:jest.fn(),
      createUser: jest.fn().mockImplementation(dto => dto),
      save:jest.fn().mockImplementation(user => Promise.resolve({id:Date.now(),...user})),
  }

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UserModule],
    }).overrideProvider(getRepositoryToken(User)).useValue(mockUserRepository).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/user (GET)', () => {
    return request(app.getHttpServer())
      .get('/user')
      .expect(200)
  });

  it('/user (POST)', () => {
    return request(app.getHttpServer())
      .post('/user')
      .send({
        name:'Sakshi',
        password:'password',
        age:23,
        PhoneNo:12345 
      })
      .expect('Content-Type',/json/)
      .expect(201)
      .then(response => {
          expect(response.body).toEqual({
              id:expect.any(Number),
              name:'Sakshi',
              password:'password',
              age:23,
              PhoneNo:12345
          })
      })
  });
});
