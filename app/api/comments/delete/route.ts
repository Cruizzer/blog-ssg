import dbConnect from "@/lib/mongo";
import Comment from "@/app/models/Comment";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(req.url);
        const param: string | null = searchParams.get("page");
        const result = await Comment.deleteMany({postId: param});

        if (result.deletedCount > 0) {
            return NextResponse.json({message: `${result.deletedCount} Comments deleted successfully`});
        }

        return NextResponse.json({message: "No comments found for this page"});
    } catch (err: any) {
        return NextResponse.json({error : err.message})
    }
}