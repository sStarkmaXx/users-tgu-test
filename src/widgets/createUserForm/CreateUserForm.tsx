import { Form, Row, Col, Button } from 'react-bootstrap';
import { usersActions } from '../../store/user.slice';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import * as yup from 'yup';
import { UserType } from '../../store/users';
import { yupResolver } from '@hookform/resolvers/yup';

export type InitialValuesType = {
  avatar?: string;
  firstName: string;
  lastName: string;
  patronymic?: string;
  email: string;
  about?: string;
};

type CreateUserFormPropsType = {
  closeModalWindow: () => void;
};

const CreateUserForm: React.FC<CreateUserFormPropsType> = ({
  closeModalWindow,
}) => {
  const dispatch = useDispatch();
  const allUsers = useSelector<RootState, UserType[]>(
    (state) => state.users.allUsers
  );

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

  const initialValues: InitialValuesType = {
    avatar: '',
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
    setError,
  } = useForm<UserType>({
    mode: 'onChange',
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  const onSubmit = (values: InitialValuesType) => {
    console.log(values);
    const noUnique = allUsers.find((user) => user.email === values.email);
    if (noUnique) {
      setError('email', {
        message: 'User with this email is already registered',
      });
    } else {
      dispatch(usersActions.createNewUser(values));
      reset();
      closeModalWindow();
    }
  };

  const onError = (errors: any) => {
    console.log(errors);
  };

  return (
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
  );
};

export default CreateUserForm;
