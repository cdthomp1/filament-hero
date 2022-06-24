import React from 'react'

const Footer = () => {
    return (
        <footer className="p-4 bg-white rounded-lg md:px-6 md:py-8 dark:bg-gray-800">
            <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
            <div className="sm:flex sm:items-center sm:justify-between">
                <a href="https://flowbite.com/" className="flex items-center mb-4 sm:mb-0">
                    <img src="/filament-hero.svg" className="mr-3 h-8" alt="Filament Hero Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Filament Hero</span>
                </a>
                <ul className="flex flex-wrap items-center mb-6 text-sm text-gray-500 sm:mb-0 dark:text-gray-400">
                    <li>
                        <a href="https://github.com/cdthomp1/filament-hero/issues/new" className="mr-4 hover:underline md:mr-6 ">Issues?</a>
                    </li>
                    <li>
                        <a href="#" className="hover:underline">Contact</a>
                    </li>
                </ul>
            </div>
            <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
            <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2022 <a href="https://cameronthompson.io" className="hover:underline">Cameron Thompson™</a>. All Rights Reserved.
            </span>
        </footer>
    )
}

export default Footer
