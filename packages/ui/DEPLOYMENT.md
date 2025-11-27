# UI Deployment Guide

## AWS Amplify Deployment

### Prerequisites
- AWS Account with Amplify access
- GitHub repository connected

### Step 1: Create Amplify App

```bash
# Via AWS Console
1. Go to AWS Amplify Console
2. Click "New app" → "Host web app"
3. Connect GitHub repository: nabitullc/twinkle_pod_monorepo
4. Select branch: main
```

### Step 2: Configure Build Settings

**App root directory**: `packages/ui`

**Build settings** (use amplify.yml):
```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
      - .next/cache/**/*
```

### Step 3: Environment Variables

Add in Amplify Console → Environment variables:

```
NEXT_PUBLIC_API_URL=https://6c0ae99ndf.execute-api.us-east-1.amazonaws.com/prod
NEXT_PUBLIC_COGNITO_USER_POOL_ID=us-east-1_bvX3w7hFX
NEXT_PUBLIC_COGNITO_CLIENT_ID=hbrnn4qbumoou59854fif8ivv
NEXT_PUBLIC_COGNITO_REGION=us-east-1
NEXT_PUBLIC_CLOUDFRONT_URL=https://ddtxvdz23zxh1.cloudfront.net
```

### Step 4: Deploy

1. Click "Save and deploy"
2. Wait for build to complete (~3-5 minutes)
3. Access app at: `https://[app-id].amplifyapp.com`

### Step 5: Custom Domain (Optional)

1. Go to Domain management
2. Add custom domain: `twinklepod.com`
3. Configure DNS records
4. Wait for SSL certificate provisioning

---

## Manual Deployment (Alternative)

### Build locally
```bash
cd packages/ui
npm run build
```

### Deploy to S3 + CloudFront
```bash
# Export static site
npm run build

# Upload to S3
aws s3 sync .next/static s3://twinklepod-ui-beta/static
aws s3 sync .next/server s3://twinklepod-ui-beta/server

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id [ID] --paths "/*"
```

---

## Verification

### Test Endpoints
- Home: `/`
- Login: `/login`
- Dashboard: `/dashboard`
- Stories: `/stories`
- Story Reader: `/stories/[id]`
- Library: `/library`

### Test Flows
1. Sign up new user
2. Create child profile
3. Browse stories
4. Read a story
5. Check library tabs

---

## Monitoring

### Amplify Console
- Build logs
- Access logs
- Performance metrics

### CloudWatch
- Lambda errors (API calls)
- API Gateway metrics
- Cognito authentication events

---

## Troubleshooting

### Build Fails
- Check Node.js version (18+)
- Verify environment variables
- Check build logs in Amplify Console

### API Errors
- Verify API_URL is correct
- Check CORS settings on API Gateway
- Verify Cognito credentials

### Authentication Issues
- Check Cognito User Pool ID
- Verify Client ID
- Check redirect URLs in Cognito

---

## Cost Estimate

**Amplify Hosting** (500 MAU):
- Build minutes: $0.01/min × 10 builds/month = $0.10
- Hosting: $0.15/GB × 1GB = $0.15
- Data transfer: $0.15/GB × 5GB = $0.75
- **Total**: ~$1/month

---

**Status**: Ready for deployment  
**Last Updated**: 2025-11-27
