import React, { useState } from 'react';
import { Toast, Row, Col } from 'react-bootstrap';

type ToastPropsType = {
  isShow: boolean;
  message: string;
};

const AutoHideToast: React.FC<ToastPropsType> = ({ isShow, message }) => {
  const [show, setShow] = useState(isShow);

  return (
    <Row>
      <Col xs={6}>
        <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
          <Toast.Header></Toast.Header>
          <Toast.Body>{message}</Toast.Body>
        </Toast>
      </Col>
    </Row>
  );
};

export default AutoHideToast;
