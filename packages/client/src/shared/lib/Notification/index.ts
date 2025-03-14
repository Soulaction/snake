import { notification } from 'antd'

export class Notification {
  static success(description: string) {
    notification.success({
      message: 'Успешно',
      description,
      placement: 'topRight',
      showProgress: true,
    })
  }

  static error(description: string) {
    notification.error({
      message: 'Ошибка',
      description,
      placement: 'topRight',
      showProgress: true,
    })
  }
}
