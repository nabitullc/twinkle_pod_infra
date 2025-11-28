# Amplify Stack Deployment Guide

## Overview

The Amplify stack manages the TwinklePod UI deployment via AWS CDK, ensuring all infrastructure is version-controlled and reproducible.

## Prerequisites

1. **GitHub Personal Access Token** with `repo` scope
   - Go to: https://github.com/settings/tokens
   - Generate new token (classic)
   - Select `repo` scope
   - Copy token

2. **Existing Infrastructure**
   - Storage Stack (CloudFront URL)
   - Auth Stack (Cognito User Pool)
   - API Stack (API Gateway URL)

## Deployment

### 1. Set GitHub Token

```bash
export GITHUB_TOKEN="ghp_your_token_here"
```

### 2. Deploy Amplify Stack

```bash
cd packages/infra
cdk deploy TwinklePod-Amplify-beta
```

### 3. Configure DNS (One-time)

After deployment, CDK will output DNS records. Add these to your domain registrar:

```
# SSL Verification CNAME
_20330179a7eda4565e0cebc8ade19c7d.twinklepod.com → _validation.amplifyapp.com

# Root domain CNAME
@ → [branch-id].amplifyapp.com

# WWW subdomain CNAME
www → [branch-id].amplifyapp.com
```

**Note**: DNS propagation takes 30-60 minutes.

## What Gets Created

- **Amplify App**: `twinklepod-ui-beta`
- **Branch**: `main` (auto-deploy on push)
- **Domain**: `twinklepod.com` + `www.twinklepod.com`
- **Environment Variables**: Automatically injected from other stacks
  - `NEXT_PUBLIC_API_URL`
  - `NEXT_PUBLIC_COGNITO_USER_POOL_ID`
  - `NEXT_PUBLIC_COGNITO_CLIENT_ID`
  - `NEXT_PUBLIC_COGNITO_REGION`
  - `NEXT_PUBLIC_CLOUDFRONT_URL`

## Updating Environment Variables

If you need to update environment variables after deployment:

```bash
# Update the stack
cdk deploy TwinklePod-Amplify-beta

# Or manually via AWS Console
# Amplify > twinklepod-ui-beta > Environment variables
```

## Removing Manual Amplify App

If you previously created an Amplify app manually via CLI:

```bash
# List apps
aws amplify list-apps

# Delete old app (if exists)
aws amplify delete-app --app-id d173cjchhdvj2f
```

## Troubleshooting

### Build Fails

Check build logs in AWS Console:
```
Amplify > twinklepod-ui-beta > main > Build history
```

Common issues:
- Missing environment variables
- Node version mismatch
- Build command errors

### Domain Not Working

1. Verify DNS records are correct
2. Check SSL certificate status in Amplify Console
3. Wait for DNS propagation (up to 60 minutes)

### Environment Variables Not Applied

Redeploy the branch:
```bash
aws amplify start-job --app-id [APP_ID] --branch-name main --job-type RELEASE
```

## CI/CD Flow

1. Push to `main` branch
2. Amplify detects change
3. Runs build (from monorepo `packages/ui`)
4. Deploys to CloudFront
5. Available at `twinklepod.com`

## Cost

- **Amplify Hosting**: ~$15/month (500 MAU)
- **Build minutes**: Free tier (1000 min/month)
- **Data transfer**: Included in CloudFront costs

## Next Steps

After deployment:
1. Verify site loads at `https://twinklepod.com`
2. Test authentication flow
3. Monitor build logs for first deployment
4. Set up CloudWatch alarms for build failures
