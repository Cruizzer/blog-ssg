import {load} from "cheerio"

interface Mass {
    heading: string;
    source: string;
    text: string;
}

interface Copyright {
    text: string;
}

interface JSONData {
    number: number;
    date: string;
    day: string;
    Mass_R1: Mass;
    Mass_Ps: {
        source: string;
        text: string;
    };
    Mass_GA: {
        source: string;
        text: string;
    };
    Mass_G: Mass;
    copyright: Copyright;
}

export async function getDailyGospel() {

    let date = new Date();
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    let formattedDate = `${year}${month}${day}`;
    const dailyReadingsURL: string = `https://universalis.com/Europe.England.Leeds/${formattedDate}/jsonpmass.js`;

    try {
        const response = await fetch(dailyReadingsURL).then(res => res.text());
        const gospel = response.substring(20, response.length - 3);
        const parsedGospel: JSONData = JSON.parse(gospel);
        const paragraphs: string[] = [];
        
        // Parse the 'text' property of Mass_G using Cheerio.
        const $Gospel = load(parsedGospel.Mass_G.text);

        $Gospel("div").each((index, element) => {
            // Extract and push each paragraph
            const paragraph = $Gospel(element).text();
            if (paragraph.trim().length > 0) {
                paragraphs.push(paragraph.trim());
            }
        });

        const copyright = (load(parsedGospel.copyright.text))("div").text().trim();

        return {
            readingDate: parsedGospel.date,
            source: parsedGospel.Mass_G.source,
            heading: parsedGospel.Mass_G.heading,
            paragraphs,
            copyright
        }

    } catch (error) {
        console.error("Error fetching and parsing daily reading:", error);
    }
}
