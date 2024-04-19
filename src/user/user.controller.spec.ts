import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/TypeORM/entities/user.entity';
import { Order } from 'src/TypeORM/entities/order.entity';
import { ProductModule } from 'src/product/product.module';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
      exports: [UserService],
      imports: [
        TypeOrmModule.forFeature([User, Order]),
        ProductModule
      ]
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
