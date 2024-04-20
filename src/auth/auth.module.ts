import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { UserModule } from "../user/user.module";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt.strategy";
import { LocalStrategy } from "./local.strategy";
import { ConfigService } from "@nestjs/config";


@Module({
    imports: [
        UserModule,
        PassportModule,
        // JwtModule.register({
        //     secret: 'secret',
        //     signOptions: {
        //         expiresIn: '1d'
        //     }
        // }),
        JwtModule.registerAsync({
            useFactory: (configService: ConfigService) => {
                return {
                    secret: configService.getOrThrow('JWT_SECRET'),
                    signOptions: {
                        expiresIn: '1d'
                    }
                }
            },
            inject: [ConfigService]
        })
    ],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    exports: [AuthService]
})
export class AuthModule {

}