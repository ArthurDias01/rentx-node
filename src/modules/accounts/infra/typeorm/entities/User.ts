import { Expose } from 'class-transformer';
import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm'
import { v4 as uuidv4 } from 'uuid';

@Entity('users')
class User {

  @PrimaryColumn()
  id?: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  driver_license: string;

  @Column()
  is_admin: boolean;

  @Column()
  avatar: string;

  @CreateDateColumn()
  created_at: Date;

  @Expose({ name: "avatar_url" }) // expõe o método getAvatarUrl() para ser acessado externamente
  avatar_url(): string {
    if (process.env.disk === "local") {
      return `${process.env.APP_API_URL}/avatar/${this.avatar}`
    } else if (process.env.disk === "s3") {
      return `${process.env.AWS_BUCKET_URL}/avatar/${this.avatar}`
    } else {
      return null;
    }
  }

  constructor() { // reafirma a adição do id* caso ele não exista
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}

export { User }
