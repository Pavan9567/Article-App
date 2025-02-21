import { NextResponse } from "next/server";
import axios from "axios";
import { db } from "@/drizzle/db";
import { articles } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

const API_KEY = process.env.SERPER_API_KEY;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    const { data } = await axios.post(
      "https://google.serper.dev/search",
      { q: `${category} news` }, 
      { headers: { "X-API-KEY": API_KEY } }
    );

    const newArticles = data.organic.map((article: any) => ({
      id: article.id ?? crypto.randomUUID(),
      title: article.title,
      url: article.link,
      category: category,
      createdAt: new Date(),
    }));

    try {

        await db.insert(articles).values(newArticles).onConflictDoNothing();
    }catch (dbError) {
        console.error("Database insertion error:", dbError);

        return NextResponse.json({ error: "Database insertion failed" }, { status: 500 });
    }

    return new Response(JSON.stringify(newArticles), {
        status: 200,
        headers: { "Content-Type": "application/json"},
    });
  } catch (error) {
    console.error("API Fetch Error:", error);
    return NextResponse.json({ error: "Failed to fetch articles" }, { status: 500 });
  }
}
