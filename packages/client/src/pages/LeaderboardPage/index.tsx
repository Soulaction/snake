import { Avatar, Flex, Table, Typography } from 'antd'
import type { TableProps } from 'antd'
import { FC } from 'react'
import { mockData } from './model/leadersConstant'
import styles from '../ForumPage/ForumPage.module.css'

const { Title, Text } = Typography

export interface DataType {
  key: string
  avatar: string
  name: string
  score: number
}

export const columns: TableProps<DataType>['columns'] = [
  {
    title: 'Ранг',
    dataIndex: 'key',
    key: 'key',
    width: 10,
  },
  {
    title: 'Имя',
    dataIndex: 'name',
    key: 'name',
    render: (_, record) => (
      <Flex align="center" gap={20}>
        <Avatar size={'large'} src={record.avatar} />
        <Text>{record.name}</Text>
      </Flex>
    ),
  },
  {
    title: 'Счет',
    dataIndex: 'score',
    key: 'score',
    width: 10,
  },
]

export const LeaderboardPage: FC = () => {
  return (
    <div className={styles.wrap}>
      <Flex justify="space-between" align="center">
        <Title>Таблица лидеров</Title>
        <Flex align="center" gap={8}>
          <Text type="secondary">Ваша позиция:</Text>
          <Text>100</Text>
        </Flex>
      </Flex>

      <Table<DataType>
        columns={columns}
        dataSource={mockData}
        pagination={{ position: ['bottomCenter'] }}
      />
    </div>
  )
}
