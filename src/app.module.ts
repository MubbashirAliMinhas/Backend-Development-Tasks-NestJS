import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { Product } from './TypeORM/entities/product.entity';
import { User } from './TypeORM/entities/user.entity';
import { Order } from './TypeORM/entities/order.entity';
import { PurchasedProduct } from './TypeORM/entities/purchased-product.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'mali123',
      database: 'EcommerceTestNestJS',
      entities: [Product, User, Order, PurchasedProduct],
      synchronize: true,
    }),
    UserModule,
    ProductModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
