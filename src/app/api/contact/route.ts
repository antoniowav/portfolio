import { NextRequest, NextResponse } from 'next/server'

// Constants for rate limiting
const RATE_LIMIT_WINDOW = 60 * 60 * 1000 // 1 hour in milliseconds
const MAX_REQUESTS_PER_IP = 5 // Max submissions per IP per hour

// Simple in-memory store for rate limiting
// In production, use Redis or similar for distributed rate limiting
const ipRequestCounts: Record<string, { count: number; timestamp: number }> = {}

// Clean up old entries every hour
setInterval(() => {
  const now = Date.now()
  for (const ip in ipRequestCounts) {
    if (now - ipRequestCounts[ip].timestamp > RATE_LIMIT_WINDOW) {
      delete ipRequestCounts[ip]
    }
  }
}, RATE_LIMIT_WINDOW)

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') || 'unknown'

    // Check rate limit
    if (ipRequestCounts[ip]) {
      if (ipRequestCounts[ip].count >= MAX_REQUESTS_PER_IP) {
        return NextResponse.json(
          {
            success: false,
            message: 'Rate limit exceeded. Please try again later.',
          },
          { status: 429 }
        )
      }
      ipRequestCounts[ip].count++
    } else {
      ipRequestCounts[ip] = { count: 1, timestamp: Date.now() }
    }

    // Parse the request body
    const body = await request.json()
    const { name, email, message } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: 'Name, email, and message are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Check message length
    if (message.length < 10) {
      return NextResponse.json(
        { success: false, message: 'Message must be at least 10 characters' },
        { status: 400 }
      )
    }

    // In a real implementation, you would send an email here
    // For example, using a service like SendGrid, Mailgun, or AWS SES
    // Example with a hypothetical sendEmail function:
    /*
    await sendEmail({
      to: process.env.CONTACT_EMAIL,
      from: email,
      subject: `New contact form submission from ${name}`,
      text: message,
      replyTo: email
    });
    */

    // For now, we'll just log the message and return success
    // Log contact form submission (removed console.log)

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Message received! Thank you for your submission.',
    })
  } catch (error) {
    // Log contact form error (removed console.error)
    return NextResponse.json(
      {
        success: false,
        message: 'An error occurred while processing your request',
      },
      { status: 500 }
    )
  }
}
