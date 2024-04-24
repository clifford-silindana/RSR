import Image from "next/image";
import React, {useState} from "react";
import Swipe from "react-easy-swipe";

interface ImageProps {
    id: string;
    src: string;
    alt: string;
}

interface CarouselProps {
    images: ImageProps[];
}

const Carousel: React.FC<CarouselProps> = ({images}) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const handleNextSlide = () => {
        let newSlide = currentSlide === images.length - 1 ? 0 : currentSlide + 1;
        setCurrentSlide(newSlide);
    };

    const handlePrevSlide = () => {
        let newSlide = currentSlide === 0 ? images.length - 1 : currentSlide - 1;
        setCurrentSlide(newSlide);
    };

    return (
        <div className="relative">

            <div className="w-full h-[50vh] flex overflow-hidden relative m-auto ">
                <Swipe
                    onSwipeLeft={handleNextSlide}
                    onSwipeRight={handlePrevSlide}
                    className="relative z-10 w-full h-full"
                >
                    {images.map((image, index) => {
                        if (index === currentSlide) {
                            return (
                                <div key={image.id} className="relative h-full">
                                    <Image
                                        src={image.src}
                                        alt={image.alt}
                                        layout="fill"
                                        objectFit="cover"
                                        className="animate-fadeIn rounded-md"
                                    />
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <h2 className="mb-9 text-2xl font-bold text-white dark:text-white sm:text-title-xl2">
                                            Welcome to the new NIIMS Portal
                                        </h2>
                                        <div className="text-center">
                                            <p className="text-xl font-medium text-white">
                                                Railway Safety Regulator 2023
                                            </p>
                                            <p className="text-xl font-light text-white">
                                                Look At Our New Online Process
                                            </p>
                                        </div>
                                    </div>
                                    <div className=" px-8
                                    absolute inset-0 flex items-center justify-between
                                    ">
             <span onClick={handlePrevSlide}
                   className="circle flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary bg-primary cursor-pointer">
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                  version="1.1"
                  transform="matrix(6.123233995736766e-17,1,-1,6.123233995736766e-17,0,0)">
             <g opacity="0.8">
             <path fillRule="evenodd" clipRule="evenodd"
                   d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                   fill="white"></path>
             </g>
             </svg>
             </span>

                                        <span onClick={() => handleNextSlide()}

                                              className="circle flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary bg-primary cursor-pointer">
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                  version="1.1"
                  transform="matrix(-1.8369701987210297e-16,-1,1,-1.8369701987210297e-16,0,0)">
             <g opacity="0.8">
             <path fillRule="evenodd" clipRule="evenodd"
                   d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                   fill="white"></path>
             </g>
             </svg>
             </span>

                                    </div>
                                </div>
                            );
                        }
                        return null; // Add this line to satisfy TypeScript, as map function should return a value
                    })}

                </Swipe>

            </div>
            <div className="relative flex justify-center p-2">
                {images.map((_, index) => (
                    <div
                        className={
                            index === currentSlide
                                ? "h-4 w-4 bg-gray-700 rounded-full mx-2 mb-2 cursor-pointer"
                                : "h-4 w-4 bg-gray-300 rounded-full mx-2 mb-2 cursor-pointer"
                        }
                        key={index}
                        onClick={() => {
                            setCurrentSlide(index);
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default Carousel;
