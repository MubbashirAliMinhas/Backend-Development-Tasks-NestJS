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
import { CacheModule } from '@nestjs/cache-manager';
import { ChatGateway } from './chat/chat.gateway';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: 'localhost',
    //   port: 5432,
    //   username: 'postgres',
    //   password: 'mali123',
    //   database: 'EcommerceTestNestJS',
    //   entities: [Product, User, Order, PurchasedProduct],
    //   synchronize: true,
    // }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.getOrThrow('HOST'),
          port: configService.getOrThrow('PORT'),
          username: configService.getOrThrow('USER_NAME'),
          password: configService.getOrThrow('PASSWORD'),
          database: configService.getOrThrow('DATABASE'),
          entities: [Product, User, Order, PurchasedProduct],
          synchronize: true
        }
      },
      inject: [ConfigService]
    }),
    UserModule,
    ProductModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, ChatGateway],
})
export class AppModule {}
