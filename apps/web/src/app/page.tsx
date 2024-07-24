import Link from "next/link";

export default function HomePage() {
    return (
        <div className="flex h-screen flex-col items-center justify-center gap-3 dark:text-white">
            <div>Links</div>
            <Link href={"/server"}>Dev - Server</Link>
            <Link href={"/static"}>Dev - Static</Link>
            <Link href={"/nonce"}>Dev - Nonce</Link>
            <Link href={"/build/server"}>Build - Server</Link>
            <Link href={"/build/static"}>Build - Static</Link>
            <Link href={"/build/nonce"}>Build - Nonce</Link>
        </div>
    );
}
