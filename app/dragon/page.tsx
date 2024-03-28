"use client"

import axios from "axios"
import { ArrowRight, X } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

interface DragonProps {
  id: string
  name: string
}

export default function DragonsPage() {
  const [dragons, setDragons] = useState<DragonProps[]>([])

  useEffect(() => {
    fetchData()
  }, [])

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

  return (
    <>
      <div className="flex justify-between container items-center">
        <h1 className="font-semibold text-3xl text-center dark:text-slate-300 text-slate-800 my-10">
          List of Dragons
        </h1>
        <Link
          href={"/dragon/createdragon"}
          className="font-semibold text-3xl text-center dark:text-slate-300 text-slate-800 my-10"
        >
          <div className="flex items-center bg-slate-800 dark:bg-white p-2 rounded-sm text-slate-100 dark:text-slate-800 ">
            <h1 className="text-lg">Create new dragon</h1>
            <ArrowRight className="h-5 w-5" />
          </div>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 container">
        {dragons.map((dragon: DragonProps) => {
          return (
            <div
              key={dragon.id}
              className="border rounded-lg p-4 bg-slate-400/70 text-slate-700 dark:text-slate-400 dark:bg-slate-800/40 shadow-md relative"
            >
              <button
                onClick={() => deleteDragon(dragon.id)}
                className="absolute top-2 right-2 text-red-400 hover:text-red-500"
              >
                <X />
              </button>
              <h1 className="text-xl font-bold mb-2 text-center">
                {dragon.name}
              </h1>

              <Link
                href={`/dragon/${dragon.id}`}
                className="dark:hover:text-slate-200 hover:text-slate-500 hover:underline"
              >
                Details
              </Link>
            </div>
          )
        })}
      </div>
    </>
  )
}

{
  /*  const deleteDragon = async (id: string) => {
    try {
      await fetch(
        `http://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1/dragon/${id}`,
        {
          method: "DELETE",
        }
      )
      // Atualize a lista de dragões após a exclusão
      setDragons(dragons.filter((dragon) => dragon.id !== id))
    } catch (error) {
      console.error("Erro ao deletar dragão:", error)
    }
  }*/
}
