import { NextResponse } from "next/server";
import { KitsuService } from "@/services/kitsu";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    // Support both "search" and "filter[text]" parameters
    const searchQuery =
      searchParams.get("filter[text]") || searchParams.get("search") || "";

    const filters = {
      status:
        searchParams.get("status") ||
        searchParams.get("filter[status]") ||
        "All",
      subtype: searchParams.get("subtype") || "All",
      sort: searchParams.get("sort") || "Most Popular",
      search: searchQuery,
    };

    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("page[limit]") || "20", 10);
    const offset = (page - 1) * limit;

    const data = await KitsuService.fetchItems(filters, offset, limit);

    return NextResponse.json({
      success: true,
      data: data.data || [],
      meta: {
        count: data.meta?.count || 0,
        currentPage: page,
        totalPages: Math.ceil((data.meta?.count || 0) / limit),
      },
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
