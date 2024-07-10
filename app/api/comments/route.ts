import dbConnect from "@/lib/mongo";
import Comment from "@/app/models/Comment";
import User from "@/app/models/User";
import { NextResponse } from "next/server";

// Session
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(req: Request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(req.url);
        const param: string | null = searchParams.get("postId");

        const comments = await Comment.find({ postId: param });

        return NextResponse.json(comments);
    } catch (err: any) {
        return NextResponse.json({error : err.message})
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
        const comment = await req.json();

        const author = session.user?.email;
        const date = new Date();

        const { postId, text } = comment;
        const profileImage = session.user?.image;

        console.log(comment);

        // Check if page exists before posting comment
        // const post = await Post.findOne({ page });

        // Verify authorId
        // Get user_id from session
        // if (!authorId) {
        //     return NextResponse.json({ error: "Unauthorized" });
        // }

        // Can use refactoring.
        if (!postId || !text || !author) {
            return NextResponse.json({ error: "Missing required fields" });
        }

        // Logic to limit comments per post by user to 10
        const userComments = await Comment.find({ postId, author });

        if (userComments.length >= 3) {
            console.log("Comment cannot be added!")
            return NextResponse.json({ error: "Comment limit reached" });
        } else {
            console.log("Comment added!")
        }
        

        await Comment.create({ postId, text, author, date, profileImage });

        return Response.json({ message: "Comment submitted successfully" });
    } catch (error) {
        console.error("An error occurred while submitting comment:", error);
        throw new Error("Failed to submit comment");
    }
}