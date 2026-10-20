import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

export async function POST(req: Request) {
  try {
    const databaseUrl = process.env.DATABASE_URL;

    if (!databaseUrl || databaseUrl.includes("YOUR_PASSWORD")) {
      return NextResponse.json(
        {
          error:
            "Neon DATABASE_URL is not configured. Please add your connection string to .env.local",
        },
        { status: 500 }
      );
    }

    const body = await req.json();
    const { schoolName, contactPerson, email, phone, cityStrength, programs } = body;

    // Validate required fields
    if (!schoolName || !contactPerson || !email || !phone) {
      return NextResponse.json(
        { error: "School name, contact person, email, and phone are required." },
        { status: 400 }
      );
    }

    const sql = neon(databaseUrl);

    // Auto-create table if not exists so you don't even need manual SQL execution
    await sql`
      CREATE TABLE IF NOT EXISTS demo_requests (
        id SERIAL PRIMARY KEY,
        school_name VARCHAR(255) NOT NULL,
        contact_person VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        city_strength VARCHAR(255),
        programs TEXT[],
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Insert record into Neon DB
    await sql`
      INSERT INTO demo_requests (
        school_name,
        contact_person,
        email,
        phone,
        city_strength,
        programs
      ) VALUES (
        ${schoolName},
        ${contactPerson},
        ${email},
        ${phone},
        ${cityStrength || null},
        ${programs || []}
      );
    `;

    return NextResponse.json({
      success: true,
      message: "Submission saved to Neon database successfully.",
    });
  } catch (error: unknown) {
    console.error("Neon DB insertion error:", error);
    const message = error instanceof Error ? error.message : "Failed to save submission to Neon database.";
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
