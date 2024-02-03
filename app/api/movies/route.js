import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/MongoConnect";
import Movie from "../../../models/FilmModel";

export async function GET() {
  try {
    await connectMongoDB();
    const movies = await Movie.find({}).limit(5);

    return NextResponse.json({ movies }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error Connecting", error },
      { status: 503 }
    );
  }
}
