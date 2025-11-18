import { InputField, InputRoot } from '../ui/Input'
import z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const profileSchema = z.object({
  firstname: z.string().min(1, 'Nome obrigatório'),
  surname: z.string().min(1, 'Sobrenome obrigatório'),
  email: z.string().email('Email inválido'),
})

type ProfileFormData = z.infer<typeof profileSchema>

function ProfileForm() {
  // const { user } = useAuthStore()
  // const { fetchUserById, updateUser } = useUserStore()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({ resolver: zodResolver(profileSchema) })

  // useEffect(() => {
  //   if (user?.id) {
  //     fetchUserById(user.id).then((data) =>
  //       reset({
  //         firstname: data?.firstname,
  //         surname: data?.surname,
  //         email: data?.email,
  //       }),
  //     )
  //   }
  // }, [user, fetchUserById, reset])

  const onSubmit = async (data: ProfileFormData) => {
    // if (!user?.id) return
    // await updateUser(
    //   user.id,
    //   data.firstname,
    //   data.surname,
    //   data.email,
    //   user.role,
    // )
    // alert('Perfil atualizado com sucesso!')
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <InputRoot label="Nome" id="firstname" error={errors.firstname?.message}>
        <InputField {...register('firstname')} error={!!errors.firstname} />
      </InputRoot>

      <InputRoot label="Sobrenome" id="surname" error={errors.surname?.message}>
        <InputField {...register('surname')} error={!!errors.surname} />
      </InputRoot>

      <InputRoot label="Email" id="email" error={errors.email?.message}>
        <InputField
          type="email"
          {...register('email')}
          error={!!errors.email}
        />
      </InputRoot>

      <button className="w-full bg-green text-white py-2 rounded hover:bg-dark-gray">
        Salvar Alterações
      </button>
    </form>
  )
}

export default ProfileForm
