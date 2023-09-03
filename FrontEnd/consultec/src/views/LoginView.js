import React from 'react';
import '../styles/LoginStyle.css';
import BarraPrincipal from '../components/BarraPrincipal';

function LoginView({ email, password, onEmailChange, onPasswordChange, onLogin }) {
    return (
        <>
            <BarraPrincipal />
            <div className="flex h-screen w-full items-center justify-center  bg-gray-900 bg-cover bg-no-repeat"
                style={{ backgroundImage: "url('https://th.bing.com/th/id/R.8f11c679e5dac264326985cd4419f975?rik=n%2bnPpJrHK72m9g&riu=http%3a%2f%2fgetwallpapers.com%2fwallpaper%2ffull%2fd%2f9%2f2%2f94254.jpg&ehk=rfeXjwbaITK5Sv1h0%2boMsgAN0shLtxuK5et51esIWJk%3d&risl=&pid=ImgRaw&r=0')" }}>
                <img className='mr-80 mt-[-170px]' src="https://cdn-icons-png.flaticon.com/512/2702/2702154.png" width="400" alt="" srcSet="" />
                <div className="rounded-xl bg-gray-800 bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8 mt-[-80px]">
                    <div className="text-white">
                        <form action="#">
                            <div className="mb-4 text-lg">
                                <input
                                    className="rounded-3xl border-none bg-blue-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                                    type="text"
                                    placeholder="Usuario"
                                    value={email}
                                    onChange={(e) => onEmailChange(e.target.value)}
                                />
                            </div>

                            <div className="mb-4 text-lg">
                                <input
                                    className="rounded-3xl border-none bg-blue-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                                    type="password"
                                    placeholder="Contraseña"
                                    value={password}
                                    onChange={(e) => onPasswordChange(e.target.value)}
                                />
                            </div>
                            <div className="mt-8 flex justify-center text-lg text-black">
                                <button
                                    className="rounded-3xl bg-gray-700 bg-opacity-50 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-gray-900"
                                    onClick={onLogin}
                                >
                                    Iniciar Sesión
                                </button>
                            </div>
                            <div className="mb-0 py-4 flex flex-col items-center">
                                <a href='#_' className="text-gray-300">¿Olvidó su contraseña?</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LoginView;
