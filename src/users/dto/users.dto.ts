export class UsersDto {
  readonly name:string
  readonly email:string
  readonly userPic: string
  readonly about: string
  readonly authDevice: {
    id: string,
    lastLogin: string
  }
  readonly birthday:string
  readonly relatives:{
    id:string
    type: string
  }[]
}
