import Link from "next/link";
import { FaYoutube, FaTwitter, FaGithub } from "react-icons/fa";

export default function Navbar() {
    return (
        <nav className="bg-slate-600 py-4 sticky top-0 drop-shadow-xl z-10">
            <div className="px-4 md:px-12 lg:px-36 prose prose-lg max-w-none flex justify-between flex-col sm:flex-row">
                <div className="flex items-center gap-6 p-0 relative">
                    <h1 className="text-2xl font-light text-white place-content-center mb-2 md:mb-0">
                        <Link
                            href="/"
                            className="text-white/90 no-underline hover:text-white"
                        >
                            Home
                        </Link>
                    </h1>

                    <h1 className="text-xl font-light text-white place-content-center mb-2 md:mb-0">
                        <Link
                            href="/daily-prayer"
                            className="text-white/90 no-underline hover:text-white"
                        >
                            Daily Prayer
                        </Link>
                    </h1>

                    <div className="group relative">
                        <h1 className="text-xl font-light text-white place-content-center mb-2 md:mb-0">
                            <Link
                                href="#"
                                className="text-white/90 no-underline hover:text-white"
                            >
                                Trackers
                            </Link>
                        </h1>

                        {/* Dropdown menu for "Trackers" link */}
                        <div className="absolute hidden group-hover:block bg-slate-700 p-2 space-y-2 rounded-md shadow-lg w-48 top-full">
                            <Link
                                href="/death"
                                className="text-gray-300 hover:text-white no-underline"
                            >
                                Death Tracker
                            </Link>
                            {/* Add more child links as needed */}
                        </div>
                    </div>
                </div>

                <div className="flex flex-row justify-center sm:justify-evenly align-middle gap-4 text-white text-4xl lg:text-5xl">
                    <Link className="text-white/90 hover:text-white" href="/">
                        <FaYoutube />
                    </Link>
                    <Link
                        className="text-white/90 hover:text-white"
                        href="https://github.com/Cruizzer"
                    >
                        <FaGithub />
                    </Link>
                    <Link
                        className="text-white/90 hover:text-white"
                        href="https://twitter.com/hansel_dz"
                    >
                        <FaTwitter />
                    </Link>
                </div>
            </div>
        </nav>
    );
}
