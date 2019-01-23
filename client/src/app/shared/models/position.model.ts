export class PositionModel {
  constructor(
      public name: string,
      public cost: string,
      public user?: string,
      public category?: string,
      public _id?: string
  ) {

  }
}