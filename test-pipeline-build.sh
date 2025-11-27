#!/bin/bash
set -e
echo "=== Simulating Pipeline Build ==="
echo "Step 1: npm ci"
npm ci
echo "Step 2: npm run build"
npm run build
echo "Step 3: Check outputs"
ls -la packages/api/dist/handlers/
ls -la packages/infra/bin/
echo "✅ Pipeline simulation successful"
