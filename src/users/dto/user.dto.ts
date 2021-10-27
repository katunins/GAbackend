export class UserDto {
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly userPic: string;
  readonly about: string;
  readonly accessToken: string;
  readonly birthday: string;
  readonly relatives: Array<{
    id: string;
    type: string;
  }>;
}
