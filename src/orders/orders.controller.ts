import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrdersService } from './orders.service';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiOperation({ summary: 'Cria uma ordem.' })
  @ApiCreatedResponse({ description: 'A ordem foi criada com sucesso.' })
  create(
    @Body()
    createOrderDto: CreateOrderDto,
  ) {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retona todas as ordens.' })
  @ApiOkResponse({
    description: 'As ordem foram encontradas com sucesso.',
  })
  findAll(@Query('skip') skip: string, @Query('take') take: string) {
    return this.ordersService.findAll({
      skip: Number(skip),
      take: Number(take),
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Encontra uma ordem.' })
  @ApiOkResponse({
    description: 'A ordem foi encontrada com sucesso.',
  })
  @ApiNotFoundResponse({
    description: 'A ordem não foi encontrada.',
  })
  async findOne(@Param('id') id: string) {
    try {
      const order = await this.ordersService.findOne(id);

      console.log(order, 'order');

      return order;
    } catch {
      return { status: 404, message: `Ordem não encontrada com o id [${id}]` };
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza uma ordem.' })
  @ApiOkResponse({
    description: 'A ordem foi atualizada com sucesso.',
  })
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(id, updateOrderDto);
  }

  @HttpCode(204)
  @Delete(':id')
  @ApiOperation({ summary: 'Remove uma ordem.' })
  @ApiNoContentResponse({
    description: 'A ordem foi deletada com sucesso.',
  })
  async remove(@Param('id') id: string) {
    await this.ordersService.remove(id);
  }
}
