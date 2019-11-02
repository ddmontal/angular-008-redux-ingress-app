export class Entry {
  description: string;
  quantity: number;
  type: string;
  uid?: string;

  constructor(obj: any) {
    this.description = (obj && obj.description) || null;
    this.quantity = (obj && obj.quantity) || null;
    this.type = (obj && obj.type) || null;
  }
}
