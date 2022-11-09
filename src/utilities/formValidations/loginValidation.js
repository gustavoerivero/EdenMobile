import { object, string } from 'yup'

export const loginSchema = object({
  email: string().email().required(),
  password: string().required().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/),
}).required()

export const loginDefaultValues = {
  email: '',
  password: ''
}
