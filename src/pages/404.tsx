import AppBar from "@/components/AppBar";
import Head from "next/head";

export default function NotFound()
{
    return (
        <>
            <Head>
                <title>404 - Page not found</title>
            </Head>

            <AppBar/>

            <div className="flex flex-col items-center justify-center h-screen text-white">
                <h1 className="text-4xl font-bold">404 - Page not found</h1>
                <p className="text-xl">The page you are looking for does not exist.</p>
            </div>
        </>
    )
}
