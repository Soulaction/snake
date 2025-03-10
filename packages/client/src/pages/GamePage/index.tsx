import { Game, MainLayout } from '@/widgets'

export const GamePage = () => {
  return (
    <MainLayout isHeader={false}>
      <Game />
    </MainLayout>
  )
}
