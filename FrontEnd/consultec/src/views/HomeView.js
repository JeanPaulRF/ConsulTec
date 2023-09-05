import React from "react";
import mateGe from "../images/mateGeneral.jpg"
import calculo from "../images/calculo.jpg"
import algebra from "../images/algebra.jpg"
import estadistica from "../images/estadistica.jpg"


function HomeView({onClickMaterial}){

    return(
        <div style={{ backgroundImage: "url('https://th.bing.com/th/id/R.8f11c679e5dac264326985cd4419f975?rik=n%2bnPpJrHK72m9g&riu=http%3a%2f%2fgetwallpapers.com%2fwallpaper%2ffull%2fd%2f9%2f2%2f94254.jpg&ehk=rfeXjwbaITK5Sv1h0%2boMsgAN0shLtxuK5et51esIWJk%3d&risl=&pid=ImgRaw&r=0')" }}>
            <header className="w-full text-gray-700 bg-blue-400 border-t bg-opacity-50 border-gray-100 shadow-sm body-font">
                <div className="container flex flex-col flex-wrap items-center p-5 mx-auto md:flex-row">
                    <a href="#_" class="flex items-center order-first mb-4 text-4xl font-semibold text-gray-900 lg:order-none lg:w-1/5 title-font lg:items-start lg:justify-start md:mb-0">
                        ConsulTec
                    </a>

                    <div className="ml-auto" > 
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
                        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                        </svg>
                    </div>
                </div>
            </header>
   
            <h1 style={{ fontSize: '1.6rem', textAlign: 'center' }}>Seleccione un curso a consultar: </h1>
            <div className="flex h-screen w-full items-center justify-center bg-cover bg-no-repeat">
              <div className="rounded-xl bg-gray-800 bg-opacity-50 px-12 py-10 shadow-lg backdrop-blur-md max-sm:px-8 mt-[40px] ">    
                    <div>
                        <div>
                            <img src={mateGe} alt="mate general" style={{ width: '200px', height: '150px'}} />
                           <button onClick={onClickMaterial}>
                            Matemática general
                            </button> 
                        </div> 
                        <div>
                            <img src={calculo} alt="mate general" style={{ width: '200px', height: '150px'  }} />
                            <button onClick={onClickMaterial}>
                            Cálculo Diferencial e Integral
                            </button> 
                        </div> 
                        <div>
                            <img src={algebra} alt="mate general" style={{ width: '200px', height: '150px'}} />                           
                            <button onClick={onClickMaterial}>
                            Álgebra Lineal
                            </button> 
                        </div> 
                        <div>
                            <img src={estadistica} alt="mate general" style={{ width: '200px', height: '150px' }} />
                            <button onClick={onClickMaterial}>
                            Estadística
                            </button> 
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )




}

export default HomeView;