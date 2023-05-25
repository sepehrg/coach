import React, { PropsWithChildren } from 'react';
import { Form, message, Modal } from 'antd';

interface EditFormProps {
  onSubmit: (...args: any) => void;
  onCancel: () => void;
  title: string;
}

const EditForm: React.FC<EditFormProps & PropsWithChildren> = ({
  onCancel,
  onSubmit,
  title,
  children,
}) => {
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  };

  const [form] = Form.useForm();

  const handleSubmitForm = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        onSubmit(values);
        onCancel();
      })
      .catch(() => message.error('Validate error'));
  };

  return (
    <Modal
      visible
      onCancel={onCancel}
      title={title}
      onOk={handleSubmitForm}
      style={{
        padding: '20px 10px 0 10px',
      }}
    >
      <Form form={form} {...layout}>
        {children}
      </Form>
    </Modal>
  );
};

export default EditForm;
