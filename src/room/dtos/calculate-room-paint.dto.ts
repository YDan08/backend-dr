import { IsNumber, Min, ValidateNested, IsOptional, IsInt } from 'class-validator'
import { Type } from 'class-transformer'
import { Field, InputType, Int } from 'type-graphql'

@InputType()
export class WallDto {
  @Field(() => Number)
  @IsNumber()
  @Min(1, { message: 'A altura deve ser no minimo 1!' })
  height: number

  @IsNumber()
  @Field(() => Number)
  @Min(1, { message: 'O comprimento deve ser no minimo 1!' })
  length: number

  @Field(() => Int, { nullable: true })
  @IsInt()
  @IsNumber()
  @IsOptional()
  @Min(0)
  quantityDoors?: number

  @IsNumber()
  @IsInt()
  @Field(() => Int, { nullable: true })
  @IsOptional()
  @Min(0)
  quantityWindows?: number
}

@InputType()
export class CalculateRoomPaintDto {
  @Field(() => [WallDto])
  @Type(() => WallDto)
  @ValidateNested({ each: true })
  walls: WallDto[]
}
