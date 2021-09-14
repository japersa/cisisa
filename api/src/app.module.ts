import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import configuration from '../config/configuration';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './infrastructure/modules/user.module';
import { AuthModule } from './infrastructure/modules/auth.module';
import { CountryModule } from './infrastructure/modules/country.module';
import { DepartmentModule } from './infrastructure/modules/department.module';
import { CityModule } from './infrastructure/modules/city.module';
import { NeighborhoodModule } from './infrastructure/modules/neighborhood.module';
import { RoleModule } from './infrastructure/modules/role.module';
import { PermissionModule } from './infrastructure/modules/permission.module';
import { PermissionRoleModule } from './infrastructure/modules/permission_role.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { UploadModule } from './infrastructure/modules/upload.module';
import { CompanyModule } from './infrastructure/modules/company.module';
import { PrbModule } from './infrastructure/modules/prb.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    ServeStaticModule.forRoot({
      rootPath: process.cwd() + '/public',
      exclude: ['/api*', '/docs*'],
    }),
    AuthModule,
    UserModule,
    CountryModule,
    DepartmentModule,
    CityModule,
    NeighborhoodModule,
    RoleModule,
    PermissionModule,
    PermissionRoleModule,
    UploadModule,
    CompanyModule,
    PrbModule
  ],
  providers: [AppService],
})
export class AppModule { }
