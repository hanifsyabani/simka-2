import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Daftar halaman yang perlu proteksi login
const protectedRoutes = ['/dashboard', '/admin', '/profile'];

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  // Cek apakah user mengakses halaman yang diproteksi
  const isProtected = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  // Kalau halaman dilindungi dan tidak ada token, redirect ke login
  if (isProtected && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Jika halaman tidak diproteksi atau token ada, lanjutkan
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*'],
};
