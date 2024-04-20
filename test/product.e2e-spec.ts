import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { ProductModule } from '../src/product/product.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from '../src/TypeORM/entities/product.entity';

describe('ProductController (e2e)', () => {
  let app: INestApplication;
  let mockProductRepository = {}

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ProductModule],
    }).overrideProvider(getRepositoryToken(Product)).useValue(mockProductRepository).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  let product = {
    "id": 3,
    "name": "Pasta",
    "price": 300,
    "quantity": 10
  }

  it('/api/product (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/product/1')
      .expect(200)
      .expect(product)
  });
});
