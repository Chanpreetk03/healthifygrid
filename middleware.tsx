// // middleware.ts
// import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// const isProtectedRoute = createRouteMatcher([
//   '/forum(.*)',
//   '/calculator(.*)',
//   '/advisory(.*)',
//   '/chat(.*)',
// ]);

// export default clerkMiddleware(async (auth, req) => {
//   if (isProtectedRoute(req)) {
//     await auth.protect({ signInUrl: '/login' });
//   }
// });

// export const config = {
//   matcher: [
//     // Match all routes except static files
//     '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
//     // Always run for API routes
//     '/(api|trpc)(.*)',
//   ],
// };

// middleware.ts
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher([
  '/forum(.*)',
  '/calculator(.*)',
  '/advisory(.*)',
  '/chat(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    // For debugging: only protect, no redirect
    await auth.protect();
  }
});

export const config = {
  matcher: [
    '/forum/:path*',
    '/calculator/:path*',
    '/advisory/:path*',
    '/chat/:path*',
  ],
};
