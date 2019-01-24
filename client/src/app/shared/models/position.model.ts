export class PositionModel {
  constructor(
      public name: string,
      public cost: number,
      public category: string,
      public user?: string,
      public _id?: string,
      public quantity?: number,
  ) {

  }
}