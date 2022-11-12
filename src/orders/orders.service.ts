import { Injectable } from '@nestjs/common';
import { defaultPagination } from 'src/global/pagination';
import { PrismaService } from 'src/services/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

interface FindAllParams {
  skip?: number;
  take?: number;
}

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  create(createOrderDto: CreateOrderDto) {
    return this.prisma.order.create({
      data: createOrderDto,
    });
  }

  findAll({ skip, take }: FindAllParams) {
    return this.prisma.order.findMany({
      skip: isNaN(skip) ? 0 : skip,
      take: isNaN(take) ? defaultPagination.size : take,
    });
  }

  findOne(id: string) {
    return this.prisma.order.findUniqueOrThrow({
      where: { id },
    });
  }

  update(id: string, updateOrderDto: UpdateOrderDto) {
    return this.prisma.order.update({
      data: updateOrderDto,
      where: { id },
    });
  }

  async remove(id: string) {
    await this.prisma.order.delete({
      where: { id },
    });
  }
}
