import Image from "next/image"
// import DSDS from "/_3de437ba-276e-45cc-a1ec-6928143ae60a.jpg"

const FormWrap = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className=" min-h-fit w-[80%] flex justify-center mx-auto pb-12 pt-24 h-full">
            <div className=" max-w-[689px] md:p-8  w-[100%] flex flex-col gap-6 shadow-xl shadow-slate-200 rounded-xl p-4  " >
                {children}
            </div>
            {/* <div className="">
                <Image
                    unoptimized={true}
                    className=" rounded-tr-xl rounded-br-xl "
                    src={"/_3de437ba-276e-45cc-a1ec-6928143ae60a.jpg"}
                    width={400}
                    height={400}
                    alt="3de437ba-276e-45cc-a1ec-6928143ae60a"
                />
            </div> */}

        </div>
    )
}

export default FormWrap