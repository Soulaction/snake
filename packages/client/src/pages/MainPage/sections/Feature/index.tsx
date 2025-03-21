import { features } from './feature-items'
import { Row, Col, Card, Typography } from 'antd'
import { SectionTemplate } from '../../SectionTemplate'
import styles from './Feature.module.css'
import mainStyles from '../../MainPage.module.css'

const { Paragraph } = Typography

export const Feature = () => {
  return (
    <SectionTemplate id="feature" title={'Почему стоит играть?'} isCustomBg>
      <Row gutter={[24, 24]} justify="start">
        {features.map((feature, index) => (
          <Col key={index} xs={24} sm={12} md={8}>
            <Card hoverable className={mainStyles.card}>
              <feature.icon className={mainStyles.icon} />
              <h6 className={styles.title}>{feature.title}</h6>
              <Paragraph className={styles.description} strong>
                {feature.description}
              </Paragraph>
            </Card>
          </Col>
        ))}
      </Row>
    </SectionTemplate>
  )
}
