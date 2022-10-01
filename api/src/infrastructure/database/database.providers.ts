import { Sequelize } from 'sequelize-typescript';
import { ConfigService } from '@nestjs/config';
import { User } from '../../domain/entities/user.entity';
import { ForgottenPassword } from '../../domain/entities/forgottenpassword.entity';
import { RefreshToken } from '../../domain/entities/refreshToken.entity';
import { Country } from 'src/domain/entities/country.entity';
import { Department } from 'src/domain/entities/department.entity';
import { City } from 'src/domain/entities/city.entity';
import { Neighborhood } from 'src/domain/entities/neighborhood.entity';
import { Role } from 'src/domain/entities/role.entity';
import { Permission } from 'src/domain/entities/permission.entity';
import { PermissionRole } from 'src/domain/entities/permission_role.entity';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: configService.get<string>(`database.host`),
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.database'),
      });

      sequelize.addModels([
        User,
        ForgottenPassword,
        RefreshToken,
        Country,
        Department,
        City,
        Neighborhood,
        Role,
        Permission,
        PermissionRole,
      ]);
      await sequelize.sync(
        process.env.APP_ENV === 'development' && {
          force: true,
        },
      );
      return sequelize;
    },
  },
];
