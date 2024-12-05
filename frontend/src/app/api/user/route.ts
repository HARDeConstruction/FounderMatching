import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req: NextRequest) {
  try {
    const backendUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/current-user`;

    const response = await axios.get(backendUrl, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: req.headers.get('Authorization') || '', // Forward token if needed
      },
      withCredentials: true, // Include cookies for session-based auth
    });

    return NextResponse.json(response.data); // Return the data to the frontend
  } catch (error: any) {
    console.error('Error fetching user profile:', error.message);
    return NextResponse.json(
      { error: error.response?.data?.detail || 'Internal Server Error' },
      { status: error.response?.status || 500 }
    );
  }
}
