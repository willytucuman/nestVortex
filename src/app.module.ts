import { Module , Logger} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HistoryModule } from './history/history.module';
import { MedicsModule } from './medics/medics.module';
import { EntriesModule } from './entries/entries.module';
import { ConsultsModule } from './consults/consults.module';
import { PracticesModule } from './practices/practices.module';
import { PatientsModule } from './patients/patients.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './exceptions/ForbiddenException';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';
import { PdfModule } from './pdf/pdf.module';
import {  NestModule, MiddlewareConsumer } from '@nestjs/common';
import { RequestsLoggerMiddleware } from './logger.middleware';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.local.development',
    }),
    TypeOrmModule.forRootAsync({
      imports:[ConfigModule,UsersModule],
      inject:[ConfigService],
      useFactory:(ConfigService:ConfigService) =>(
        {
          type:'postgres',
          host:ConfigService.get('DB_HOST'),
          port:+ConfigService.get("DB_PORT"),
          username:ConfigService.get("DB_USERNAME"),
          password:ConfigService.get("DB_PASSWORD"),
          database:ConfigService.get("DB_DATABASE"),
          autoLoadEntities:true,
          synchronize:true
        }
      )
    }),
    HistoryModule,
    MedicsModule,
    EntriesModule,
    ConsultsModule,
    PracticesModule,
    PatientsModule,
    AuthModule,
    PdfModule,
  ],
  providers:[{
    provide:APP_FILTER,
    useClass:HttpExceptionFilter
  }, 
  AuthService,
  UsersService,
]
})
// export class AppModule {
//   private readonly logger = new Logger(AppModule.name);

//   constructor() {
//     this.logger.log('Database connection established');
//   }
// }
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(RequestsLoggerMiddleware).forRoutes('*');
  }
}