import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript'
import { MessageEntity } from './MessageEntity'
import { UserEntity } from './UserEntity'

@Table({
  tableName: 'topics',
})
export class TopicEntity extends Model<TopicEntity> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  override id!: number

  @AllowNull(false)
  @Column(DataType.STRING)
  title!: string

  @AllowNull(false)
  @Column(DataType.STRING)
  description!: string

  @ForeignKey(() => UserEntity)
  @Column({
    type: DataType.INTEGER,
    field: 'owner_id',
  })
  ownerId!: number

  @BelongsTo(() => UserEntity)
  userEntity!: UserEntity

  @HasMany(() => MessageEntity)
  message!: MessageEntity[]
}
