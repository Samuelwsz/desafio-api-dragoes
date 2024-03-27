import { ArrowLeft, Edit } from "lucide-react"
import Link from "next/link"

interface CardProps {
  name: string
  type: string
  formattedDate: string
  handleEdit: () => void
}

export function Card({ name, type, formattedDate, handleEdit }: CardProps) {
  return (
    <div className="relative border rounded-lg p-4 bg-slate-300 text-slate-700 dark:text-slate-400 dark:bg-slate-900 shadow-md max-w-96 m-5">
      <div className="absolute top-1 right-1">
        <div className="flex items-center">
          <div className="dark:text-slate-200 text-slate-800 flex items-center p-1 px-2 rounded-sm">
            <Edit
              className="h-5 w-5 mr-3 cursor-pointer"
              onClick={handleEdit}
            />{" "}
            <Link href={"/dragon"}>
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
      <h1 className="text-xl font-bold mb-2">{name}</h1>
      <p className="mb-2">Type: {type}</p>
      <p>Created at: {formattedDate}</p>
    </div>
  )
}
