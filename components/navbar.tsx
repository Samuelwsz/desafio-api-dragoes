import Link from "next/link"
import { ModeToggle } from "./mode-toggle"
import { UserButton, auth } from "@clerk/nextjs"

export function NavBar() {
  const { userId } = auth()

  return (
    <header className="bg-slate-700">
      <div className="container mx-auto flex gap-3 items-center py-2 justify-between">
        <div className="flex items-center gap-3">
          <ModeToggle />
          <Link href={"/"} className="text-white">
            Home
          </Link>
          <Link href={"/dashboard"} className="text-white">Dashboard</Link>
        </div>
        <div>
          {userId ? (
            <div>
              <UserButton />
            </div>
          ) : (
            <div className="text-white flex gap-3">
              <Link href={"/sign-up"}>Sign up</Link>
              <Link href={"/sign-in"}>Sign In</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
