import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { id, passcode } = await request.json();

    const expectedId = process.env.ADMIN_ID || 'adityaanenenu5@gmail.com';
    const expectedPass = process.env.ADMIN_PASS || 'Abcd1234';

    if (id === expectedId && passcode === expectedPass) {
      return NextResponse.json({ success: true, message: 'Authenticated successfully' }, { status: 200 });
    }

    return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
