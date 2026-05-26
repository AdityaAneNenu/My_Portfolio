import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

export const dynamic = 'force-dynamic';

const filePath = path.join(process.cwd(), 'src', 'data', 'portfolio-data.json');

// Helper to write file atomically
async function writeJsonAtomic(filePath: string, data: any) {
  const tempPath = `${filePath}.${Date.now()}.tmp`;
  const jsonString = JSON.stringify(data, null, 2);
  
  // Write to temporary file
  await fs.writeFile(tempPath, jsonString, 'utf-8');
  
  // Rename temp file to target file (atomic operation)
  // On Windows, retry up to 5 times with a 100ms delay to prevent EBUSY/lock issues
  let attempts = 5;
  while (attempts > 0) {
    try {
      await fs.rename(tempPath, filePath);
      return;
    } catch (err: any) {
      attempts--;
      if (attempts === 0) {
        // Clean up temp file
        try {
          await fs.unlink(tempPath);
        } catch (_) {}
        throw err;
      }
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }
}

// GET: Read portfolio data
export async function GET() {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return NextResponse.json(JSON.parse(data), { status: 200 });
  } catch (error) {
    console.error('Error reading portfolio data:', error instanceof Error ? error.stack : error);
    return NextResponse.json(
      { error: 'Failed to read portfolio data' },
      { status: 500 }
    );
  }
}

// POST: Save portfolio data (authenticated)
export async function POST(request: NextRequest) {
  try {
    const adminId = request.headers.get('x-admin-id');
    const adminPass = request.headers.get('x-admin-pass');

    const expectedId = process.env.ADMIN_ID || 'adityaanenenu5@gmail.com';
    const expectedPass = process.env.ADMIN_PASS || 'Abcd1234';

    // Authenticate credentials
    if (adminId !== expectedId || adminPass !== expectedPass) {
      return NextResponse.json(
        { error: 'Unauthorized: Invalid ID or passcode' },
        { status: 401 }
      );
    }

    const newData = await request.json();

    // Basic structure validation
    if (!newData.hero || !newData.projects || !newData.skills) {
      return NextResponse.json(
        { error: 'Invalid data structure' },
        { status: 400 }
      );
    }

    // Write back to local file on disk atomically
    await writeJsonAtomic(filePath, newData);

    return NextResponse.json(
      { message: 'Portfolio data updated successfully!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error writing portfolio data:', error instanceof Error ? error.stack : error);
    return NextResponse.json(
      { error: 'Failed to save portfolio data' },
      { status: 500 }
    );
  }
}
