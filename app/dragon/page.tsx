"use client"

import { DragonProps, FecthDragons } from "@/lib/funtions"
import { ArrowRight, X } from "lucide-react"
import Link from "next/link"

export default function DragonsPage() {
  const { dragons, deleteDragon } = FecthDragons()

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
