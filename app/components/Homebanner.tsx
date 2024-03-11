"use client"


import Image from "next/image";
import { useState, useEffect } from "react";

interface ImageObject {
    url: string;
    width?: number;
    height?: number;
}

const Homebanner = () => {
    const [currentImage, setCurrentImage] = useState(0);
    const imageUrls: ImageObject[] = [
        { url: "/propropro.png", width: 600, height: 600 }, // Replace with actual images and dimensions

        { url: "/image3.png", width: 600, height: 600 },

    ];

    useEffect(() => {
        const changeImageLoop = () => {
            setCurrentImage((prevImage) => (prevImage + 1) % imageUrls.length);
        };

        const intervalId = setInterval(changeImageLoop, 1000); // Change image every 2 seconds

        return () => clearInterval(intervalId); // Clear interval on unmount
    }, [currentImage, imageUrls.length]); // Empty dependency array ensures useEffect runs only once

    const handleNext = () => {
        setCurrentImage((prevImage) => (prevImage + 1) % imageUrls.length);
    };

    return (
        <div className="relative bg-gradient-to-r boorder-[1.3px] rounded-full from-sky-400 to-blue-700 mb-8 h-[300px] flex justify-center items-center">
            <div className="mx-auto px-8 py-12 flex flex-col gap-2 md:flex-row items-center justify-evenly">
                <div className="mb-8 md:mb-0 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Febuary Love Sales!</h1>
                    <p className="text-lg md:text-xl text-white mb-2">Enjoy discounts on selected items</p>
                    <p className="text-2xl md:text-5xl text-orange-400 font-bold">GET 50% OFF</p>
                </div>
                <div className="w-1/3 max-w-[300px] relative aspect-video">
                    <Image
                        id="myImage"
                        src={imageUrls[currentImage].url}
                        alt="BannerImg"
                        className="object-contain"
                        // Use width and height from imageUrls object for responsive scaling
                        width={imageUrls[currentImage].width}
                        height={imageUrls[currentImage].height}
                    />
                </div>
            </div>
            {/* <button id="myNextButton" onClick={handleNext}>Next Image</button> */}
        </div>
    );
};

export default Homebanner;
