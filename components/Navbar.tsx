import Link from "next/link";

const Navbar = () => {
    return (
        <nav>
            <div className="flex justify-between items-center">
                <Link href="/" className="hidden md:inline-block text-lg font-semibold">Lio's Vintage Cars</Link>
                <div className="relative max-w-75 md:w-100">
                    <div className="absolute inset-y-0 inset-s-0 flex items-center ps-3 pointer-events-none">
                        <svg
                            className="w-4 h-4 text-black/70"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20"
                            >
                            <path
                                stroke = "currentColor"
                                strokeLinecap = "round"
                                strokeLinejoin = "round"
                                strokeWidth = "2"
                                d = "m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                            />
                        </svg>
                    </div>
                    <input className="h-9 relative pl-10 border border-black/70
                    text-sm rouded-[8px] w-full, py-2 px-3 focus:outline-none focus:shadow-outline
                    bg-transparent" type="text" placeholder="Search" />
                </div>
                <Link href="/add-product">
                    <button className="bg-[#212529] hover:bg-[#343A40] text-white px-3 py-2 rounded-md">Add Product</button>
                </Link>
            </div>
        </nav>
    )
}

export default Navbar;