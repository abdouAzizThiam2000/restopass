export class Token {
  constructor(
    public token_type: string,
    public expires_in: number,
    public access_token: string,
    public refresh_token: string,
  ){}
}
