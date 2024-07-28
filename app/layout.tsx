import "./globals.css";
import Navbar from "./components/Navbar";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';

import SessionProvider from "./components/SessionProvider";

export const metadata: Metadata = {
    title: "Cruizzer's Blog",
    description: "Created by Hansel D'Cruz",
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession();

    return (
        <html lang="en">
            <body className="bg-slate-200 dark:bg-slate-800">
                <AppRouterCacheProvider options={{ key: 'css' }}>
                    <ThemeProvider theme={theme}>
                        <SessionProvider session={session}>
                            <Navbar />
                            <main className="px-4 md:px-12 lg:px-36 prose prose-lg prose-slate dark:prose-invert max-w-none text-base">
                                {children}
                            </main>
                        </SessionProvider>
                    </ThemeProvider>
                </AppRouterCacheProvider>
            </body>
        </html>
    );
}
