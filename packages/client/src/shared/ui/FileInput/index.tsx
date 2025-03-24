import { FC, useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { Image, Upload } from 'antd'
import type { UploadFile, UploadProps } from 'antd'
import { getBase64 } from './libs'
import { FileType } from './libs/getBase64'
import { useAppSelector } from '@/shared/hooks'
import { resourcesYandex } from '@/shared/constants/api'

interface IFileInputProps {
  imgUrl?: string
}

export const FileInput: FC<IFileInputProps> = ({ imgUrl }) => {
  const user = useAppSelector(state => state.user.user)
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

  console.log({ file, user }, file.length > 0 || user.avatar)

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType)
    }
    setPreviewImage(file.url || (file.preview as string))
    setPreviewOpen(true)
  }

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    if (newFileList[0] && newFileList[0].status === 'error') {
      setFile([{ ...newFileList[0], status: 'done' }])
    } else {
      setFile(newFileList)
    }
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
        action={resourcesYandex}
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
