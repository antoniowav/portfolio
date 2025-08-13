import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// We'll initialize Resend in the request handler to allow for API key override

// Constants for rate limiting
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour in milliseconds
const MAX_REQUESTS_PER_IP = 5; // Max submissions per IP per hour

// Simple in-memory store for rate limiting
// In production, use Redis or similar for distributed rate limiting
const ipRequestCounts: Record<string, { count: number; timestamp: number }> =
  {};

// Clean up old entries every hour
setInterval(() => {
  const now = Date.now();
  for (const ip in ipRequestCounts) {
    if (now - ipRequestCounts[ip].timestamp > RATE_LIMIT_WINDOW) {
      delete ipRequestCounts[ip];
    }
  }
}, RATE_LIMIT_WINDOW);

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get("x-forwarded-for") || "unknown";

    // Check rate limit
    if (ipRequestCounts[ip]) {
      if (ipRequestCounts[ip].count >= MAX_REQUESTS_PER_IP) {
        return NextResponse.json(
          {
            success: false,
            message: "Rate limit exceeded. Please try again later.",
          },
          { status: 429 },
        );
      }
      ipRequestCounts[ip].count++;
    } else {
      ipRequestCounts[ip] = { count: 1, timestamp: Date.now() };
    }

    // Parse the request body
    const body = await request.json();
    const { name, email, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: "Name, email, and message are required" },
        { status: 400 },
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: "Invalid email format" },
        { status: 400 },
      );
    }

    // Check message length
    if (message.length < 10) {
      return NextResponse.json(
        { success: false, message: "Message must be at least 10 characters" },
        { status: 400 },
      );
    }

    // Send email using Resend
    try {
      // Check if an API key was provided in the headers (for testing)
      const headerApiKey = request.headers.get("X-Resend-Api-Key");

      // Use the API key from headers if provided, otherwise use env variable
      const apiKey = headerApiKey || process.env.RESEND_API_KEY;

      if (!apiKey) {
        return NextResponse.json(
          {
            success: false,
            message: "Resend API key is not configured",
          },
          { status: 500 },
        );
      }

      // Initialize Resend with the selected API key
      const resend = new Resend(apiKey);

      // Use Resend's default testing email address
      const fromEmail = "onboarding@resend.dev";
      const toEmail = process.env.EMAIL_TO || "your@email.com";

      console.log(
        "Attempting to send email with Resend using API key:",
        "API key provided but hidden for security",
      );
      const { data, error } = await resend.emails.send({
        from: fromEmail,
        to: [toEmail],
        subject: `New contact form submission from ${name}`,
        reply_to: email,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #4338ca;">New Contact Form Submission</h2>
            <p><strong>From:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <h3 style="margin-top: 24px;">Message:</h3>
            <div style="border-left: 4px solid #e5e7eb; padding-left: 16px; margin-top: 8px;">
              <p>${message.replace(/\n/g, "<br>")}</p>
            </div>
            <p style="margin-top: 24px; font-size: 14px; color: #6b7280;">
              This email was sent from the contact form on your portfolio website.
            </p>
          </div>
        `,
      });

      if (error) {
        console.error("Error sending email:", JSON.stringify(error, null, 2));
        return NextResponse.json(
          {
            success: false,
            message: `Failed to send email: ${error.message || "Unknown error"}`,
            error: error,
          },
          { status: 500 },
        );
      }

      // Return success response
      return NextResponse.json({
        success: true,
        message: "Message received! Thank you for your submission.",
        id: data?.id,
      });
    } catch (emailError) {
      console.error(
        "Error in email sending:",
        emailError instanceof Error
          ? emailError.message
          : JSON.stringify(emailError, null, 2),
      );
      return NextResponse.json(
        {
          success: false,
          message: "An error occurred while sending your message",
          error:
            emailError instanceof Error
              ? emailError.message
              : String(emailError),
          details: "Check server logs for more information",
        },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error(
      "Error processing contact form:",
      error instanceof Error
        ? error.stack || error.message
        : JSON.stringify(error, null, 2),
    );
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while processing your request",
        error: error instanceof Error ? error.message : String(error),
        details: "Check server logs for more information",
      },
      { status: 500 },
    );
  }
}
