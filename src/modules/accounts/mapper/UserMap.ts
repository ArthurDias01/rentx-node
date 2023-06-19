import { IUserResponseDTO } from '../dtos/IUserResponseDTO'
import { User } from '../infra/typeorm/entities/User'
import { instanceToInstance } from 'class-transformer'

class UserMap {
  static toDTO({ id, name, email, driver_license, avatar, avatar_url }: User): IUserResponseDTO {
    const user = instanceToInstance({
      id,
      name,
      email,
      driver_license,
      avatar,
      avatar_url,
    })

    return user
  }
}

export { UserMap }
