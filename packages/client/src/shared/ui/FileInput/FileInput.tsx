import { FC, useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { Image, Upload } from 'antd'
import type { GetProp, UploadFile, UploadProps } from 'antd'

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]

export const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = error => reject(error)
  })

interface IFileInputProps {
  imgUrl?: string
}

export const FileInput: FC<IFileInputProps> = ({ imgUrl }) => {
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [file, setFile] = useState<UploadFile[]>([
    { uid: imgUrl || '1', name: 'image.png', status: 'done', url: imgUrl },
  ])

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
      <div style={{ marginTop: 8 }}>Upload</div>
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
        action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
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
