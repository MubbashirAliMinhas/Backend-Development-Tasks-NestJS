import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../TypeORM/entities/user.entity';
import { Order } from '../TypeORM/entities/order.entity';
import { ProductService } from '../product/product.service';

describe('UserService', () => {
  let service: UserService;

  let mockUser = {}
  let mockOrder = {
    create: jest.fn().mockImplementation(dto => dto),
    save: jest.fn().mockImplementation((order) => Promise.resolve({id: expect.any(Number), ...order}))
  }
  let mockProductService = {
    reduceQuantities: jest.fn().mockImplementation(productquantities => {
      return productquantities.map(productquantity => {
        return {
          name: expect.any(String),
          price: expect.any(Number),
          ...productquantity
        }
      })
    })
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, ProductService, {
        provide: getRepositoryToken(User),
        useValue: mockUser
      }, {
        provide: getRepositoryToken(Order),
        useValue: mockOrder
      }
    ],
    }).overrideProvider(ProductService).useValue(mockProductService).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  let orderType = {
    userId: 1,
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
      "id": 1
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

  it('should create an order', () => {
    expect(service.createOrder(orderType)).toEqual(Promise.resolve(order))
  })
});
