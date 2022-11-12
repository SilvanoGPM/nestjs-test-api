import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsNumber({ allowInfinity: false, allowNaN: false })
  @IsPositive()
  @ApiProperty({ minimum: 1, default: 1, description: 'Valor da ordem.' })
  amount: number;
}
