# DNS Setup for twinklepod.com

## ✅ Amplify App Created!

**App ID**: d173cjchhdvj2f  
**Default URL**: https://d173cjchhdvj2f.amplifyapp.com  
**Custom Domain**: twinklepod.com (pending DNS)

---

## 🔧 Add These DNS Records at Your Registrar

Go to your domain registrar (GoDaddy, Namecheap, Route53, etc.) and add these records:

### 1. SSL Certificate Verification (Required First)
```
Type: CNAME
Name: _20330179a7eda4565e0cebc8ade19c7d
Value: _d3e0e82f837bdc05e906d4b2264b9305.jkddzztszm.acm-validations.aws.
TTL: 300 (or default)
```

### 2. Root Domain (twinklepod.com)
```
Type: CNAME
Name: @ (or leave blank)
Value: dd4ecqdthwznx.cloudfront.net
TTL: 300 (or default)
```

### 3. WWW Subdomain (www.twinklepod.com)
```
Type: CNAME
Name: www
Value: dd4ecqdthwznx.cloudfront.net
TTL: 300 (or default)
```

---

## ⏱️ Timeline

1. **Add DNS records** → 5 minutes
2. **DNS propagation** → 5-30 minutes
3. **SSL certificate issued** → 10-30 minutes
4. **Domain active** → Total: 30-60 minutes

---

## 📦 Next Step: Deploy Your Code

Once DNS is configured, deploy your app:

```bash
cd /Users/rithvicca/twinklepod/twinklepod-monorepo/packages/ui

# Option 1: Manual deployment (zip upload)
npm run build
zip -r deploy.zip .next public package.json next.config.ts

# Then upload via AWS Console:
# https://console.aws.amazon.com/amplify/home?region=us-east-1#/d173cjchhdvj2f

# Option 2: Connect GitHub repo (recommended)
# Go to Amplify Console → App settings → Connect repository
```

---

## 🔍 Check Status

```bash
# Check domain status
aws amplify get-domain-association \
  --app-id d173cjchhdvj2f \
  --domain-name twinklepod.com \
  --region us-east-1

# Check deployment status
aws amplify list-jobs \
  --app-id d173cjchhdvj2f \
  --branch-name main \
  --region us-east-1
```

---

## 🌐 Your URLs

After DNS propagates:
- **Production**: https://twinklepod.com
- **WWW**: https://www.twinklepod.com
- **Amplify Default**: https://d173cjchhdvj2f.amplifyapp.com

---

## ✅ Environment Variables (Already Set)

- NEXT_PUBLIC_API_URL
- NEXT_PUBLIC_COGNITO_USER_POOL_ID
- NEXT_PUBLIC_COGNITO_CLIENT_ID
- NEXT_PUBLIC_COGNITO_REGION
- NEXT_PUBLIC_CLOUDFRONT_URL

---

## 🆘 Troubleshooting

**Domain not working after 1 hour?**
- Verify DNS records at your registrar
- Check status in Amplify Console
- Ensure no conflicting DNS records

**SSL certificate pending?**
- Verify the certificate validation CNAME record is added
- Wait 30 minutes for AWS to verify

**Need help?**
- Amplify Console: https://console.aws.amazon.com/amplify/home?region=us-east-1#/d173cjchhdvj2f
- AWS Support: https://console.aws.amazon.com/support/
