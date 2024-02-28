import Image from "next/image"
import { FaUserCircle } from "react-icons/fa"

interface AvatarProps {
    src?: string | null | undefined
}

const Avatar: React.FC<AvatarProps> = ({ src }) => {
    if (src) {
        return <Image src={src} alt={"Avatat"}
            className={' rounded-full'}
            height={30} width={30} />
    }
    return (
        <FaUserCircle size={25} />
    )
}

export default Avatar
