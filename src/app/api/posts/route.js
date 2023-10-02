import { NextResponse } from "next/server";
import connectToDB from "@/utils/db";
import Post from "@/models/Post";

export const GET = async (request) => {
    const url = new URL(request.url);

    const username = url.searchParams.get("username");
    //ако заявката е със url => /api/posts?username=еxample това ще върне "еxample"
    //ако заявката е със url => /api/posts това ще върне null

    try {
        await connectToDB();

        const posts = await Post.find(username && { owner: username });
        //ако username e null, ще върне всички записи от колекцията,
        //ако username е стринг ще върне само тези записи на които пропъртито owner == username, aко няма такива ще върне []
        return NextResponse.json(posts, { status: 200 });
    } catch (err) {
        return NextResponse.json('Database Error', { status: 400 });
    }
}

export const POST = async (request) => {
    const post = await request.json();
    try {
        await connectToDB();

        const created = await Post.create(post);

        return NextResponse.json(post, { status: 200 });
    } catch (err) {
        return NextResponse.json('Database Error', { status: 400 });
    }
}