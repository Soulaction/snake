import { Row, Col, Card } from 'antd'
import { requirements } from './requirements'
import { SectionTemplate } from '../../SectionTemplate'
import mainPageStyle from '../../MainPage.module.css'
import styles from './Requirements.module.css'

export const Requirements = () => {
  return (
    <SectionTemplate id="requirements" title={'Технические требования'}>
      <Row gutter={[32, 32]} className={styles.container}>
        {requirements.map((req, index) => (
          <Col key={index} xs={24} md={12}>
            <Card className={mainPageStyle.card}>
              {req.icon}
              <h3 className={styles.title}>{req.type}</h3>
              <ul className={styles.list}>
                {req.specs.map((spec, i) => (
                  <li key={i}>{spec}</li>
                ))}
              </ul>
            </Card>
          </Col>
        ))}
      </Row>
    </SectionTemplate>
  )
}
