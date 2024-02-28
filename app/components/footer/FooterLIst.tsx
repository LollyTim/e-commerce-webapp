interface FooterListProps {
    children: React.ReactNode
}

const FooterLIst: React.FC<FooterListProps> = ({ children }) => {
    return (
        <div className="w-fill sm:w-1/2 md:w-1/4 lg:w-1/6 flex flex-col gap-2">
            {children}
        </div>
    )
}

export default FooterLIst
