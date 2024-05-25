import { Arg, Mutation, Query, Resolver } from "type-graphql"
import { InkModel } from "../models"
import { CalculateRoomPaintDto } from "../dtos"
import { roundDecimalPlaces } from "../../utils/round-decimal"

@Resolver()
export class RoomResolver {
	@Query(() => String)
	async getHelloWorld() {
		return "hello world"
	}

	@Mutation(() => InkModel)
	async CalculateRoomPaint(
		@Arg("data", () => CalculateRoomPaintDto) data: CalculateRoomPaintDto
	) {
		const door = 0.8 * 1.9
		const window = 2 * 1.2

		const totalMeterRoom = data.walls.reduce((total, currWall) => {
			const totalWallMeter = currWall.height * currWall.length
			if (totalWallMeter > 50) {
				throw new Error("A parede não pode ser maior que 50 metros quadrados!")
			}
			const totalDoor = door * (currWall.quantityDoors ?? 0)
			const totalWindow = window * (currWall?.quantityWindows ?? 0)
			if (currWall.quantityDoors && currWall.height < 2.2) {
				throw new Error("É necessario que a parede tenha uma altura maior!")
			}
			if (totalWallMeter / 2 < totalDoor + totalWindow) {
				throw new Error(
					"É necessario aumentar o tamanho da parede ou diminuir a quantidade de portas e janelas!"
				)
			}

			const wall = totalWallMeter - totalDoor - totalWindow

			return roundDecimalPlaces(total + wall)
		}, 0)

		let paintRoomLiters = roundDecimalPlaces(totalMeterRoom / 5)

		let ink18 = Math.floor(paintRoomLiters / 18)
		paintRoomLiters = paintRoomLiters % 18
		let ink3 = Math.floor(paintRoomLiters / 3.6)
		paintRoomLiters = paintRoomLiters % 3.6
		let ink2 = Math.floor(paintRoomLiters / 2.5)
		paintRoomLiters = paintRoomLiters % 2.5
		let ink05 = Math.floor(paintRoomLiters / 0.5)
		paintRoomLiters = paintRoomLiters % 0.5

		if (paintRoomLiters > 0) {
			ink05 = ink05 + 1
			return {
				ink18: ink18,
				ink3: ink3,
				ink2: ink2,
				ink05: ink05,
				totalInk: roundDecimalPlaces(totalMeterRoom / 5),
			}
		}

		return {
			ink18: ink18,
			ink3: ink3,
			ink2: ink2,
			ink05: ink05,
			totalInk: roundDecimalPlaces(totalMeterRoom / 5),
		}
	}
}
