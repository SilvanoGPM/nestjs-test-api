import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsNumber({ allowInfinity: false, allowNaN: false })
  @IsPositive()
  amount: number;
}
