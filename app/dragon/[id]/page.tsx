"use client"

import { Card } from "@/components/card"
import {
  DragonDataProps,
  fetchDragonById,
  updateDragonById,
} from "@/lib/funtions"
import { formatDate } from "@/lib/formatDate"
import { zodResolver } from "@hookform/resolvers/zod"
import { SquareX } from "lucide-react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

interface DragonParams {
  id: string
}

const schema = z.object({
  name: z.string().min(1).max(255),
  type: z.string().min(1).max(255),
})

export type DragonSchema = z.infer<typeof schema>

export default function Dragon({ params }: { params: DragonParams }) {
  const dragonId = params.id

  const [dragon, setDragon] = useState<DragonDataProps | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<DragonSchema>({
    resolver: zodResolver(schema),
  })

  useEffect(() => {
    const fetchDragonData = async () => {
      const data = await fetchDragonById(dragonId)
      setDragon(data)
    }
    fetchDragonData()
  }, [dragonId])

  const formattedDate = formatDate(dragon?.createdAt)

  // Estado para controlar a exibição do formulário de edição
  const [isEditing, setIsEditing] = useState(false)

  // Função para atualizar os dados do dragão
  const updateDragon = async (data: DragonSchema) => {
    try {
      await updateDragonById(dragonId, data)

      console.log("Dados do dragão atualizados com sucesso!")

      // Atualizar o estado do dragão com os novos dados
      setDragon((prevDragon: DragonDataProps | null) => ({
        ...prevDragon!,
        name: data.name,
        type: data.type,
      }))

      // Fechar o formulário de edição após a atualização
      setIsEditing(false)
      reset()
    } catch (error) {
      console.error("Erro ao atualizar dados do dragão:", error)
    }
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
          <form className="container" onSubmit={handleSubmit(updateDragon)}>
            <div className="flex gap-3">
              <div>
                <input
                  type="text"
                  placeholder="New dragon name"
                  {...register("name")}
                  className="border border-slate-600  rounded-md px-3 py-2 outline-none bg-slate-300 text-slate-700 dark:text-slate-300 dark:bg-slate-700"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs italic mt-2">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="text"
                  placeholder="New type of dragon"
                  {...register("type")}
                  className="border border-slate-600  rounded-md px-3 py-2 outline-none bg-slate-300 text-slate-700 dark:bg-slate-700 dark:text-slate-300"
                />
                {errors.type && (
                  <p className="text-red-500 text-xs italic mt-2">
                    {errors.type.message}
                  </p>
                )}
              </div>

              <SquareX
                onClick={() => setIsEditing(false)}
                className="cursor-pointer"
              />
            </div>

            <button
              type="submit"
              // onClick={updateDragon}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mt-5"
            >
              Update Dragon Data
            </button>
          </form>
        )}
      </div>
    </>
  )
}
