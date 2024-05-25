import 'reflect-metadata'
import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { buildSchema } from 'type-graphql'
import { RoomResolver } from './room'

const bootstrap = async () => {
  const schema = await buildSchema({
    resolvers: [RoomResolver]
  })

  const server = new ApolloServer({
    schema
  })

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 }
  })

  console.log(`Server running on ${url}`)
}

bootstrap()
