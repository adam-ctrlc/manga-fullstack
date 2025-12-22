import { NextResponse } from "next/server";
import { KitsuService } from "@/services/kitsu";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    const filters = {
      status: searchParams.get("status") || "All",
      subtype: searchParams.get("subtype") || "All",
      sort: searchParams.get("sort") || "Most Popular",
      search: searchParams.get("search") || "",
    };

    const data = await KitsuService.fetchRandomItem(filters);

    return NextResponse.json({
      success: true,
      ...data,
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
