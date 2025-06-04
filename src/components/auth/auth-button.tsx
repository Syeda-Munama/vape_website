import { createClient } from "@/utils/supabase/server"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import LogoutButton from "./logout-button"

export default async function AuthButton() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return user ? (
    <div className="flex items-center gap-4">
      <span className="text-sm text-gray-600">Hey, {user.email}!</span>
      <LogoutButton />
    </div>
  ) : (
    <div className="flex items-center gap-2">
      <Button variant="ghost" asChild>
        <Link href="/auth/login">Sign In</Link>
      </Button>
      <Button asChild>
        <Link href="/auth/login">Sign Up</Link>
      </Button>
    </div>
  )
}
