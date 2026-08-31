import { NextResponse } from "next/server";

type ContactPayload = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  message: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<ContactPayload>;
  const { firstName, lastName, email, phone, message } = body;

  if (!firstName || !lastName || !email || !message) {
    return NextResponse.json(
      { error: "First name, last name, email and message are required." },
      { status: 400 }
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  // TODO: wire up real delivery once a provider is chosen (e.g. Resend) —
  // add RESEND_API_KEY to .env.local and send to info@childhoodisnow.co.uk.
  // Logging server-side for now so submissions aren't silently dropped.
  console.log("New contact submission:", {
    firstName,
    lastName,
    email,
    phone,
    message,
    receivedAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
