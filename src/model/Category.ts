import { v4 as uuidv4 } from 'uuid';

class Category {
  id?: string;
  name: string;
  description: string;
  created_at: Date;
  constructor() { // reafirma a adição do id* caso ele não exista
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}

export { Category };
