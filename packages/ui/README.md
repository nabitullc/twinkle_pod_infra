# @twinklepod/ui

Next.js 14 frontend for TwinklePod MVP.

## ✅ Status: Week 1 Complete

All MVP frontend features implemented and ready for deployment.

## Features

- ✅ Next.js 14 with App Router
- ✅ TypeScript
- ✅ Tailwind CSS v4
- ✅ Cognito authentication
- ✅ Context providers (Auth, Child)
- ✅ Responsive layout with mobile menu
- ✅ Loading skeletons
- ✅ Error handling

## Pages

| Route | Status | Features |
|-------|--------|----------|
| `/` | ✅ Complete | Home page with hero and features |
| `/login` | ✅ Complete | Login/register with Cognito |
| `/dashboard` | ✅ Complete | Manage children (CRUD) |
| `/stories` | ✅ Complete | Browse stories with category filter |
| `/stories/[id]` | ✅ Complete | Story reader with progress tracking |
| `/library` | ✅ Complete | Continue, favorites, completed tabs |
| `/not-found` | ✅ Complete | 404 page |

## Components

### Layout
- `Header` - Navigation with child selector + mobile menu
- `Footer` - Site footer

### UI
- `Button` - Styled button (primary, secondary, outline)
- `Modal` - Modal dialog
- `LoadingSkeleton` - Loading states

### Contexts
- `AuthContext` - User authentication state
- `ChildContext` - Child profiles management

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

## Build

```bash
npm run build
```

Output: `.next/` directory

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for AWS Amplify deployment guide.

**Quick Deploy**:
1. Connect GitHub repo to Amplify
2. Set app root: `packages/ui`
3. Add environment variables
4. Deploy

## API Integration

All endpoints integrated:
- ✅ `POST /users/register`
- ✅ `POST /users/login`
- ✅ `GET /users/profile`
- ✅ `GET /api/children`
- ✅ `POST /api/children`
- ✅ `DELETE /api/children/{id}`
- ✅ `GET /stories/list`
- ✅ `GET /stories/{id}`
- ✅ `POST /api/progress`
- ✅ `POST /api/interaction`
- ✅ `GET /api/library`

## Testing Checklist

- [ ] Sign up new user
- [ ] Login existing user
- [ ] Create child profile
- [ ] Browse stories by category
- [ ] Read a story
- [ ] Track reading progress
- [ ] Favorite a story
- [ ] View library tabs
- [ ] Delete child profile
- [ ] Logout

---

**Status**: ✅ Ready for deployment  
**Last Updated**: 2025-11-27
