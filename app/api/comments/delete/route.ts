import dbConnect from "@/lib/mongo";
import Comment from "@/app/models/Comment";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import User from "@/app/models/User";

export async function GET(req: Request) {
    // Get session
    const session = await getServerSession(authOptions);
    
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" });
    }

    const user = await User.findOne({ email: session.user?.email });
    
    // Check if admin has the role of admin
    if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 401 });
    }
    else if (user.admin != true) {
        return NextResponse.json({ error: "Not an admin" }, { status: 401 });
    }

    try {
        await dbConnect();
        const { searchParams } = new URL(req.url);
        const param: string | null = searchParams.get("page");

        // Make query empty to delete all
        const result = await Comment.deleteMany({ postId: param });

        if (result.deletedCount > 0) {
            return NextResponse.json({ message: `${result.deletedCount} comments deleted successfully` });
        }

        return NextResponse.json({ message: "No comments found for this page" });
    } catch (err: any) {
        return NextResponse.json({ error: err.message });
    }
}
