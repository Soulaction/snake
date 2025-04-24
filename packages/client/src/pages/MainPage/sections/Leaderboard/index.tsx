import { Button, Card, Flex, List, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
import { leaderboard } from './leaderboard'
import { SectionTemplate } from '../../SectionTemplate'
import { ArrowRightOutlined } from '@ant-design/icons'
import { RouterPaths } from '@/shared/router'
import mainPageStyle from '../../MainPage.module.css'
import styles from './Leaderboard.module.css'

const { Text } = Typography

export const Leaderboard = () => {
  const navigate = useNavigate()
  const gotoLeaderboard = () => {
    navigate(RouterPaths.LEADERBOARD)
  }

  return (
    <SectionTemplate id="leaderboard" title={'Топ игроков'} isCustomBg>
      <div className={styles.container}>
        <List
          dataSource={leaderboard}
          renderItem={player => (
            <Card className={`${mainPageStyle.card} ${styles.item}`}>
              <Flex justify="space-between" align="center">
                <Flex align="center" gap={16}>
                  <Text strong className={styles.rank}>
                    #{player.rank}
                  </Text>
                  <Text className={styles.name}>{player.name}</Text>
                </Flex>
                <Text className={styles.score} strong>
                  {player.score}
                </Text>
              </Flex>
            </Card>
          )}
        />
        <Button
          className={`${mainPageStyle.actionBtn}`}
          size="large"
          icon={<ArrowRightOutlined />}
          onClick={gotoLeaderboard}>
          К таблице лидеров
        </Button>
      </div>
    </SectionTemplate>
  )
}
