import { object, string } from 'yup'

export const loginSchema = object({
  email: string()
    .email('Debe ingresarse un correo electrónico.')
    .required('El campo es requerido.'),
  password: string()
    .required('El campo es requerido.')
    .min(8, 'La contraseña requiere mínimo 8 caracteres.')
    .max(100, 'La contraseña requiere máximo 100 caracteres.'),
}).required()

export const loginDefaultValues = {
  email: '',
  password: ''
}
