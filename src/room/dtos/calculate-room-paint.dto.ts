import { IsNumber } from "class-validator"
import { Field, InputType } from "type-graphql"

@InputType()
export class WallDto {
	@IsNumber()
	@Field(() => Number)
	meters: number

	@IsNumber()
	@Field(() => Number)
	quantityDoors: number

	@IsNumber()
	@Field(() => Number)
	quantityWindows: number
}

@InputType()
export class CalculateRoomPaintDto {
	@Field(() => [WallDto])
	walls: WallDto[]
}
