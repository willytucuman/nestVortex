import { Module , Logger} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.local.development',
    }),
    TypeOrmModule.forRootAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory:(ConfigService:ConfigService) =>(
        {
          type:'postgres',
          host:ConfigService.get('DB_HOST'),
          port:+ConfigService.get("DB_PORT"),
          username:ConfigService.get("DB_USERNAME"),
          password:ConfigService.get("DB_PASSWORD"),
          database:ConfigService.get("DB_DATABASE"),
          entities:[User],
          synchronize:true
        }
      )
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  private readonly logger = new Logger(AppModule.name);

  constructor() {
    this.logger.log('Database connection established');
  }
}
