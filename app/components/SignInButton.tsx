"use client";

import React from "react";
import {signIn, signOut, useSession} from "next-auth/react";

const SignInButton = () => {
    const {data: session} = useSession();
    if (session && session.user) {
        console.log(session);
        return (
            <div>
                <p>Signed in as {session.user.name}</p>
                <button onClick={() => signOut()}>Sign out</button>
            </div>
        )
    }
    return (
        <button onClick={() => signIn('google')}>Sign in</button>
    )
}

export default SignInButton;