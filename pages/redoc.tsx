import { RedocStandalone } from 'redoc'

export default function Redoc() {
  return (
    <RedocStandalone
      specUrl="/swagger.json"
      options={{
        nativeScrollbars: true,
        theme: { colors: { primary: { main: '#dd5522' } } },
      }}
    />
  )
}
