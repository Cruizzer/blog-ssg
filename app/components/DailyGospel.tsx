import { getDailyGospel } from "@/lib/readings";

export default async function Daily() {
    const gospelContent = await getDailyGospel();

    if (!gospelContent) {
        return (
            <p className="mt-10 text-center text-xl">
                Sorry, cannot fetch daily Gospel.
            </p>
        );
    }

    return (
        <section className="my-10 mx-auto max-w-2xl">
            <div className="my-10 flex flex-wrap justify-between space-x-2 align-middle items-center">
                <h2 className="m-0 text-2xl font-normal dark:text-white/90">
                    Daily Gospel Reading:
                </h2>
                <span className="m-0 text-lg ">
                    {gospelContent.readingDate}
                </span>
            </div>
            <h1>{gospelContent.source}</h1>
            <h3>{gospelContent.heading}</h3>
            <blockquote>
                <div className="not-prose leading-7 pt-[1.6em] pr-[1.4em] pb-[1.6em] pl-[2.6em] not-italic font-extralight dark:text-slate-300">
                    {gospelContent.paragraphs.map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                    ))}
                </div>
            </blockquote>
            <footer className="text-xs">{gospelContent.copyright}</footer>
        </section>
    );
}
