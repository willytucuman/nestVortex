import { Module , Logger} from '@nestjs/common';
import { AuthGuard } from './auth-service/authGuard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HistoryModule } from './history/history.module';
import { MedicsModule } from './medics/medics.module';
import { EntriesModule } from './entries/entries.module';
import { ConsultsModule } from './consults/consults.module';
import { PracticesModule } from './practices/practices.module';
import { PatientsModule } from './patients/patients.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth-service/auth-service.module';
import { APP_GUARD } from '@nestjs/core';
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
    UsersModule,
    AuthModule
  ],
  // providers: [{
  //   provide:APP_GUARD,
  //   useClass:AuthGuard
  // }],
})
export class AppModule {
  private readonly logger = new Logger(AppModule.name);

  constructor() {
    this.logger.log('Database connection established');
  }
}
