import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from 'primereact/button'
import { useAuthStore } from '../../stores/authStore'
import Logo from '../../components/shared/Logo'
import { InputField, InputRoot } from '../../components/ui/Input'
import logo from '../../assets/logos/logo-header.svg'

const loginSchema = z.object({
  email: z.string().min(1, 'This is required').email('Must be a valid email'),
  password: z.string().min(1, 'This is required').min(3, 'Too short'),
})

type LoginSchema = z.infer<typeof loginSchema>

const LoginPage = () => {
  const navigate = useNavigate()
  const { login, isLoading, error: authError } = useAuthStore()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginSchema) => {
    const loggedInUser = await login(data.email, data.password)
    if (loggedInUser) {
      navigate('/')
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
            Acesse sua conta
          </h2>
          {authError && (
            <p className="text-error text-center mb-4">
              Falha no login. Verifique suas credenciais.
            </p>
          )}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
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
            <Button
              type="submit"
              label={isLoading ? 'Entrando...' : 'Entrar'}
              className="bg-primary text-white font-bold rounded-lg h-12 mt-4"
              disabled={isLoading}
            />
          </form>
          <p className="text-center text-dark-gray-2 mt-6">
            Ainda não tem uma conta?{' '}
            <Link
              to="/cadastro"
              className="text-primary font-bold hover:underline"
            >
              Cadastre-se
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
