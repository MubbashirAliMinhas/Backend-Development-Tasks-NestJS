import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/TypeORM/entities/user.entity';
import { ProductModule } from 'src/product/product.module';
import { Order } from 'src/TypeORM/entities/order.entity';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Order]),
    ProductModule,
    CacheModule.register(),
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}
