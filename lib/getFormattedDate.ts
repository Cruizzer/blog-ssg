export default function getFormattedDate(dateString: string): string {
    const parsedDate = new Date(dateString);

    // Check if parsedDate is a valid date
    if (isNaN(parsedDate.getTime())) {
        console.error(`Invalid date string: ${dateString}`);
        return "Invalid Date";
    }

    return new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(
        parsedDate
    );
}
