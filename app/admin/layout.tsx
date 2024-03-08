import AdminNav from "../components/admin/AdminNav"

export const metadata = {
    title: "Gadg Store Admin",
    description: "Gadg-Store-Dashboard"
}
const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <AdminNav />
            {children}
        </div>
    )
}

export default AdminLayout