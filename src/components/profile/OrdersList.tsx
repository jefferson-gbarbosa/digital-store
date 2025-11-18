// const statusMapBackendToFrontend: Record<
//   string,
//   'Processing' | 'Shipped' | 'Delivered' | 'Cancelled'
// > = {
//   pending: 'Processing',
//   confirmed: 'Processing',
//   shipped: 'Shipped',
//   delivered: 'Delivered',
//   canceled: 'Cancelled',
// }

function OrdersList() {
  // const { user, isLoading } = useAuthStore()
  // const { fetchUserTimelineById, timeline } = useTrackingStore()

  // useEffect(() => {
  //   if (user?.id) {
  //     fetchUserTimelineById(user.id)
  //   }
  // }, [user?.id, fetchUserTimelineById])

  // if (isLoading) return <p>Carregando pedidos...</p>

  // if (timeline.length === 0)
  //   return <p className="text-gray-600 text-sm">Nenhum pedido encontrado.</p>

  return (
    <div className="space-y-6">
      Atualização
      {/* {timeline.map((event) => (
        <div
          key={event.id}
          className="border rounded-2xl p-4 shadow-sm bg-white"
        >
          <p className="text-sm text-gray-600 mb-2">
            Atualização em:{' '}
            <span className="font-medium">
              {new Date(event.event_date).toLocaleString('pt-BR')}
            </span>
          </p>
          <OrderTimeline
            status={statusMapBackendToFrontend[event.status] || 'Processing'}
          />
          {event.description && (
            <p className="text-xs text-gray-500 mt-2">{event.description}</p>
          )}
        </div>
      ))} */}
    </div>
  )
}

export default OrdersList
