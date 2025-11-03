import { CheckCircle2, CircleDot, XCircle } from 'lucide-react' // Exemplo: usando lucide-react

interface OrderTimelineProps {
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled'
}

const successSteps = [
  { key: 'Processing', label: 'Pedido Recebido' },
  { key: 'Shipped', label: 'Enviado' },
  { key: 'Delivered', label: 'Entregue' },
]

export default function OrderTimeline({ status }: OrderTimelineProps) {
  if (status === 'Cancelled') {
    return (
      <div className="flex items-center gap-2 mt-4">
        <XCircle className="text-error" size={22} />
        <span className="text-sm font-medium text-error">Pedido Cancelado</span>
      </div>
    )
  }

  const currentStepIndex = successSteps.findIndex((step) => step.key === status)

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4 gap-4">
      {successSteps.map((step, index) => {
        const isCompleted = index <= currentStepIndex
        const isLastStep = index === successSteps.length - 1

        return (
          <div key={step.key} className="flex items-center w-full sm:w-auto">
            <div className="flex items-center gap-2">
              {isCompleted ? (
                <CheckCircle2 className="text-success" size={22} />
              ) : (
                <CircleDot className="text-light-gray-2" size={22} />
              )}
              <span
                className={`text-sm ${
                  isCompleted ? 'text-dark-gray-2 font-medium' : 'text-gray-500'
                }`}
              >
                {step.label}
              </span>
            </div>

            {/* Linha de conexão */}
            {!isLastStep && (
              <div
                className={`
                  flex-1 h-[2px] ml-2 
                  sm:w-16 sm:mx-2
                  ${isCompleted ? 'bg-success' : 'bg-light-gray-2'}
                `}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
