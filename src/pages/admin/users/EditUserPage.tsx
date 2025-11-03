import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { InputField, InputRoot } from '../../../components/ui/Input'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useUserStore } from '../../../stores/userStore'

const EditUserSchema = z.object({
  firstname: z.string().min(1, 'First name is required'),
  surname: z.string().min(1, 'Surname is required'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  role: z.enum(['customer', 'admin']).optional(),
})

type EditUserFormData = z.infer<typeof EditUserSchema>
function EditUserPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  // const { fetchUserById, updateUser } = useAuthStore()
  const { fetchUserById, updateUser } = useUserStore()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EditUserFormData>({
    resolver: zodResolver(EditUserSchema),
  })

  useEffect(() => {
    if (!id) return
    const loadUser = async () => {
      try {
        const user = await fetchUserById(Number(id))
        if (user) {
          reset({
            firstname: user.firstname,
            surname: user.surname,
            email: user.email,
            role: user.role as 'customer' | 'admin',
          })
        } else {
          alert('Usuário não encontrado.')
          navigate('/admin/users')
        }
      } catch (err) {
        console.error(err)
        alert('Erro ao carregar usuário.')
        navigate('/admin/users')
      }
    }
    loadUser()
  }, [id, fetchUserById, reset, navigate])

  const onSubmit = async (data: EditUserFormData) => {
    if (!id) return
    try {
      await updateUser(
        Number(id),
        data.firstname,
        data.surname,
        data.email,
        data.role,
      )
      alert('Usuário atualizado com sucesso!')
      navigate('/admin/users')

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err)
      alert(err.message || 'Erro ao atualizar usuário.')
    }
  }
  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="p-6 rounded-lg mb-6">
        <h3 className="p-6 rounded-lg mb-6">Edit User</h3>
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
          <InputRoot label="Role" id="role" error={errors.role?.message}>
            <select
              {...register('role')}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
            </select>
          </InputRoot>
          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-green text-white px-4 py-2 rounded hover:bg-dark-gray cursor-pointer"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/users')}
              className="bg-tertiary text-white px-4 py-2 rounded hover:bg-dark-gray cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditUserPage
