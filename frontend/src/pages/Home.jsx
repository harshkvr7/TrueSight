import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div className="relative pt-40 flex w-full h-screen flex-col items-center bg-gray-900">
            <h1 className="mt-8 max-w-sm bg-gradient-to-br text-white text-center text-4xl font-extrabold sm:max-w-4xl sm:text-6xl">
                Harnessing the Power of AI for Image Authenticity
            </h1>
            <span className="mt-8 max-w-lg text-center text-xl leading-relaxed text-gray-300 font-mono">
            Explore the latest advancements in detecting AI-generated images. Stay ahead with cutting-edge features that help you distinguish real from artificial with ease.
            </span>
            <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-0 sm:gap-x-4">
                <Link to={"/try"}>
                    <span href="https://example.com/new-feature"
                        className="flex flex-row items-center justify-center gap-x-2 rounded-lg text-white px-10 py-3 bg-blue-600 hover:bg-blue-500 transition duration-200">
                        <svg className="h-[30px] text-white" stroke="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"
                            strokeWidth="3" fill="none">
                            <path d="M14,39.87,24.59,50.51s33-14,31.23-42.29C55.82,8.22,29.64,4.28,14,39.87Z"></path>
                            <path d="M44.69,9.09a12.3,12.3,0,0,0,3.48,6.73,12.31,12.31,0,0,0,7,3.52"></path>
                            <circle cx="39.46" cy="24.56" r="6.2"></circle>
                            <path d="M14.89,37.82l-5.3.68a.27.27,0,0,1-.28-.37l3.93-9a2.65,2.65,0,0,1,1.88-1.53l6.59-1.38"></path>
                            <path d="M26.55,49.4l-.69,5.3a.27.27,0,0,0,.37.28l9-3.92a2.69,2.69,0,0,0,1.53-1.89l1.38-6.59"></path>
                            <path d="M22.21,48.13c-2.37,7.41-14.1,7.78-14.1,7.78S8,44.51,15.76,41.67"></path>
                        </svg>
                        Try Now
                    </span>
                </Link>
                <Link to={"/about"} className="flex flex-row items-center justify-center gap-x-2 rounded-lg border border-blue-500 px-10 py-3 text-blue-500 hover:bg-blue-500 hover:text-white transition duration-200">
                    Learn More →
                </Link>
            </div>
        </div>
    )
}

export default Home
