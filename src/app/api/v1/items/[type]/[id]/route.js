import { NextResponse } from "next/server";
import { KitsuService } from "@/services/kitsu";

export async function GET(request, { params }) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: "Manga ID is required",
        },
        { status: 400 }
      );
    }

    const data = await KitsuService.fetchItemDetails(id);

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
