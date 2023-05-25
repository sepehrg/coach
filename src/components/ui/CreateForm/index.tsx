import React, { PropsWithChildren } from 'react';
import { Form, message, Modal } from 'antd';

interface CreateFormProps {
  submitAdding: (...args: any) => void;
  onCloseModal: () => void;
  formTitle: string;
}

const CreateForm: React.FC<CreateFormProps & PropsWithChildren> = ({
  submitAdding,
  onCloseModal,
  formTitle,
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
        submitAdding(values);
      })
      .catch(() => message.error('Validate error'));
  };

  return (
    <Modal visible onCancel={onCloseModal} title={formTitle} onOk={handleSubmitForm}>
      <Form
        form={form}
        labelAlign={'left'}
        style={{
          padding: '20px 10px 0 10px',
        }}
        {...layout}
      >
        {children}
      </Form>
    </Modal>
  );
};

export default CreateForm;
