import { FC, useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { Image, Upload } from 'antd'
import type { UploadFile, UploadProps } from 'antd'
import { getBase64 } from './libs'
import { FileType } from './libs/getBase64'
import { useAppDispatch, useAppSelector } from '@/shared/hooks'
import { resourcesYandex } from '@/shared/constants/api'
import { changeAvatar } from '@/entities/User/service'

interface IFileInputProps {
  imgUrl?: string
}

export const FileInput: FC<IFileInputProps> = ({ imgUrl }) => {
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [file, setFile] = useState<UploadFile[]>(
    imgUrl
      ? [
          {
            uid: imgUrl || '1',
            name: 'image.png',
            status: 'done',
            url: `${resourcesYandex}${imgUrl}`,
          },
        ]
      : []
  )

  const dispatch = useAppDispatch()

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType)
    }
    setPreviewImage(file.url || (file.preview as string))
    setPreviewOpen(true)
  }

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    if (newFileList[0]) {
      const formData = new FormData()
      formData.append('avatar', newFileList[0].originFileObj as File)
      dispatch(changeAvatar(formData))
    }
    setFile(newFileList)
  }

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Добавить аватар</div>
    </button>
  )

  return (
    <>
      {imgUrl && (
        <Image
          wrapperStyle={{ display: 'none' }}
          preview={{
            visible: previewOpen,
            onVisibleChange: visible => setPreviewOpen(visible),
            afterOpenChange: visible => !visible && setPreviewImage(''),
          }}
          src={previewImage}
        />
      )}
      <Upload
        style={{ width: '300px', height: '300px' }}
        listType="picture-card"
        fileList={file}
        onPreview={handlePreview}
        showUploadList={{
          showRemoveIcon: true,
        }}
        onChange={handleChange}>
        {file.length > 0 ? null : uploadButton}
      </Upload>
    </>
  )
}
