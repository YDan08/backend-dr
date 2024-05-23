import { Arg, Mutation, Query, Resolver } from "type-graphql"
import { InkModel } from "../models"
import { CalculateRoomPaintDto } from "../dtos"

@Resolver()
export class RoomResolver {
	@Query(() => String)
	async getHelloWorld() {
		return "hello world"
	}

	@Mutation(() => InkModel)
	async CalculateRoomPaintDto(
		@Arg("data", () => CalculateRoomPaintDto) data: CalculateRoomPaintDto
	) {
		console.log(data)
		const ink = {
			ink18: 2,
			ink3: 3,
			ink2: 2,
			ink05: 1,
		}
		return ink
	}
}
