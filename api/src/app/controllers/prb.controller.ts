import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Param,
    Patch,
    Post,
    Query,
    Response,
    UseGuards,
    Request,
    UploadedFile,
    UseInterceptors,
    Inject,
} from '@nestjs/common';
import { PrbService } from '../../domain/services/prb.service';
import { PrbDto } from '../../domain/dto/prb.dto';
import { PaginateOptions } from 'src/domain/services/crud.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaginateResponseDto } from 'src/domain/dto/paginated-response.dto';
import { Op, Sequelize } from 'sequelize';
import { FileInterceptor } from '@nestjs/platform-express';
import * as path from 'path';
import * as parse from 'csv-parse';

const fs = require('fs');

@ApiTags('prbs')
@Controller('prbs')
export class PrbController {
    constructor(private _service: PrbService) { }

    @Get()
    public async findAll(@Response() res, @Query() options: PaginateOptions) {
        const { page, offset, search } = options;
        const prbs = await this._service.paginate({
            page,
            offset,
        });
        return res.status(HttpStatus.OK).json(prbs);
    }

    @Get('/:id')
    public async findOne(@Response() res, @Param() param) {
        const prb = await this._service.findOne({
            where: { idPrb: param.id },
        });

        if (prb) {
            return res.status(HttpStatus.OK).json(prb);
        }

        return res
            .status(HttpStatus.NOT_FOUND)
            .json({ message: "Prb doesn't exist!" });
    }

    @Get('/findByCode/:code')
    public async findByCode(@Response() res, @Param() param) {
        const prb = await this._service.findAll({
            where: { d_codigo: param.code },
        });

        if (prb) {
            return res.status(HttpStatus.OK).json(prb);
        }

        return res
            .status(HttpStatus.NOT_FOUND)
            .json({ message: "Prb doesn't exist!" });
    }

    @Post()
    public async create(@Response() res, @Body() prbDto: PrbDto) {
        const prb = await this._service.create(prbDto);
        return res.status(HttpStatus.OK).json(prb);
    }

    @Patch('/:id')
    public async update(@Param() param, @Response() res, @Body() body) {
        const options = { where: { idPrb: param.id } };
        const prb = await this._service.update(body, options, options);

        if (prb) {
            return res.status(HttpStatus.OK).json(prb);
        }

        return res
            .status(HttpStatus.NOT_FOUND)
            .json({ message: "Prb doesn't exist!" });
    }

    @Post('/upload')
    @UseInterceptors(FileInterceptor('file'))
    public async upload(
        @UploadedFile() file,
        @Body() body,
        @Response() res,
        @Request() req,
    ) {
        try {
            fs.createReadStream(path.resolve(process.cwd(), file.path))
                .pipe(parse({ delimiter: ';' }))
                .on('error', (error) => {
                    console.error(error);
                })
                .on('data', async (row) => {
                    const objDto = {
                        d_codigo: row[0],
                        d_asenta: row[1],
                        d_tipo_asenta: row[2],
                        d_mnpio: row[3],
                        d_estado: row[4],
                        d_ciudad: row[5],
                        d_CP: row[6],
                        c_estado: row[7],
                        c_oficina: row[8],
                        c_CP: row[9],
                        c_tipo_asenta: row[10],
                        c_mnpio: row[11],
                        id_asenta_cpcons: row[12],
                        d_zona: row[13],
                        c_cve_ciudad: row[14],
                    }
                    await this._service.create(objDto);
                })
                .on('end', () => {
                    console.log(`Parsed rows`);
                    fs.unlinkSync(file.path);
                    return res.status(HttpStatus.OK).json({
                        message: 'file uploaded successfully'
                    });
                });


        } catch (e) {
            console.log(e);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(e);
        }
    }

}
