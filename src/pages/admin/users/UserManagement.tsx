import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { useAuthStore } from '../../../stores/authStore'
import { InputField, InputRoot } from '../../../components/ui/Input'
import { Link } from 'react-router-dom'
import { useUserStore } from '../../../stores/userStore'

const userSchema = z
  .object({
    firstname: z.string().min(1, 'O nome é obrigatório'),
    surname: z.string().min(1, 'O sobrenome é obrigatório'),
    email: z.string().min(1, 'O email é obrigatório').email('Email inválido'),
    password: z.string().min(1, 'A senha é obrigatória').min(3, 'Muito curto'),
    confirmPassword: z.string().min(1, 'A confirmação de senha é obrigatória'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  })

type UserFormData = z.infer<typeof userSchema>

type User = {
  _id: number
  name: string
  surname: string
  email: string
  role: 'customer' | 'admin'
}

type ApiUser = {
  id: number
  firstname: string
  surname: string
  email: string
  role: 'customer' | 'admin'
}

const UserManagement = () => {
  const { signupAdmin } = useAuthStore()
  const { fetchUsers, deleteUser } = useUserStore()
  const [users, setUsers] = useState<User[]>([])

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
  })

  useEffect(() => {
    const loadUsers = async () => {
      const fetchedUsers = await fetchUsers()
      if (fetchedUsers) {
        const formattedUsers = (fetchedUsers as ApiUser[]).map((u) => ({
          _id: u.id,
          name: u.firstname,
          surname: u.surname,
          email: u.email,
          role: u.role,
        }))
        setUsers(formattedUsers)
      }
    }
    loadUsers()
  }, [fetchUsers])

  // Adiciona novo usuário
  const onSubmit = async (data: UserFormData) => {
    try {
      await signupAdmin(
        data.firstname,
        data.surname,
        data.email,
        data.password,
        data.confirmPassword,
      )
      alert('Administrador cadastrado com sucesso!')
      reset()
      // Atualiza lista após o cadastro
      const updatedUsers = await fetchUsers()
      if (updatedUsers) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const formatted = updatedUsers.map((u: any) => ({
          _id: u.id,
          name: u.firstname,
          surname: u.surname,
          email: u.email,
          role: u.role,
        }))
        setUsers(formatted)
      }
    } catch (err) {
      console.error('Erro ao cadastrar admin:', err)
      alert('Erro ao cadastrar administrador.')
    }
  }
  // Deleta usuário
  const handleDeleteUser = async (userId: number) => {
    if (window.confirm('Tem certeza que deseja deletar este usuário?')) {
      try {
        await deleteUser(userId)
        alert('Usuário deletado com sucesso!')
      } catch (err) {
        alert('Erro ao deletar usuário.')
      }
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">User Management</h2>
      <div className="p-6 rounded-lg mb-6">
        <h3 className="text-lg font-bold mb-4">Add New User</h3>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
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
          <button
            type="submit"
            className="bg-green text-white px-4 py-2 rounded hover:bg-dark-gray cursor-pointer"
          >
            Add User
          </button>
        </form>
      </div>
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full text-left text-dark-gray-2">
          <thead className="bg-light-gray-2 text-xs uppercase text-dark-gray">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                className="border-b hover:bg-light-gray-1 cursor-pointer"
              >
                <td className="p-4 font-medium text-dark-gray whitespace-nowrap">
                  {user.name} {user.surname}
                </td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">
                  {user.role === 'admin' ? 'Admin' : 'Customer'}
                </td>
                <td className="p-4">
                  <button
                    onClick={() => handleDeleteUser(user._id)}
                    className="bg-tertiary text-white px-4 py-2 rounded hover:bg-dark-gray cursor-pointer"
                  >
                    Delete
                  </button>
                  <Link
                    to={`/admin/users/edit/${user._id}`}
                    className="bg-warning text-white hover:underline ml-2 px-2 py-1 cursor-pointer"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UserManagement
