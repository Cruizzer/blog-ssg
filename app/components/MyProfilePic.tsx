import Image from "next/image";

export default function MyProfilePic() {
    return (
        <section className="w-full mx-auto">
            <Image
                className="border-4 border-black dark:border-slate-500 drop-shadow-xl shadow-black rounded-full mx-auto mt-8"
                src="/images/cruizzer.jpg"
                width={200}
                height={200}
                alt="Cruizzer"
                priority={true}
            />
        </section>
    );
}
