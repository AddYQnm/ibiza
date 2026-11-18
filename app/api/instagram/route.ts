import { NextResponse } from "next/server";

const INSTAGRAM_API = "https://graph.instagram.com/v24.0";

export async function GET() {
  try {
    const token = process.env.INSTAGRAM_ACCESS_TOKEN;
    const userId = process.env.INSTAGRAM_USER_ID;

    if (!token || !userId) {
      return NextResponse.json(
        {
          error: "Instagram API non configurée",
          message:
            "INSTAGRAM_ACCESS_TOKEN ou INSTAGRAM_USER_ID est manquant dans .env.local",
        },
        { status: 500 }
      );
    }

    const url = new URL(`${INSTAGRAM_API}/${userId}/media`);

    url.searchParams.set(
      "fields",
      "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp"
    );

    url.searchParams.set("limit", "8");
    url.searchParams.set("access_token", token);

    const response = await fetch(url.toString(), {
      next: {
        revalidate: 3600,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Instagram API error:", data);

      return NextResponse.json(
        {
          error: "Instagram API error",
          details: data,
        },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Instagram server error:", error);

    return NextResponse.json(
      {
        error: "Erreur serveur Instagram",
      },
      { status: 500 }
    );
  }
}