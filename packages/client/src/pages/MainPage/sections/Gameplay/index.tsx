import { RightOutlined } from '@ant-design/icons'
import { Typography, Row, Col, Card, Flex, Image } from 'antd'
import { SectionTemplate } from '../../SectionTemplate'
import { steps } from './steps'
import styles from './Gameplay.module.css'
import mainPageStyles from '../../MainPage.module.css'
import gameplayImg from '@/assets/images/gameplay.jpg'

const { Paragraph } = Typography

export const Gameplay = () => {
  return (
    <SectionTemplate id="gameplay" title={'Как играть?'}>
      <Row gutter={[32, 32]} align="middle">
        <Col xs={24} md={12}>
          <Flex vertical gap="large">
            {steps.map((step, index) => (
              <Flex align="start" key={index} gap="large">
                <Flex justify="center" align="center" className={styles.circle}>
                  <RightOutlined color="white" />
                </Flex>
                <div>
                  <h6 className={styles.title}>{step.title}</h6>
                  <Paragraph className={styles.description}>
                    {step.text}
                  </Paragraph>
                </div>
              </Flex>
            ))}
          </Flex>
        </Col>
        <Col xs={24} md={12}>
          <Card hoverable className={mainPageStyles.card}>
            <Image src={gameplayImg} />
          </Card>
        </Col>
      </Row>
    </SectionTemplate>
  )
}
