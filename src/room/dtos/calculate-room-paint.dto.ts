import { IsNumber } from "class-validator"
import { Field, InputType } from "type-graphql"

@InputType()
export class WallDto {
	@Field(() => Number)
	@IsNumber()
	height: number

	@IsNumber()
	@Field(() => Number)
	length: number

	@IsNumber()
	@Field(() => Number, { nullable: true })
	quantityDoors?: number

	@IsNumber()
	@Field(() => Number, { nullable: true })
	quantityWindows?: number
}

@InputType()
export class CalculateRoomPaintDto {
	@Field(() => [WallDto])
	walls: WallDto[]
}
