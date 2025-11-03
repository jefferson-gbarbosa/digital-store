import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../stores/authStore'

function DeleteAccount() {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()

  const handleDelete = async () => {
    if (!user?.id) return
    const confirm = window.confirm(
      'Tem certeza que deseja excluir sua conta? Essa ação é irreversível!',
    )
    if (!confirm) return
    logout()
    navigate('/')
  }
  return (
    <div className="text-center">
      <p className="text-gray-600 mb-4">
        Se desejar, você pode encerrar sua conta permanentemente. Todos os dados
        serão removidos.
      </p>
      <button
        onClick={handleDelete}
        className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
      >
        Excluir minha conta
      </button>
    </div>
  )
}

export default DeleteAccount
