import { Card } from "@/components/card"

interface DragonParams {
  id: string
}

export default async function Dragon({ params }: { params: DragonParams }) {
  const dragonId = params.id

  const res = await fetch(
    `http://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1/dragon/${dragonId}`
  )

  const dragon = await res.json()

  // Convertendo a string de data para um objeto Date
  const createdAtDate = new Date(dragon.createdAt)
  // Formatando a data para o formato desejado (por exemplo, dd/mm/yyyy)
  const formattedDate = `${createdAtDate.getDate()}/${
    createdAtDate.getMonth() + 1
  }/${createdAtDate.getFullYear()}`

  return (
    <>
      <Card
        name={dragon.name}
        type={dragon.type}
        formattedDate={formattedDate}
      />
    </>
  )
}
