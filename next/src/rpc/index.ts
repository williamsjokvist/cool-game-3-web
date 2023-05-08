
import { loadPackageDefinition, credentials } from '@grpc/grpc-js'
import { loadSync } from '@grpc/proto-loader'
import { CharacterModel } from '../types/character'
import path from 'path'

const protoPath = path.resolve('../', 'proto', 'cool-game-web.proto')

const packageDefinition = loadSync(protoPath, {
  keepCase: true,
  defaults: true,
  oneofs: true,
  longs: String,
  enums: String,
})

const coolGameProto = loadPackageDefinition(packageDefinition).coolgame3web
const client = new coolGameProto.CoolGame3Web(process.env.SERVER_URL, credentials.createInsecure())

export const getCharacters = (requestParams: { 
  isOnline: boolean,
  limit: number,
  offset: number
}): Promise<CharacterModel[]> => {  
  return new Promise((resolve, reject) => {
    client.GetCharacters(requestParams, (err: any, res: any) => {
      if (err)
        reject(err)
      else
        resolve(res.characters as CharacterModel[])
    });
  })
}

export const getNotice = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    client.GetNotice({}, (err: any, res: any) => {
      if (err)
        reject(err)
      else
        resolve(res.Message)
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
    client.CreateAccount(requestParams, (err: any, res: any) => {
      if (err)
        reject(err)
      else
        resolve(res.Success)
    });
  })
}