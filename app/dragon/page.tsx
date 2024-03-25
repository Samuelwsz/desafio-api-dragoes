import Link from "next/link"

interface DragonProps {
  id: string
  name: string
}

export default async function DragonsPage() {
  const res = await fetch(
    "http://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1/dragon"
  )

  const data = await res.json()
  // console.log(data)

  return (
    <>
      <h1 className="font-semibold text-3xl text-center dark:text-slate-300 text-slate-800 my-10">
        List of Dragons
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 container">
        {data.map((dragon: DragonProps) => {
          return (
            <Link
              href={`/dragon/${dragon.id}`}
              key={dragon.id}
              className="border rounded-lg p-4 bg-slate-400/70 text-slate-700 dark:text-slate-400 dark:bg-slate-800/40 shadow-md"
            >
              <h1 className="text-xl font-bold mb-2 text-center">
                {dragon.name}
              </h1>
            </Link>
          )
        })}
      </div>
    </>
  )
}
