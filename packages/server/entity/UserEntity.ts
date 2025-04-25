import {
  AllowNull,
  Column,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript'
import { MessageEntity } from './MessageEntity'
import { TopicEntity } from './TopicEntity'

@Table({
  timestamps: false,
  tableName: 'users',
})
export class UserEntity extends Model<UserEntity> {
  @PrimaryKey
  @Column(DataType.INTEGER)
  override id!: number

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
    field: 'first_name',
  })
  firstName!: string

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
    field: 'second_name',
  })
  secondName!: string

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
    field: 'display_name',
  })
  displayName!: string

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
    field: 'phone',
  })
  phone!: string

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
    field: 'avatar',
  })
  avatar!: string

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
    field: 'email',
  })
  email!: string

  @HasMany(() => TopicEntity)
  topicEntity!: TopicEntity[]

  @HasMany(() => MessageEntity)
  messageEntity!: MessageEntity[]
}
