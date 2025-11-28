# Deploy TwinklePod UI to twinklepod.com

## Option 1: AWS Amplify (Recommended)

### Step 1: Deploy to Amplify
```bash
cd /Users/rithvicca/twinklepod/twinklepod-monorepo/packages/ui
npm run build  # Test build first
```

### Step 2: Create Amplify App
```bash
# Install Amplify CLI if needed
npm install -g @aws-amplify/cli

# Deploy
amplify init
amplify add hosting
amplify publish
```

### Step 3: Add Custom Domain
1. Go to AWS Amplify Console
2. Select your app
3. Click "Domain management"
4. Click "Add domain"
5. Enter: `twinklepod.com`
6. Amplify will provide DNS records

### Step 4: Update DNS (at your registrar)
Add these records (Amplify will show exact values):
```
Type: CNAME
Name: www
Value: [amplify-provided-value]

Type: A
Name: @
Value: [amplify-provided-ip]
```

**Time to propagate**: 5-30 minutes

---

## Option 2: Vercel (Alternative - Faster)

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Deploy
```bash
cd /Users/rithvicca/twinklepod/twinklepod-monorepo/packages/ui
vercel
```

### Step 3: Add Domain
```bash
vercel domains add twinklepod.com
```

### Step 4: Update DNS
Vercel will show you the DNS records to add at your registrar.

---

## Quick Start (Choose One)

**For AWS Amplify**:
```bash
cd packages/ui
npm run build
# Then follow AWS Amplify Console steps
```

**For Vercel**:
```bash
cd packages/ui
npx vercel --prod
vercel domains add twinklepod.com
```

---

## Environment Variables

Before deploying, set these in Amplify/Vercel:

```env
NEXT_PUBLIC_API_URL=https://6c0ae99ndf.execute-api.us-east-1.amazonaws.com/beta
NEXT_PUBLIC_COGNITO_USER_POOL_ID=us-east-1_bvX3w7hFX
NEXT_PUBLIC_COGNITO_CLIENT_ID=[your-client-id]
NEXT_PUBLIC_CDN_URL=https://ddtxvdz23zxh1.cloudfront.net
```

---

## SSL Certificate

Both Amplify and Vercel provide free SSL automatically.

Your site will be accessible at:
- https://twinklepod.com
- https://www.twinklepod.com
