import { DragonSchema } from "@/app/dragon/[id]/page"
import axios from "axios"
import { useEffect, useState } from "react"

export interface DragonProps {
  id: string
  name: string
}

export interface DragonDataProps {
  id: string
  name: string
  type: string
  createdAt: string
}

export const FecthDragons = () => {
  const [dragons, setDragons] = useState<DragonProps[]>([])

  const fetchData = async () => {
    try {
      const res = await axios.get(
        "http://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1/dragon"
      )
      const data = await res.data

      //filtra os dragões em ordem alfabetica
      const sortedDragons = data.sort((a: DragonProps, b: DragonProps) =>
        a.name.localeCompare(b.name)
      )
      setDragons(sortedDragons)
    } catch (error) {
      console.error("Erro ao buscar dados:", error)
    }
  }

  const deleteDragon = async (id: string) => {
    try {
      await axios.delete(
        `http://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1/dragon/${id}`
      )
      // Atualize a lista de dragões após a exclusão
      setDragons(dragons.filter((dragon) => dragon.id !== id))
    } catch (error) {
      console.error("Erro ao deletar dragão:", error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return {
    dragons,
    deleteDragon,
  }
}

export const fetchDragonById = async (
  dragonId: string
): Promise<DragonDataProps | null> => {
  try {
    const res = await axios.get(
      `http://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1/dragon/${dragonId}`
    )
    const data: DragonDataProps = res.data
    return data
  } catch (error) {
    console.error("Erro ao buscar detalhes do dragão:", error)
    return null
  }
}

export const updateDragonById = async (
  dragonId: string,
  data: DragonSchema
): Promise<void> => {
  try {
    await axios.put(
      `http://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1/dragon/${dragonId}`,
      data
    )

    console.log("Dados do dragão atualizados com sucesso!")
  } catch (error) {
    console.error("Erro ao atualizar dados do dragão:", error)
    throw error // Lança o erro para que possa ser tratado pelo componente que chama esta função, se necessário
  }
}

export const createDragon = async (data: DragonSchema, reset: () => void) => {
  try {
    const response = await axios.post(
      "http://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1/dragon",
      data
    )

    console.log("Novo dragão criado:", response.data)
    // Resetar o formulário após o envio bem-sucedido
    reset()
  } catch (error) {
    console.error("Erro ao criar novo dragão:", error)
  }
}
