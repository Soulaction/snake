import { Flex, Table, Typography } from 'antd'
import type { TableProps } from 'antd'
import { FC, useEffect, useState } from 'react'
import styles from '../ForumPage/ForumPage.module.css'
import { useInitStatePage } from '@/shared/hooks/useInitStatePage'
import {
  INewLeader,
  leaderboardController,
} from '@/shared/controllers/leaderboard-controller'

const { Title, Text } = Typography

interface IResponseLeaders {
  data: INewLeader
}

export interface DataType {
  key: string
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
  useInitStatePage({ initPage: initLeaderboardPage })
  const [leadersList, setLeadersList] = useState<DataType[]>([])

  useEffect(() => {
    leaderboardController.getLeaders().then(response => {
      const data = response?.data
      setLeadersList(
        data.map((item: IResponseLeaders, index: number) => {
          return {
            key: index + 1,
            name: item.data.name,
            score: item.data.score_ypgang,
          }
        })
      )
    })
  }, [])

  return (
    <div className={styles.wrap}>
      <Title>Таблица лидеров</Title>

      <Table<DataType>
        columns={columns}
        dataSource={leadersList}
        pagination={{ position: ['bottomCenter'], hideOnSinglePage: true }}
      />
    </div>
  )
}

export const initLeaderboardPage = () => Promise.resolve()
