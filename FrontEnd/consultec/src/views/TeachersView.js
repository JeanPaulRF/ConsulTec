import React, { useState }from "react";
import Tabla from "../components/Teachers/Tabla";

function TeachersView ({datos, onEstadoChange }){
    const [showMenu, setShowMenu] = useState(false);
    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    return (
        <div style={{ backgroundImage: "url('https://th.bing.com/th/id/R.8f11c679e5dac264326985cd4419f975?rik=n%2bnPpJrHK72m9g&riu=http%3a%2f%2fgetwallpapers.com%2fwallpaper%2ffull%2fd%2f9%2f2%2f94254.jpg&ehk=rfeXjwbaITK5Sv1h0%2boMsgAN0shLtxuK5et51esIWJk%3d&risl=&pid=ImgRaw&r=0')" }}>
        <header className="w-full text-gray-700 bg-blue-400 border-t bg-opacity-50 border-gray-100 shadow-sm body-font">
            <div className="container flex flex-col flex-wrap items-center p-5 mx-auto md:flex-row">
                <a href="/login" class="flex items-center order-first mb-4 text-4xl font-semibold text-gray-900 lg:order-none lg:w-1/5 title-font lg:items-start lg:justify-start md:mb-0">
                    ConsulTec
                </a>
                <div className="ml-auto relative">
                    <div onClick={toggleMenu} className="cursor-pointer">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="40"
                            height="40"
                            fill="currentColor"
                            className="bi bi-person-fill"
                            viewBox="0 0 16 16"
                        >
                            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                        </svg>
                    </div>
                </div>
               
            </div>
        </header>
        <div className="container d-flex justify-content-center align-items-center">
       <div>
          <Tabla data={datos}
          onEstadoChange = {onEstadoChange} />
        </div> 
      </div>
        </div>
    )






}

export default TeachersView;