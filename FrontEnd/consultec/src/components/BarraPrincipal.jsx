import React, { Component } from 'react'

export default class BarraPrincipal extends Component {
    render() {
        return (
            <header class="w-full text-gray-700 bg-blue-400 border-t bg-opacity-50 border-gray-100 shadow-sm body-font">
                <div class="container flex flex-col flex-wrap items-center p-5 mx-auto md:flex-row">
                    <a href="#_" class="flex items-center order-first mb-4 text-4xl font-semibold text-gray-900 lg:order-none lg:w-1/5 title-font lg:items-start lg:justify-start md:mb-0">
                        ConsulTec
                    </a>
                    <div class="inline-flex items-end h-full ml-5 lg:w-2/5 lg:justify-end lg:ml-auto">
                        <button class="px-8 py-2 text-xs font-bold text-white uppercase transition-all duration-150 bg-gray-700 rounded shadow outline-none active:bg-gray-900 hover:shadow-md focus:outline-none">
                            Registrarse
                        </button>
                    </div>
                </div>
            </header>
        )
    }
}
