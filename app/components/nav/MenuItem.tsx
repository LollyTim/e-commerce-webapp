interface MenuItemProps {
    children: React.ReactNode
    onClick: () => void
}

const MenuItem: React.FC<MenuItemProps> = ({ children, onClick }) => {
    return (
        <div className="px-4 py-3 justify-center flex hover:bg-neutral-100 text-gray-900 transition" onClick={onClick}>
            {children}
        </div>
    )
}

export default MenuItem