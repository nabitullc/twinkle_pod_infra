# @twinklepod/ui

Next.js 14 frontend for TwinklePod MVP.

## Features

- ✅ Next.js 14 with App Router
- ✅ TypeScript
- ✅ Tailwind CSS
- ✅ Cognito authentication
- ✅ Context providers (Auth, Child)
- ✅ Responsive layout

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Environment Variables

Create `.env.local`:

```
NEXT_PUBLIC_API_URL=https://6c0ae99ndf.execute-api.us-east-1.amazonaws.com/prod
NEXT_PUBLIC_COGNITO_USER_POOL_ID=us-east-1_bvX3w7hFX
NEXT_PUBLIC_COGNITO_CLIENT_ID=hbrnn4qbumoou59854fif8ivv
NEXT_PUBLIC_COGNITO_REGION=us-east-1
NEXT_PUBLIC_CLOUDFRONT_URL=https://ddtxvdz23zxh1.cloudfront.net
```

## Pages

- `/` - Home page
- `/login` - Login/Register
- `/dashboard` - Manage children
- `/stories` - Browse stories
- `/stories/[id]` - Story reader (coming soon)
- `/library` - My library (coming soon)

## Components

### Layout
- `Header` - Navigation with child selector
- `Footer` - Site footer

### UI
- `Button` - Styled button component
- `Modal` - Modal dialog

### Contexts
- `AuthContext` - User authentication state
- `ChildContext` - Child profiles management

## Deployment

Deploy to AWS Amplify:

1. Connect GitHub repo
2. Set environment variables
3. Build command: `npm run build`
4. Output directory: `.next`

## Next Steps

- [ ] Story reader page
- [ ] Library page with tabs
- [ ] Progress tracking UI
- [ ] Favorite button
- [ ] Loading skeletons
- [ ] Error boundaries
