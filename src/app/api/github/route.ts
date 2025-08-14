import { getGitHubProjects } from "./service";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username") || "antoniowav";

  try {
    const projects = await getGitHubProjects(username);

    return NextResponse.json({
      success: true,
      data: projects,
    });
  } catch (error) {
    console.error("Error in GitHub API route:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch GitHub repositories",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

export const dynamic = "force-dynamic"; // Disable static rendering and cache
