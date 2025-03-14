import { notification } from 'antd'
import { NotificationPlacement } from 'antd/es/notification/interface'

export class Notification {
  private static showNotification(
    type: 'success' | 'error',
    description: string,
    placement: NotificationPlacement = 'topRight',
    showProgress = true
  ) {
    notification[type]({
      message: type === 'success' ? 'Успешно' : 'Ошибка',
      description,
      placement,
      showProgress,
    })
  }

  static success(
    description: string,
    placement?: NotificationPlacement,
    showProgress?: boolean
  ) {
    this.showNotification('success', description, placement, showProgress)
  }

  static error(
    description: string,
    placement?: NotificationPlacement,
    showProgress?: boolean
  ) {
    this.showNotification('error', description, placement, showProgress)
  }
}

export default Notification
