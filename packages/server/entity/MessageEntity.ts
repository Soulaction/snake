import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript'
import { UserEntity } from './UserEntity'
import { TopicEntity } from './TopicEntity'

@Table({
  tableName: 'messages',
})
export class MessageEntity extends Model<MessageEntity> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  override id!: number

  @AllowNull(false)
  @Column(DataType.STRING)
  message!: string

  @ForeignKey(() => UserEntity)
  @Column({
    type: DataType.INTEGER,
    field: 'owner_id',
  })
  ownerId!: number

  @BelongsTo(() => UserEntity)
  userEntity!: UserEntity

  @ForeignKey(() => TopicEntity)
  @Column({
    type: DataType.INTEGER,
    field: 'topic_id',
  })
  topicId!: number

  @BelongsTo(() => TopicEntity)
  topicEntity!: TopicEntity
}
