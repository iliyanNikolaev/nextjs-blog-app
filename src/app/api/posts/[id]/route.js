import { NextResponse } from "next/server";
import connectToDB from "@/utils/db";
import Post from "@/models/Post";

export const GET = async (request, { params }) => {
    const { id } = params;
    try {
        await connectToDB();

        const post = await Post.findById(id);

        return NextResponse.json(post, { status: 200 });
    } catch (err) {
        return NextResponse.json('Database Error', { status: 400 });
    }
}

export const PUT = async (request, { params }) => {
    const { id } = params;
    const data = await request.json();
    try {
        await connectToDB();

        const post = await Post.findByIdAndUpdate(id, data);
        
        return NextResponse.json(post, { status: 200 });
    } catch (err) {
        return NextResponse.json('Database Error', { status: 400 });
    }
}

export const DELETE = async (request, { params }) => {
    const { id } = params;
    try {
        await connectToDB();

        const post = await Post.findByIdAndDelete(id);
        
        return NextResponse.json(post, { status: 200 });
    } catch (err) {
        return NextResponse.json('Database Error', { status: 400 });
    }
}