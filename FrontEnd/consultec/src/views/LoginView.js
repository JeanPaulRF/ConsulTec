import React from 'react';

function LoginView({ email, password, onEmailChange, onPasswordChange, onLogin, onRegister, forgetPassword }) {
    return (
        <div style={{ backgroundImage: "url('https://th.bing.com/th/id/R.8f11c679e5dac264326985cd4419f975?rik=n%2bnPpJrHK72m9g&riu=http%3a%2f%2fgetwallpapers.com%2fwallpaper%2ffull%2fd%2f9%2f2%2f94254.jpg&ehk=rfeXjwbaITK5Sv1h0%2boMsgAN0shLtxuK5et51esIWJk%3d&risl=&pid=ImgRaw&r=0')" }}>
            <header class="w-full text-gray-700 bg-blue-400 border-t bg-opacity-50 border-gray-100 shadow-sm body-font">
                <div class="container flex flex-col flex-wrap items-center p-5 mx-auto md:flex-row">
                    <a href="#_" class="flex items-center order-first mb-4 text-4xl font-semibold text-gray-900 lg:order-none lg:w-1/5 title-font lg:items-start lg:justify-start md:mb-0">
                        ConsulTec
                    </a>
                    <div class="inline-flex items-end h-full ml-5 lg:w-2/5 lg:justify-end lg:ml-auto">
                        <button
                            class="px-8 py-2 text-xs font-bold text-white uppercase transition-all duration-150 bg-gray-700 rounded-3xl shadow outline-none active:bg-gray-900 hover:shadow-md focus:outline-none"
                            onClick={onRegister}>
                            Registrarse
                        </button>
                    </div>
                </div>
            </header>
            <div className="flex h-screen w-full items-center justify-center bg-cover bg-no-repeat">
                <img className='mr-80 mt-[-170px]' src="https://cdn-icons-png.flaticon.com/512/2702/2702154.png" width="350" alt="" srcSet="" />
                <div className="rounded-xl bg-gray-800 bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8 mt-[-80px]">
                    <div className="text-white">
                        <form action="#">
                            <div className="mb-0 py-4 flex flex-col items-center text-2xl">
                                <p className="text-gray-300">Inicio de Sesión</p>
                            </div>

                            <div className="mb-4 text-lg">
                                <input
                                    className="rounded-3xl border-none bg-blue-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                                    type="text"
                                    placeholder="Correo"
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
                                <button
                                    className="text-gray-300"
                                    onClick={forgetPassword}
                                    title={!(email !== "") ?
                                        "Se debe ingresar un correo en usuario para solicitar un cambio de contraseña"
                                        :
                                        `Te enviaremos un correo para que actualices tu contraseña a ${email}`}
                                >
                                    ¿Olvidó su contraseña?
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginView;
