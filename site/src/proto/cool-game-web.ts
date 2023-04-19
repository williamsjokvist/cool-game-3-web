
import grpc from '@grpc/grpc-js'
import protoLoader from '@grpc/proto-loader'
import { CharacterModel } from '../types/character'

const packageDefinition = protoLoader.loadSync('../proto/cool-game-web.proto', {
  keepCase: true,
  defaults: true,
  oneofs: true,
  longs: String,
  enums: String,
})

const coolGameProto = grpc.loadPackageDefinition(packageDefinition).coolgame3web
const client = new coolGameProto.CoolGame3Web(import.meta.env.SERVER_URL, grpc.credentials.createInsecure())

export const getCharacters = (requestParams: { 
  isOnline: boolean,
  limit: number,
  offset: number
}): Promise<CharacterModel[]> => {  
  return new Promise((resolve, reject) => {
    client.GetCharacters(requestParams, (err, res) => {
      if (err)
        reject(err)
      else
        resolve(res.characters as CharacterModel[])
    });
  })
}

export const getNotice = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    client.GetNotice({}, (err, res) => {
      if (err)
        reject(err)
      else
        resolve(res.notice)
    });
  })
}

export const createAccount = (requestParams: {
  Name: string,
  Password: string,
  Email: string,
  Birthday: string,
  DiscordUsername: string,
}): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    client.CreateAccount(requestParams, (err, res) => {
      if (err)
        reject(err)
      else
        resolve(res.Success)
    });
  })
}