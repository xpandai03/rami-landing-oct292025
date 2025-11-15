#!/bin/bash

# Generate Poster Images from Videos
# Extracts the first frame of each video as a high-quality JPG poster

set -e  # Exit on error

echo "🎨 Generating video poster images..."
echo "================================================"

# Check if FFmpeg is installed
if ! command -v ffmpeg &> /dev/null; then
    echo "❌ Error: FFmpeg is not installed."
    echo "Install with: brew install ffmpeg (macOS) or apt-get install ffmpeg (Linux)"
    exit 1
fi

# Create posters directory
POSTERS_DIR="public/posters"
mkdir -p "$POSTERS_DIR"

# Function to generate poster
generate_poster() {
    local video=$1
    local output=$2
    local filename=$(basename "$video" .mp4)

    echo ""
    echo "📸 Extracting poster from: $filename.mp4"

    # Extract frame at 1 second (to avoid black frames)
    ffmpeg -i "$video" \
        -ss 00:00:01 \
        -vframes 1 \
        -q:v 2 \
        -y \
        "$output" 2>&1 | grep -v "frame=" || true

    local size=$(du -h "$output" | cut -f1)
    echo "   ✅ Poster created: $size"
}

# Generate posters for all videos
echo ""
echo "🎯 Processing videos..."

generate_poster \
    "public/HERO-VIDEO.mp4" \
    "$POSTERS_DIR/hero-poster.jpg"

generate_poster \
    "public/informative-vid-1.mp4" \
    "$POSTERS_DIR/informative-1-poster.jpg"

generate_poster \
    "public/informative-vid-2.mp4" \
    "$POSTERS_DIR/informative-2-poster.jpg"

generate_poster \
    "public/informative-vid-3.mp4" \
    "$POSTERS_DIR/informative-3-poster.jpg"

generate_poster \
    "public/RAMI-1ST-LISTINGROW.mp4" \
    "$POSTERS_DIR/listing-1-poster.jpg"

generate_poster \
    "public/RAMI-2ND-LIST-ROW.mp4" \
    "$POSTERS_DIR/listing-2-poster.jpg"

generate_poster \
    "public/RAMI-LIST-3rd-listing.mp4" \
    "$POSTERS_DIR/listing-3-poster.jpg"

generate_poster \
    "public/TESTIMONIAL-rami.mp4" \
    "$POSTERS_DIR/testimonial-poster.jpg"

echo ""
echo "================================================"
echo "✅ Poster generation complete!"
echo ""
echo "📊 Summary:"
echo "   Posters saved to: $POSTERS_DIR"
echo "   Total posters: $(ls -1 $POSTERS_DIR/*.jpg 2>/dev/null | wc -l)"
echo ""
echo "📝 Next steps:"
echo "   1. Review poster images for quality"
echo "   2. Posters will be used by LazyVideo component"
echo "   3. Posters will auto-convert to WebP via Next.js Image"
