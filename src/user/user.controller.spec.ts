import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;

  let mockUserService = {
    createUser: jest.fn().mockImplementation(dto => {
      return {
        ...dto,
        id: expect.any(Number)
      }
    }),

    findUser: jest.fn().mockImplementation(email => {
      return {
        ...expect.any(Object),
        email,
        id: expect.any(Number)
      }
    }),

    getUser: jest.fn().mockImplementation(id => {
      return {
        ...expect.any(Object),
        id
      }
    }),

    createOrder: jest.fn().mockImplementation(dto => {
      return {
        ...dto,
        id: expect.any(Number)
      }
    }),

    getOrder: jest.fn().mockImplementation(() => {
      return {
        ...expect.any(Object),
        userId: expect.any(Number),
        id: expect.any(Number)
      }
    })
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, {
        provide: 'CACHE_MANAGER',
        useValue: {}
      }]
    }).overrideProvider(UserService).useValue(mockUserService).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  let userDto = {
    "name": "John",
    "email": "john@gmail.com",
    "password": "test123",
    "confirmPassword": "test123"
  }

  let user = {
    "id": 1,
    "name": "John",
    "email": "john@gmail.com",
    "password": "test123"
  }

  it('should create a user', () => {
    expect(controller.createUser(userDto)).toEqual(Promise.resolve(user))
  })

  let orderDto = {
    "products": [
      {
        "id": 1,
        "quantity": 2
      },
      {
        "id": 3,
        "quantity": 4
      }
    ]
  }

  let order = {
    "id": 10,
    "user": {
      "id": 2
    },
    "purchasedProduct": [
      {
        "id": 5,
        "name": "Pasta",
        "price": 300,
        "quantity": 11
      }
    ],
    "totalPrice": 10000,
    "createdAt": "2024-04-18T18:26:48.626Z"
  }
});
