import { auth, currentUser } from "@clerk/nextjs"
import { ArrowBigRight } from "lucide-react"
import Link from "next/link"

export default async function DashboardPage() {
  const { userId } = auth()
  const user = await currentUser()

  if (!userId || !user) {
    return <div>You are not logged in</div>
  }

  return (
    <>
      <div className="mt-10 text-start max-w-3xl mx-auto bg-slate-300 p-5 rounded flex gap-44 dark:text-black">
        <div>
          <h1 className="text-4xl font-bold">Welcome</h1>
          <ul className="list-none mt-10">
            <li className="mb-2">
              <span className="font-semibold">First Name:</span>{" "}
              {user.firstName}
            </li>
            <li className="mb-2">
              <span className="font-semibold">Last Name:</span> {user.lastName}
            </li>
            <li className="mb-2">
              <span className="font-semibold">Email:</span>{" "}
              {user.emailAddresses[0].emailAddress}
            </li>
          </ul>
        </div>
        <div>
          <Link href={"/dragon"} className="font-semibold text-xl">
            <div className="flex items-center">
              Go to dragons page <ArrowBigRight className="w-6 h-7" />
            </div>
          </Link>
        </div>
      </div>
    </>
  )
}
