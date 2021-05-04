export class Resto {
  constructor(
    public id: number,
    public code: string,
    public no_pay: boolean,
    public name: string,
    created_by: number,
    updated_by: number
  ) { }
}
