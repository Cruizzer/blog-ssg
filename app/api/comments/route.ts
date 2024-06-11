import dbConnect from "@/lib/mongo";
import Comment from "@/app/models/Comment";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(req.url);
        const param: string | null = searchParams.get("page");

        const comments = await Comment.find({ page: param });

        return NextResponse.json(comments);
    } catch (err: any) {
        return NextResponse.json({error : err.message})
    }
}

export async function POST(req: Request) {
    try {
        await dbConnect();
        const comment = await req.json();

        const authorId = 999; // Change to user_id
        const date = new Date();

        const { page, text } = comment;

        console.log(comment);

        // Check if page exists before posting comment
        // const post = await Post.findOne({ page });

        // Verify authorId
        // Get user_id from session
        // if (!authorId) {
        //     return NextResponse.json({ error: "Unauthorized" });
        // }


        if (!page || !text) {
            return NextResponse.json({ error: "Missing required fields" });
        }

        await Comment.create({ page, text, authorId, date });

        return Response.json({ message: "Comment submitted successfully" });
    } catch (error) {
        console.error("An error occurred while submitting comment:", error);
        throw new Error("Failed to submit comment");
    }
}