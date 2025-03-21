import { Card, Col, Row, Rate, Avatar, Typography, Flex } from 'antd'
import { reviews } from './rewiews'
import { SectionTemplate } from '../../SectionTemplate'
import mainPageStyle from '../../MainPage.module.css'
import styles from './Reviews.module.css'

const { Text } = Typography

export const Reviews = () => {
  return (
    <SectionTemplate id="reviews" title={'Отзывы'}>
      <Row gutter={[24, 24]}>
        {reviews.map((review, index) => (
          <Col key={index} xs={24} sm={12} md={8}>
            <Card className={mainPageStyle.card}>
              <Flex gap={16} align="center" className={styles.header}>
                <Avatar src={review.avatar} alt={review.name} size={48} />
                <Flex vertical align="start">
                  <Text className={styles.name} strong>
                    {review.name}
                  </Text>
                  <Rate
                    disabled
                    defaultValue={review.rating}
                    className={styles.rating}
                  />
                </Flex>
              </Flex>
              <Text className={styles.text}>{review.review}</Text>
            </Card>
          </Col>
        ))}
      </Row>
    </SectionTemplate>
  )
}
