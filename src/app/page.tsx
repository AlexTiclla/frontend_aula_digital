import LoginForm from "@/components/forms/login-form"
import { APP_CONFIG } from "@/config/constants"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-blue-50 to-white">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-800">{APP_CONFIG.name}</h1>
          <p className="text-gray-600 mt-2">{APP_CONFIG.description}</p>
        </div>
        <LoginForm />
      </div>
    </main>
  )
}
