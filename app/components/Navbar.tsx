'use client';

import Link from "next/link";
import { FaYoutube, FaTwitter, FaGithub } from "react-icons/fa";
import SignInButton from "./SignInButton";
import DailyPrayerDropdown from "./DailyPrayerDropdown";

export default function Navbar() {
    return (
        <nav className="bg-slate-600 py-4 sticky top-0 drop-shadow-xl z-10">
            <div className="px-4 md:px-12 lg:px-36 prose prose-lg max-w-none flex justify-between items-center flex-col sm:flex-row">
                {/* Left side: Home and Daily Prayer */}
                <div className="flex items-center gap-6">
                    <Link
                        href="/"
                        className="text-2xl font-light text-white place-content-center mb-2 md:mb-0 no-underline hover:text-white"
                    >
                        Home
                    </Link>
                    
                    <DailyPrayerDropdown />
                </div>

                {/* Right side: Social Media Icons and Sign-In Button */}
                <div className="flex items-center gap-6">
                <SignInButton />

                    <div className="border-l border-gray-400 h-8"></div> {/* Divider */}
                    
                    <Link className="text-white/90 hover:text-white" href="/">
                        <FaYoutube className="text-4xl lg:text-5xl" />
                    </Link>
                    <Link
                        className="text-white/90 hover:text-white"
                        href="https://github.com/Cruizzer"
                    >
                        <FaGithub className="text-4xl lg:text-5xl" />
                    </Link>
                    <Link
                        className="text-white/90 hover:text-white"
                        href="https://twitter.com/hansel_dz"
                    >
                        <FaTwitter className="text-4xl lg:text-5xl" />
                    </Link>
                    
                </div>
            </div>
        </nav>
    );
}
