import { FC, useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { Image, Upload } from 'antd'
import type { UploadFile, UploadProps } from 'antd'
import { getBase64 } from './libs'
import { FileType } from './libs/getBase64'
import { resourcesYandex } from '@/shared/constants/api'

interface IFileInputProps {
  imgUrl?: string
  onChange?: (value: FormData) => void
}

export const FileInput: FC<IFileInputProps> = ({ imgUrl, onChange }) => {
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

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType)
    }
    setPreviewImage(file.url || (file.preview as string))
    setPreviewOpen(true)
  }

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFile(newFileList)
    const lastFile = newFileList[newFileList.length - 1]
    if (lastFile && lastFile.originFileObj) {
      const formData = new FormData()
      formData.append('avatar', lastFile.originFileObj as File)
      onChange?.(formData)
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
        beforeUpload={() => false}
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
