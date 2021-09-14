import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Response,
  UseGuards,
} from '@nestjs/common';
import { CompanyService } from '../../domain/services/company.service';
import { CompanyDto } from '../../domain/dto/company.dto';
import { PaginateOptions } from 'src/domain/services/crud.service';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Company } from 'src/domain/entities/company.entity';
import { PaginateResponseDto } from 'src/domain/dto/paginated-response.dto';
import { Op, Sequelize } from 'sequelize';

@ApiTags('companies')
@Controller('companies')
export class CompanyController {
  constructor(private readonly _service: CompanyService) { }

  /**
   *
   * @returns {PaginateResponseDto{}} Returns all companies with theirs pagination
   * @param {PaginateOptions} request
   */
  @ApiOperation({ summary: 'Read all companies' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Countries has been successfully finded.',
    type: PaginateResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })

  @Get()
  public async findAll(@Response() res, @Query() options: PaginateOptions) {
    const { page, offset, search } = options;
    const companies = await this._service.paginate({
      page,
      offset,
    });
    return res.status(HttpStatus.OK).json(companies);
  }

  /**
   *
   * @returns {CompanyDto{}} Returns a company by id
   * @param {id} request
   */
  @ApiOperation({ summary: 'Search a company' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The id has been successfully finded.',
    type: CompanyDto,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Company doesn't exist!",
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })

  @Get('/:id')
  public async findOne(@Response() res, @Param() param) {
    const company = await this._service.findOne({
      where: { idCompany: param.id },
    });

    if (company) {
      return res.status(HttpStatus.OK).json(company);
    }

    return res
      .status(HttpStatus.NOT_FOUND)
      .json({ message: "Company doesn't exist!" });
  }

  /**
   *
   * @returns {CompanyDto{}} Returns a new company
   * @param {CompanyDto} request
   */
  @ApiOperation({ summary: 'Create company' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The record has been successfully created.',
    type: CompanyDto,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  @ApiResponse({
    status: HttpStatus.FOUND,
    description: 'Company already exists.',
  })

  @Post()
  public async create(@Response() res, @Body() companyDto: CompanyDto) {
    const companyExists = await this._service.findOne({
      where: { name: companyDto.name.toUpperCase() },
    });
    if (companyExists) {
      return res.status(HttpStatus.FOUND).json({ message: 'Company already exists!' });
    }
    const company = await this._service.create(companyDto);
    return res.status(HttpStatus.OK).json(company);
  }

  /**
   *
   * @returns {CompanyDto{}} Returns the modified company
   * @param {id} request
   * @param {CompanyDto} request
   */
  @ApiOperation({ summary: 'Change the company state' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The record state has been successfully changed.',
    type: CompanyDto,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Company doesn't exist!",
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })

  @Patch('/changeState/:id')
  public async changeState(@Param() param, @Response() res, @Body() body) {
    const options = { where: { idCompany: param.id } };
    body = { ...body, isActive: !body.isActive };
    const company = await this._service.update(body, options, options);
    if (company) {
      return res.status(HttpStatus.OK).json(company);
    }

    return res
      .status(HttpStatus.NOT_FOUND)
      .json({ message: "Company doesn't exist!" });
  }

  /**
   *
   * @returns {CompanyDto{}} Returns a updated company
   * @param {id} request
   * @param {CompanyDto} request
   */
  @ApiOperation({ summary: 'Update company' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The record has been successfully updated.',
    type: CompanyDto,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Company doesn't exist!",
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  @ApiResponse({
    status: HttpStatus.FOUND,
    description: 'Company already exists.',
  })

  @Patch('/:id')
  public async update(@Param() param, @Response() res, @Body() body) {
    body.description = body.description.toUpperCase();
    const companyExists = await this._service.findOne({
      where: { description: body.description.toUpperCase() },
    });
    if (companyExists && param.id != companyExists.idCompany) {
      return res.status(HttpStatus.FOUND).json({ message: 'Company already exists!' });
    }

    const options = { where: { idCompany: param.id } };
    const company = await this._service.update(body, options, options);

    if (company) {
      return res.status(HttpStatus.OK).json(company);
    }

    return res
      .status(HttpStatus.NOT_FOUND)
      .json({ message: "Company doesn't exist!" });
  }
}
