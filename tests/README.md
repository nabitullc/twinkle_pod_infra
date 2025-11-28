# TwinklePod E2E Integration Tests

Browser-based end-to-end tests using Playwright with load testing capabilities.

## Setup

```bash
# Install Playwright browsers
npm run test:install

# Copy environment config
cp .env.test.example .env.test

# Edit .env.test with your credentials
```

## Running Tests

### Local Development

```bash
# Run all E2E tests
npm run test:e2e

# Run with UI (interactive mode)
npm run test:e2e:ui

# Run in headed mode (see browser)
npm run test:e2e:headed

# Debug mode
npm run test:e2e:debug

# Run specific test
npm run test:e2e -- tests/e2e/01-registration.spec.ts

# Run specific browser
npm run test:e2e -- --project=chromium
```

### Load Testing

```bash
# Run load tests (100 concurrent users)
npm run test:load

# Custom user count
LOAD_TEST_USERS=50 npm run test:load
```

## CI/CD Pipeline

### Manual Trigger (GitHub Actions)

1. Go to Actions tab
2. Select "E2E Integration Tests"
3. Click "Run workflow"
4. Configure:
   - **Run E2E tests**: true/false
   - **Run load tests**: true/false
   - **Environment**: beta/production

### Automatic Trigger

- Runs on push to `main` or `beta` branches
- Runs on pull requests to `main`
- E2E tests: Enabled by default
- Load tests: Disabled by default (manual trigger only)

## Test Structure

```
tests/
├── e2e/                    # Functional E2E tests
│   ├── 01-registration.spec.ts
│   ├── 02-login.spec.ts
│   ├── 03-child-profiles.spec.ts
│   ├── 04-story-browsing.spec.ts
│   ├── 05-story-reading.spec.ts
│   ├── 06-favorites.spec.ts
│   ├── 07-library.spec.ts
│   └── 08-mobile.spec.ts
├── load/                   # Load tests
│   └── concurrent-users.spec.ts
└── helpers/                # Test utilities
    └── auth.ts
```

## Environment Variables

```bash
# Required
BASE_URL=https://beta.twinklepod.com
TEST_USER_EMAIL=test@twinklepod.com
TEST_USER_PASSWORD=Test1234!

# Optional
LOAD_TEST=false
LOAD_TEST_USERS=100
```

## Test Reports

- HTML report: `playwright-report/index.html`
- Videos (on failure): `test-results/`
- Screenshots (on failure): `test-results/`

## Troubleshooting

### Tests failing locally

1. Ensure UI is running: `cd packages/ui && npm run dev`
2. Check `.env.test` credentials
3. Run in headed mode to see browser: `npm run test:e2e:headed`

### CI/CD failures

1. Check GitHub Actions logs
2. Download test artifacts (videos, screenshots)
3. Verify environment URLs are correct

## Adding New Tests

1. Create test file in `tests/e2e/`
2. Use helpers from `tests/helpers/auth.ts`
3. Add `data-testid` attributes to UI components
4. Run locally before committing

## Performance Targets

- Page load: < 3s (p95)
- API response: < 500ms (p95)
- Concurrent users: 100+
- No 5xx errors under load
