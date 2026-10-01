import { HashRouter, Route, Routes } from 'react-router-dom'
import { BackendStatus } from './components/BackendStatus'
import { ThemeSwitch } from './components/ThemeSwitch'

function Home() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-xl flex-col items-center justify-center gap-6 px-4 pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] text-center">
      <h1 className="text-4xl font-bold tracking-tight text-primary">StressFreeBudget</h1>
      <p className="text-muted">Budgeting for two. Under construction.</p>
      <ThemeSwitch />
      <BackendStatus />
    </main>
  )
}

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </HashRouter>
  )
}
