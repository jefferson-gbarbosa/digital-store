import { useState } from 'react'
import ProfileForm from '../../components/profile/ProfileForm'
import OrdersList from '../../components/profile/OrdersList'
import DeleteAccount from '../../components/profile/DeleteAccount'

export default function UserPage() {
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'delete'>(
    'profile',
  )

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <h2 className="text-2xl font-bold mb-6 text-center sm:text-left">
        Área do Usuário
      </h2>
      <div className="flex flex-col sm:flex-row sm:justify-start gap-2 mb-6 border-b border-light-gray-2">
        {['profile', 'orders', 'delete'].map((tab) => {
          const label =
            tab === 'profile'
              ? 'Perfil'
              : tab === 'orders'
                ? 'Meus Pedidos'
                : 'Encerrar Conta'
          return (
            <button
              key={tab}
              onClick={() =>
                setActiveTab(tab as 'profile' | 'orders' | 'delete')
              }
              aria-current={activeTab === tab}
              className={`w-full sm:w-auto sm:mx-2 text-center px-4 py-2 font-semibold transition-colors duration-200 focus:outline-none ${
                activeTab === tab
                  ? 'border-b-2 border-success text-success'
                  : 'text-dark-gray-3 hover:text-dark-gray-2 '
              }`}
            >
              {label}
            </button>
          )
        })}
      </div>

      {/* Conteúdo */}
      <div className="w-full max-w-2xl mx-auto">
        {activeTab === 'profile' && <ProfileForm />}
        {activeTab === 'orders' && <OrdersList />}
        {activeTab === 'delete' && <DeleteAccount />}
      </div>
    </div>
  )
}
