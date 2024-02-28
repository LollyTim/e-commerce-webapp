import Link from "next/link"
import { Redressed } from "next/font/google"
import Container from "../Container"

const redressed = Redressed({ subsets: ['latin'], weight: ["400"] })
const NavBar = () => {
    return (
        <div className=" sticky top-0 w-full bg-blue-700 z-30 shadow-sm text-white">
            <div className=" py-4 border-b-[1px]">
                <Container>

                    <div className=" flex items-center justify-between gap-3 md:gap-0">
                        <Link href={"/"} className={`${redressed.className} font-bold text-2xl`}>Gadg-Store</Link>
                        <div className="hidden md:block">Search</div>
                        <div className=" flex items-center gap-8 md:gap-12">
                            <div>CartCount</div>
                            <div>UserMenue</div>
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    )
}

export default NavBar