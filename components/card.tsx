interface CardProps {
  name: string
  type: string
  formattedDate: string
}

export function Card({ name, type, formattedDate }: CardProps) {
  return (
    <div className="border rounded-lg p-4 bg-slate-300 text-slate-700 dark:text-slate-400 dark:bg-slate-900 shadow-md max-w-96 m-5">
      <h1 className="text-xl font-bold mb-2">{name}</h1>
      <p className="mb-2">Type: {type}</p>
      <p>Created at: {formattedDate}</p>
    </div>
  )
}
