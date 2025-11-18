import AuthForms from '../components/AuthForms'
import AdminPanel from '../components/AdminPanel'
import { useAuth } from '../context/AuthContext'

function AdminPage() {
  const { user } = useAuth()

  if (!user || user.role !== 'admin') {
    return (
      <div className="space-y-4">
        <div className="bg-slate-900/60 border border-slate-700/40 rounded-xl p-4">
          <h2 className="text-white text-2xl font-bold">Admin Access</h2>
          <p className="text-slate-300 mt-2">Login with an admin account, or register a new admin account to manage products and users.</p>
        </div>
        <AuthForms />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="bg-slate-900/60 border border-slate-700/40 rounded-xl p-4">
        <h2 className="text-white text-2xl font-bold">Admin Dashboard</h2>
        <p className="text-slate-300 mt-1">Manage catalog and approve users.</p>
      </div>
      <AdminPanel />
    </div>
  )
}

export default AdminPage
