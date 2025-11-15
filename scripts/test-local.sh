#!/bin/bash

# Quick Local Testing Script
# Tests your optimizations before pushing to git

set -e

echo "🧪 Starting Pre-Push Testing..."
echo "================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Step 1: Build Test
echo "📦 Step 1/5: Testing Production Build..."
if npm run build > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Build successful${NC}"
else
    echo -e "${RED}❌ Build failed${NC}"
    echo "Run 'npm run build' to see errors"
    exit 1
fi
echo ""

# Step 2: Check video sizes
echo "🎬 Step 2/5: Checking Video Optimization..."
echo "Original videos (backed up):"
du -sh public/video-backups 2>/dev/null || echo "No backups found"
echo "Optimized videos:"
du -sh public/*.mp4 2>/dev/null | head -8
echo ""

total_size=$(du -ch public/*.mp4 2>/dev/null | tail -1 | cut -f1)
echo "Total video size: $total_size"

if [[ "$total_size" =~ "M" ]] && [[ ${total_size%%M*} -lt 45 ]]; then
    echo -e "${GREEN}✅ Video compression successful (<45MB)${NC}"
else
    echo -e "${YELLOW}⚠️  Video size might be high${NC}"
fi
echo ""

# Step 3: Check poster images
echo "🖼️  Step 3/5: Checking Poster Images..."
poster_count=$(ls -1 public/posters/*.jpg 2>/dev/null | wc -l | tr -d ' ')
if [ "$poster_count" -eq 8 ]; then
    echo -e "${GREEN}✅ All 8 poster images generated${NC}"
    du -sh public/posters
else
    echo -e "${YELLOW}⚠️  Found $poster_count posters (expected 8)${NC}"
fi
echo ""

# Step 4: Check if port 3000 is available
echo "🌐 Step 4/5: Checking Port Availability..."
if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo -e "${YELLOW}⚠️  Port 3000 is in use${NC}"
    echo "To free it up, run:"
    echo "  lsof -ti:3000 | xargs kill -9"
    echo "  npm run start"
else
    echo -e "${GREEN}✅ Port 3000 is available${NC}"
    echo "Ready to start server with: npm run start"
fi
echo ""

# Step 5: File structure check
echo "📁 Step 5/5: Verifying File Structure..."
errors=0

# Check critical files
if [ -f "components/lazy-video.tsx" ]; then
    echo -e "${GREEN}✅${NC} LazyVideo component"
else
    echo -e "${RED}❌${NC} LazyVideo component missing"
    errors=$((errors + 1))
fi

if [ -f "hooks/useIntersectionObserver.ts" ]; then
    echo -e "${GREEN}✅${NC} useIntersectionObserver hook"
else
    echo -e "${RED}❌${NC} useIntersectionObserver hook missing"
    errors=$((errors + 1))
fi

if [ -f "hooks/useWebVitals.ts" ]; then
    echo -e "${GREEN}✅${NC} useWebVitals hook"
else
    echo -e "${RED}❌${NC} useWebVitals hook missing"
    errors=$((errors + 1))
fi

if [ -d "public/posters" ]; then
    echo -e "${GREEN}✅${NC} Posters directory"
else
    echo -e "${RED}❌${NC} Posters directory missing"
    errors=$((errors + 1))
fi

if [ -d "public/video-backups" ]; then
    echo -e "${GREEN}✅${NC} Video backups directory"
else
    echo -e "${YELLOW}⚠️${NC}  Video backups directory missing (videos may not be backed up)"
fi

echo ""

# Final summary
echo "================================"
if [ $errors -eq 0 ]; then
    echo -e "${GREEN}✅ All checks passed!${NC}"
    echo ""
    echo "🚀 Next steps:"
    echo "1. Start server: npm run start"
    echo "2. Open browser: http://localhost:3000"
    echo "3. Test on mobile (DevTools → Device toolbar)"
    echo "4. Check Console for Web Vitals logs"
    echo "5. Run Lighthouse (DevTools → Lighthouse tab)"
    echo ""
    echo "📖 Full testing guide: TESTING_GUIDE.md"
else
    echo -e "${RED}❌ $errors error(s) found${NC}"
    echo "Please fix issues before deploying"
    exit 1
fi
