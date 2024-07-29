'use client';

import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

const SignInButton = () => {
    const { data: session } = useSession();

    if (session && session.user) {
        return (
            <div className="relative group">
                <img
                    src={session.user.image || 'defaultProfileImageUrl'}
                    alt="Profile"
                    className="w-8 h-8 rounded-full cursor-pointer"
                />
                <div className="absolute hidden group-hover:block bg-slate-700 p-2 space-y-2 rounded-md shadow-lg w-48 top-full right-0 translate-x-1/2 sm:translate-x-1/2 sm:right-0">
                    <Link
                        href="/dashboard"
                        className="block px-4 py-2 text-white hover:text-gray-300 hover:bg-slate-600 rounded-md"
                    >
                        Dashboard
                    </Link>
                    <Link
                        href="/prayers"
                        className="block px-4 py-2 text-white hover:text-gray-300 hover:bg-slate-600 rounded-md"
                    >
                        Prayers
                    </Link>
                    <button
                        onClick={() => signOut()}
                        className="block px-4 py-2 text-white hover:text-gray-300 hover:bg-slate-600 rounded-md w-full text-left"
                    >
                        Sign out
                    </button>
                </div>
            </div>
        );
    }

    return (
        <button
            onClick={() => signIn('google')}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
            Sign in
        </button>
    );
}

export default SignInButton;
