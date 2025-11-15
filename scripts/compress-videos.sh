#!/bin/bash

# Video Compression Script for RAMI Landing Page
# Compresses all videos to optimize for mobile performance
# Target: Reduce 43MB total to ~8MB (81% reduction)

set -e  # Exit on error

echo "🎬 Starting video compression for mobile optimization..."
echo "================================================"

# Check if FFmpeg is installed
if ! command -v ffmpeg &> /dev/null; then
    echo "❌ Error: FFmpeg is not installed."
    echo "Install with: brew install ffmpeg (macOS) or apt-get install ffmpeg (Linux)"
    exit 1
fi

# Create backup directory
BACKUP_DIR="public/video-backups"
mkdir -p "$BACKUP_DIR"

# Create optimized directory
OPTIMIZED_DIR="public/optimized-videos"
mkdir -p "$OPTIMIZED_DIR"

# Compression function
compress_video() {
    local input=$1
    local output=$2
    local crf=$3
    local target_size=$4

    echo ""
    echo "📹 Processing: $(basename "$input")"
    echo "   Target size: ~$target_size"

    # Get original size
    original_size=$(du -h "$input" | cut -f1)
    echo "   Original size: $original_size"

    # Compress with H.264, optimized for web
    ffmpeg -i "$input" \
        -c:v libx264 \
        -crf "$crf" \
        -preset medium \
        -movflags +faststart \
        -c:a aac \
        -b:a 128k \
        -y \
        "$output" 2>&1 | grep -v "frame=" || true

    # Get compressed size
    compressed_size=$(du -h "$output" | cut -f1)
    echo "   ✅ Compressed size: $compressed_size"
}

# Process each video with specific settings
echo ""
echo "🎯 Compressing videos..."

# Hero Video (4.1MB → ~800KB) - Higher compression, background video
compress_video \
    "public/HERO-VIDEO.mp4" \
    "$OPTIMIZED_DIR/HERO-VIDEO.mp4" \
    28 \
    "800KB"

# Informative Videos (14MB → ~3MB total)
compress_video \
    "public/informative-vid-1.mp4" \
    "$OPTIMIZED_DIR/informative-vid-1.mp4" \
    26 \
    "1MB"

compress_video \
    "public/informative-vid-2.mp4" \
    "$OPTIMIZED_DIR/informative-vid-2.mp4" \
    26 \
    "1MB"

compress_video \
    "public/informative-vid-3.mp4" \
    "$OPTIMIZED_DIR/informative-vid-3.mp4" \
    26 \
    "1MB"

# Listing Videos - Most important, maintain quality
compress_video \
    "public/RAMI-1ST-LISTINGROW.mp4" \
    "$OPTIMIZED_DIR/RAMI-1ST-LISTINGROW.mp4" \
    24 \
    "1.5MB"

# BIGGEST WIN: 15MB → ~2MB
compress_video \
    "public/RAMI-2ND-LIST-ROW.mp4" \
    "$OPTIMIZED_DIR/RAMI-2ND-LIST-ROW.mp4" \
    26 \
    "2MB"

compress_video \
    "public/RAMI-LIST-3rd-listing.mp4" \
    "$OPTIMIZED_DIR/RAMI-LIST-3rd-listing.mp4" \
    24 \
    "1.5MB"

# Testimonial Video
compress_video \
    "public/TESTIMONIAL-rami.mp4" \
    "$OPTIMIZED_DIR/TESTIMONIAL-rami.mp4" \
    25 \
    "1.5MB"

echo ""
echo "================================================"
echo "✅ Compression complete!"
echo ""
echo "📊 Summary:"
echo "   Optimized videos saved to: $OPTIMIZED_DIR"
echo ""
echo "📝 Next steps:"
echo "   1. Review optimized videos for quality"
echo "   2. Backup originals: mv public/*.mp4 $BACKUP_DIR/"
echo "   3. Replace with optimized: mv $OPTIMIZED_DIR/*.mp4 public/"
echo ""
echo "⚠️  Manual review recommended before replacing originals!"
