import dbConnect from "@/lib/mongo";
import Prayer from "@/app/models/Prayer";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { ObjectId } from "mongodb";

export async function GET(req: Request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(req.url);
        const userId: string | null = searchParams.get("userId");

        if (!userId) {
            return NextResponse.json({ error: "User ID is required" });
        }

        const prayers = await Prayer.find({ userId: new ObjectId(userId) });

        return NextResponse.json(prayers);
    } catch (err: any) {
        return NextResponse.json({ error: err.message });
    }
}

export async function POST(req: Request) {
    // Get session
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" });
    }

    try {
        await dbConnect();
        const prayerData = await req.json();

        const userId = session.user?.email; // Assuming you use email as user identifier
        const dateCreated = new Date();

        if (!prayerData || !prayerData.prayerSelections) {
            return NextResponse.json({ error: "Missing required fields" });
        }

        // Create a new Prayer document
        const newPrayer = new Prayer({
            userId: userId,
            dateCreated: dateCreated,
            prayerSelections: prayerData.prayerSelections,
        });

        await newPrayer.save();

        return NextResponse.json({ message: "Prayer submitted successfully" });
    } catch (error) {
        console.error("An error occurred while submitting prayer:", error);
        return NextResponse.json({ error: "Failed to submit prayer" });
    }
}

export async function DELETE(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" });
    }

    try {
        await dbConnect();
        const { searchParams } = new URL(req.url);
        const prayerId = searchParams.get("prayerId");

        if (!prayerId) {
            return NextResponse.json({ error: "Prayer ID is required" });
        }

        const prayer = await Prayer.findById(prayerId);

        if (!prayer) {
            return NextResponse.json({ error: "Prayer not found" });
        }

        // Check if the user is authorized to delete the prayer
        if (prayer.userId !== session.user?.email) {
            return NextResponse.json({ error: "You are not authorized to delete this prayer" });
        }

        await Prayer.deleteOne({ _id: prayerId });

        return NextResponse.json({ message: "Prayer deleted successfully" });
    } catch (error) {
        console.error("An error occurred while deleting prayer:", error);
        return NextResponse.json({ error: "Failed to delete prayer" });
    }
}
