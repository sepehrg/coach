import React from 'react';
import { Alert } from 'antd';

interface ILoginMessageProps {
  content: string;
}

const LoginMessage: React.FC<ILoginMessageProps> = ({ content }) => (
  <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
);

export default LoginMessage;
