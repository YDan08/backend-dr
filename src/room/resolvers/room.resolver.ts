import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import { InkModel } from '../models'
import { CalculateRoomPaintDto } from '../dtos'
import { roundDecimalPlaces } from '../../utils/round-decimal'

@Resolver()
export class RoomResolver {
  @Query(() => String)
  async getHelloWorld() {
    return 'hello world'
  }

  @Mutation(() => InkModel)
  async calculateRoomPaint(@Arg('data', () => CalculateRoomPaintDto) data: CalculateRoomPaintDto) {
    const door = 0.8 * 1.9
    const window = 2 * 1.2

    if (data.walls.length !== 4) {
      throw new Error('É necessario que tenha 4 paredes!')
    }

    const totalMeterRoom = data.walls.reduce((total, currWall) => {
      const totalWallMeter = currWall.height * currWall.length

      if (totalWallMeter > 50) {
        throw new Error('A parede não pode ser maior que 50 metros quadrados!')
      }

      const totalDoor = door * (currWall.quantityDoors ?? 0)
      const totalWindow = window * (currWall?.quantityWindows ?? 0)

      if (currWall.quantityDoors && currWall.height < 2.2) {
        throw new Error('É necessario que a parede tenha uma altura maior!')
      }

      const halfWallArea = totalWallMeter / 2
      const doorsAndWindowsFitInWall = halfWallArea >= totalDoor + totalWindow

      if (!doorsAndWindowsFitInWall) {
        throw new Error(
          'É necessario aumentar o tamanho da parede ou diminuir a quantidade de portas e janelas!'
        )
      }

      const wall = totalWallMeter - totalDoor - totalWindow

      return roundDecimalPlaces(total + wall)
    }, 0)

    const totalInk = roundDecimalPlaces(totalMeterRoom / 5)
    let paintRoomLiters = totalInk

    const inkMap = {
      ink18: 18,
      ink3: 3.6,
      ink2: 2.5,
      ink05: 0.5
    }

    const result: InkModel = {
      ink18: 0,
      ink3: 0,
      ink2: 0,
      ink05: 0,
      totalInk
    }

    Object.entries(inkMap).forEach(([key, value]) => {
      const ink = Math.floor(paintRoomLiters / value)
      paintRoomLiters %= value
      result[key as keyof InkModel] = ink
    })

    if (paintRoomLiters > 0) {
      const ink = Math.ceil(paintRoomLiters / 0.5)
      result.ink05 += ink
    }

    return result
  }
}
