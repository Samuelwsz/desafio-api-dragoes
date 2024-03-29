"use client"

import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { createDragon } from "@/lib/funtions"

const schema = z.object({
  name: z.string().min(1).max(255),
  type: z.string().min(1).max(255),
})

type DragonSchema = z.infer<typeof schema>

export default function CreateDragon() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<DragonSchema>({
    resolver: zodResolver(schema),
  })

  // Função onSubmit para lidar com o envio do formulário
  const onSubmit = (data: DragonSchema) => createDragon(data, reset)

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
        onSubmit={handleSubmit(onSubmit)}
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
            {...register("name")}
            className={`shadow appearance-none border rounded w-full py-2 px-3 dark:text-white leading-tight focus:outline-none focus:shadow-outline ${
              errors.name ? "border-red-500" : ""
            }`}
            placeholder="Enter the dragon's name"
          />
          {errors.name && (
            <p className="text-red-500 text-xs italic">
              {" "}
              {errors.name.message}{" "}
            </p>
          )}
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
            {...register("type")}
            className={`shadow appearance-none border rounded w-full py-2 px-3 dark:text-white leading-tight focus:outline-none focus:shadow-outline ${
              errors.type ? "border-red-500" : ""
            }`}
            placeholder="Enter the type of dragon"
          />
          {errors.type && (
            <p className="text-red-500 text-xs italic">
              {" "}
              {errors.type.message}{" "}
            </p>
          )}
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
