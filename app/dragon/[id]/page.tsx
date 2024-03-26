"use client"

import { Card } from "@/components/card"
import axios from "axios"
import { SquareX } from "lucide-react"
import { useEffect, useState } from "react"

interface DragonParams {
  id: string
}

export default function Dragon({ params }: { params: DragonParams }) {
  const dragonId = params.id

  const [dragon, setDragon] = useState<any>(null)

  useEffect(() => {
    const fetchDragon = async () => {
      const res = await axios.get(
        `http://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1/dragon/${dragonId}`
      )
      const data = await res.data
      setDragon(data)
    }
    fetchDragon()
  }, [dragonId])

  // Convertendo a string de data para um objeto Date
  const createdAtDate = new Date(dragon?.createdAt)
  // Formatando a data para o formato desejado (por exemplo, dd/mm/yyyy)
  const formattedDate = `${createdAtDate.getDate()}/${
    createdAtDate.getMonth() + 1
  }/${createdAtDate.getFullYear()}`

  const [newName, setNewName] = useState("")
  const [newType, setNewType] = useState("")

  // Estado para controlar a exibição do formulário de edição
  const [isEditing, setIsEditing] = useState(false)

  // Função para atualizar os dados do dragão
  const updateDragon = async () => {
    try {
      await axios.put(
        `http://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1/dragon/${dragonId}`,
        { name: newName, type: newType }
      )

      console.log("Dados do dragão atualizados com sucesso!")

      // Atualizar o estado do dragão com os novos dados
      setDragon((prevDragon: any) => ({
        ...prevDragon,
        name: newName,
        type: newType,
      }))

      // Fechar o formulário de edição após a atualização
      setIsEditing(false)
    } catch (error) {
      console.error("Erro ao atualizar dados do dragão:", error)
    }
    setNewName("")
    setNewType("")
  }

  // Função para lidar com o clique no ícone de edição
  const handleEdit = () => {
    // Exibir o formulário de edição
    setIsEditing(true)
  }

  return (
    <>
      <div className="container">
        {dragon && (
          <Card
            name={dragon.name}
            type={dragon.type}
            formattedDate={formattedDate}
            handleEdit={handleEdit}
          />
        )}
        {isEditing && (
          <div className="container">
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="New dragon name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="border border-slate-600  rounded-md px-3 py-2 outline-none bg-slate-300 text-slate-700 dark:text-slate-300 dark:bg-slate-700"
              />
              <input
                type="text"
                placeholder="New type of dragon"
                value={newType}
                onChange={(e) => setNewType(e.target.value)}
                className="border border-slate-600  rounded-md px-3 py-2 outline-none bg-slate-300 text-slate-700 dark:bg-slate-700 dark:text-slate-300"
              />
              <SquareX
                onClick={() => setIsEditing(false)}
                className="cursor-pointer"
              />
            </div>

            <button
              onClick={updateDragon}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mt-5"
            >
              Update Dragon Data
            </button>
          </div>
        )}
      </div>
    </>
  )
}
