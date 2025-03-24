import { DesktopOutlined, MobileOutlined } from '@ant-design/icons'
import styles from '../../MainPage.module.css'

export const requirements = [
  {
    type: 'Desktop',
    icon: <DesktopOutlined className={styles.icon} />,
    specs: [
      '• Современный веб-браузер',
      '• Клавиатура для управления',
      '• Минимальное разрешение 1024x768',
    ],
  },
  {
    type: 'Mobile',
    icon: <MobileOutlined className={styles.icon} />,
    specs: [
      '• iOS 11+ или Android 7+',
      '• Сенсорный экран для управления',
      '• Минимальная ширина 320px',
    ],
  },
]
