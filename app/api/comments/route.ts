import dbConnect from "@/lib/mongo";
import Comment from "@/app/models/Comment";
import { NextResponse } from "next/server";

// Session
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { ObjectId } from "mongodb";

export async function GET(req: Request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(req.url);
        const param: string | null = searchParams.get("postId");

        const comments = await Comment.find({ postId: param });

        return NextResponse.json(comments);
    } catch (err: any) {
        return NextResponse.json({error : err.message});
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

        // Can use refactoring.
        if (!postId || !text || !author) {
            return NextResponse.json({ error: "Missing required fields" });
        }

        // Logic to limit comments per post by user to 3
        const userComments = await Comment.find({ postId, author });

        if (userComments.length >= 3) {
            console.log("Comment cannot be added!");
            return NextResponse.json({ error: "Comment limit reached" });
        } else {
            console.log("Comment added!");
        }

        // Create a comment id from mongodb
        const commentId = new ObjectId();

        await Comment.create({ commentId, postId, text, author, date, profileImage });

        return NextResponse.json({ message: "Comment submitted successfully" });
    } catch (error) {
        console.error("An error occurred while submitting comment:", error);
        throw new Error("Failed to submit comment");
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
        const commentId = searchParams.get("commentId");

        if (!commentId) {
            return NextResponse.json({ error: "Comment ID is required" });
        }

        const comment = await Comment.findOne({ commentId: commentId})

        if (!comment) {
            return NextResponse.json({ error: "Comment not found" });
        }

        if (comment.author !== session.user?.email) {
            return NextResponse.json({ error: "You are not authorized to delete this comment" });
        }

        await Comment.deleteOne({ commentId: commentId });

        return NextResponse.json({ message: "Comment deleted successfully" });
    } catch (error) {
        console.error("An error occurred while deleting comment:", error);
        return NextResponse.json({ error: "Failed to delete comment" });
    }
}
