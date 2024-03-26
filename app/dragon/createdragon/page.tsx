"use client"

import axios from "axios"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function CreateDragon() {
  const [name, setName] = useState("")
  const [type, setType] = useState("")

  const handleFormSubmit = async (e: any) => {
    e.preventDefault()

    try {
      const response = await axios.post(
        "http://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1/dragon",
        {
          name,
          type,
        }
      )

      console.log("Novo dragão criado:", response.data)
    } catch (error) {
      console.error("Erro ao criar novo dragão:", error)
    }
    setName("")
    setType("")
  }

  return (
    <>
      <div className="ml-9 mt-3">
        <Link href={"/dragon"} className="flex items-center">
          <div className="dark:bg-slate-100 bg-slate-800 flex items-center dark:text-slate-900 text-slate-200 p-1 px-2 rounded-sm">
            <ArrowLeft className="h-4 w-4" />
            <h1 className="text-lg">Return</h1>
          </div>
        </Link>
      </div>

      <form
        onSubmit={handleFormSubmit}
        className="max-w-sm mx-auto bg-slate-400 shadow-md rounded px-8 pt-6 pb-8 my-4"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name:
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:text-white dark:bg-slate-800"
            placeholder="Enter the dragon's name"
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="type"
          >
            Type:
          </label>
          <input
            id="type"
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:text-white dark:bg-slate-800"
            placeholder="Enter the type of dragon"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline m-auto"
            type="submit"
          >
            Create Dragon
          </button>
        </div>
      </form>
    </>
  )
}
