import { Link, useNavigate } from 'react-router-dom'
import { Button } from 'primereact/button'
import Logo from '../../components/shared/Logo'
import logo from '../../assets/logos/logo-header.svg'
import { InputField, InputRoot } from '../../components/ui/Input'
import z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuthStore } from '../../stores/authStore'

const registerSchema = z
  .object({
    firstname: z.string().min(1, 'This is required'),
    surname: z.string().min(1, 'This is required'),
    email: z.string().min(1, 'This is required').email('Must be a valid email'),
    password: z.string().min(1, 'This is required').min(3, 'Too short'),
    confirmPassword: z.string().min(1, 'This is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

type RegisterSchema = z.infer<typeof registerSchema>

const RegisterPage = () => {
  const navigate = useNavigate()
  const { signupPublic, error: authError } = useAuthStore()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data: RegisterSchema) => {
    try {
      await signupPublic(
        data.firstname,
        data.surname,
        data.email,
        data.password,
        data.confirmPassword,
      )
      navigate('/login')
    } catch (error) {
      console.error('Erro ao cadastrar:', error)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-light-gray-3 p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <Logo img={{ src: logo, alt: 'Digital Store' }} />
        </div>
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-dark-gray-2 mb-6 text-center">
            Crie sua conta
          </h2>
          {authError && (
            <p className="text-error text-center mb-4">
              Falha no registro. Verifique suas credenciais.
            </p>
          )}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-4 gap-y-4">
              <InputRoot
                label="Nome*"
                id="firstname"
                error={errors.firstname?.message}
              >
                <InputField
                  type="text"
                  placeholder="Digite seu nome"
                  {...register('firstname')}
                  error={!!errors.firstname}
                />
              </InputRoot>
              <InputRoot
                label="Sobrenome*"
                id="surname"
                error={errors.surname?.message}
              >
                <InputField
                  type="text"
                  placeholder="Digite seu sobrenome"
                  {...register('surname')}
                  error={!!errors.surname}
                />
              </InputRoot>
            </div>
            <InputRoot label="Email*" id="email" error={errors.email?.message}>
              <InputField
                type="email"
                placeholder="Digite seu email"
                {...register('email')}
                error={!!errors.email}
              />
            </InputRoot>
            <InputRoot
              label="Senha*"
              id="password"
              error={errors.password?.message}
            >
              <InputField
                type="password"
                placeholder="Digite sua senha"
                {...register('password')}
                error={!!errors.password}
              />
            </InputRoot>
            <InputRoot
              label="Confirme a senha*"
              id="passwordConfirm"
              error={errors.confirmPassword?.message}
            >
              <InputField
                type="password"
                placeholder="Digite a senha novamente"
                {...register('confirmPassword')}
                error={!!errors.confirmPassword}
              />
            </InputRoot>
            <Button
              label="Cadastrar"
              className="bg-primary text-white font-bold rounded-lg h-12 mt-4"
            />
          </form>
          <p className="text-center text-dark-gray-2 mt-6">
            Já tem uma conta?{' '}
            <Link
              to="/login"
              className="text-primary font-bold hover:underline"
            >
              Faça login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
