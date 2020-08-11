import { UUIDItem } from './UUIDItem'

export class UUIDBatch {
  constructor() {
    this.batchList = []
  }

  public batchList: UUIDItem[]

  addItem(uuid: string) {
    this.batchList.push(new UUIDItem(uuid))
  }
}
