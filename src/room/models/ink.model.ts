import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class InkModel {
  @Field(() => Number)
  ink18: number
  @Field(() => Number)
  ink3: number
  @Field(() => Number)
  ink2: number
  @Field(() => Number)
  ink05: number
  @Field(() => Number)
  totalInk: number
}
