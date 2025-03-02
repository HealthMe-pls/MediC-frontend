import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    // ดึงค่า keyword จาก query string
    const { searchParams } = new URL(request.url);
    const keyword = searchParams.get("keyword");

    if (!keyword) {
      return NextResponse.json(
        { error: "Keyword is required" },
        { status: 400 }
      );
    }

    // เรียก API Backend จริง (แก้ URL ตาม Backend ของคุณ)
    const apiResponse = await fetch(
      `http://localhost:8080/search-shops?keyword=${encodeURIComponent(
        keyword
      )}`
    );

    if (!apiResponse.ok) {
      throw new Error("Failed to fetch data from backend");
    }

    const data = await apiResponse.json();

    // รีเทิร์นข้อมูลกลับไปให้ Frontend
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching shop data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
