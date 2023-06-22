import {
  Form,
  Input,
  Modal
} from 'antd'

interface AddTableModalProps {
  visible: boolean,
  onClose: () => void,
  onSubmit: (name: string, comment: string) => void,
  name: string,
  setName: (name: string) => void,
  comment: string,
  setComment: (comment: string) => void
}

const AddTableModal: React.FC<AddTableModalProps> = ({ visible, onClose, onSubmit, name, setName, comment, setComment }) => {
  const handleFormSubmit = (event: any) => {
    event.preventDefault()
    onSubmit(name, comment)
  }

  return (
    <Modal
      title="Добавить план ротации"
      open={visible}
      onCancel={onClose}
      onOk={handleFormSubmit}

    >
      <Form>
        <Form.Item
          name="Name"
          label="Имя плана"
          rules={[{ required: true }]}
        >
          <Input
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="Comment"
          label="Комментарий"
          rules={[{ required: false }]}
        >
          <Input
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AddTableModal
