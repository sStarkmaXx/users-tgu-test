import { Form, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { UserType } from '../../store/users';

type ModalWindowPropsType = {
  show: boolean;
  onHide: () => void;
};

const ModalWindow: React.FC<ModalWindowPropsType> = (props) => {
  const schema = yup.object().shape({
    avatar: yup.string(),
    firstName: yup
      .string()
      .matches(/^([^0-9]*)$/, 'First name should not contain numbers')
      .required(),
    lastName: yup
      .string()
      .matches(/^([^0-9]*)$/, 'Last name should not contain numbers')
      .required(),
    patronymic: yup
      .string()
      .matches(/^([^0-9]*)$/, 'Patronymic name should not contain numbers'),
    email: yup.string().email().required(),
    about: yup.string(),
  });

  const initialValues: UserType = {
    id: 0,
    avatar: '',
    createDate: '',
    firstName: '',
    lastName: '',
    patronymic: '',
    email: '',
    about: '',
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserType>({
    mode: 'onChange',
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  const onSubmit = (values: any) => {
    console.log(values);
    reset();
  };
  const onError = (errors: any) => {
    console.log(errors);
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Create user
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit, onError)}>
          <Form.Group className="position-relative mb-3">
            <Form.Label>Avatar</Form.Label>
            <Form.Control
              {...register('avatar')}
              type="text"
              isInvalid={!!errors.avatar}
            />
            <Form.Control.Feedback type="invalid" tooltip>
              {errors.avatar?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Row>
            <Col>
              <Form.Group className="position-relative mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  {...register('firstName')}
                  type="text"
                  isInvalid={!!errors.firstName}
                />
                <Form.Control.Feedback type="invalid" tooltip>
                  {errors.firstName?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="position-relative mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  {...register('lastName')}
                  type="text"
                  isInvalid={!!errors.lastName}
                />
                <Form.Control.Feedback type="invalid" tooltip>
                  {errors.lastName?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="position-relative mb-3">
                <Form.Label>Patronymic</Form.Label>
                <Form.Control
                  {...register('patronymic')}
                  type="text"
                  isInvalid={!!errors.patronymic}
                />
                <Form.Control.Feedback type="invalid" tooltip>
                  {errors.lastName?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="position-relative mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              {...register('email')}
              type="text"
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid" tooltip>
              {errors.email?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="position-relative mb-3">
            <Form.Label>About Me</Form.Label>
            <Form.Control {...register('about')} type="text" />
          </Form.Group>
          <Button type="submit">Submit form</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalWindow;
