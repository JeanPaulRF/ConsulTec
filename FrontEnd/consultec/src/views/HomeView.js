import React from "react";
import mateGe from "../images/mateGeneral.jpg"
import calculo from "../images/calculo.jpg"
import algebra from "../images/algebra.jpg"
import estadistica from "../images/estadistica.jpg"
import BarraPrincipal from "../components/BarraPrincipal";


function HomeView({ onClickMaterial }) {

    return (
        <div style={{ backgroundImage: "url('https://th.bing.com/th/id/R.8f11c679e5dac264326985cd4419f975?rik=n%2bnPpJrHK72m9g&riu=http%3a%2f%2fgetwallpapers.com%2fwallpaper%2ffull%2fd%2f9%2f2%2f94254.jpg&ehk=rfeXjwbaITK5Sv1h0%2boMsgAN0shLtxuK5et51esIWJk%3d&risl=&pid=ImgRaw&r=0')" }}>
            <BarraPrincipal />
            <h1 style={{ fontSize: '1.6rem', textAlign: 'center' }}>Seleccione un curso a consultar: </h1>
            <div className="flex flex-wrap flex-row h-screen w-full  justify-center bg-cover bg-no-repeat">
                <div className="rounded-xl bg-gray-800 bg-opacity-50 px-12 py-10 shadow-lg backdrop-blur-md max-sm:px-8 mt-[40px] ">
                    <div className="flex flex-wrap">
                        <div onClick={onClickMaterial} className="mx-2">
                            <img src={mateGe} alt="Matemática General" style={{ width: '200px', height: '150px' }} />
                            <button >
                                Matemática general
                            </button>
                        </div>
                        <div onClick={onClickMaterial} className="mx-2 ">
                            <img src={calculo} alt="Calculo" style={{ width: '200px', height: '150px' }} />
                            <button >
                                Cálculo Diferencial e Integral
                            </button>
                        </div>
                        <div onClick={onClickMaterial} className="mx-2">
                            <img src={algebra} alt="Algebra" style={{ width: '200px', height: '150px' }} />
                            <button >
                                Álgebra Lineal
                            </button>
                        </div>
                        <div onClick={onClickMaterial} className="mx-2">
                            <img src={estadistica} alt="Estadística" style={{ width: '200px', height: '150px' }} />
                            <button >
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