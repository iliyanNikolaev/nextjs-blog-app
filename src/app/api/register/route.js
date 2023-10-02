import connectToDB from "@/utils/db";
import User from "@/models/User";
import bcrypt from 'bcryptjs';
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { username, password } = await req.json();

        await connectToDB();

        const isExist = await User.findOne({ username });

        if (isExist) {
            throw new Error('User already exist.');
        }

        const hashedPassword = await bcrypt.hash(password, 5);

        await User.create({ username, password: hashedPassword });

        return NextResponse.json({ message: 'user registered.' }, { status: 201 });
    } catch (err) {
        console.log(err)
        return NextResponse.json({ message: err.message }, { status: 500 });
    }
}