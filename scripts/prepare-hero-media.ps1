$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent $PSScriptRoot
$sourceVideo = Join-Path $projectRoot 'media-masters/Soggetto_e_pitch_una_fr_gwr_video_mvp.mp4'
$videoDir = Join-Path $projectRoot 'public/videos'
$masterDir = Join-Path $projectRoot 'media-masters'

if (-not (Test-Path -LiteralPath $sourceVideo)) { throw 'Original source video is missing.' }
Get-Command ffmpeg -ErrorAction Stop | Out-Null
New-Item -ItemType Directory -Force -Path $videoDir, $masterDir | Out-Null

function Render-Media([string[]]$MediaArgs) {
    & ffmpeg -hide_banner -loglevel error @MediaArgs
    if ($LASTEXITCODE -ne 0) { throw "FFmpeg failed ($LASTEXITCODE)." }
}

# Conventional Lanczos resizing and subtle luma sharpening, without AI,
# invented details, frame interpolation, audio, third-party uploads or logos.
$sharedArgs = @('-i', $sourceVideo, '-map', '0:v:0', '-an', '-c:v', 'libx264', '-preset', 'slow', '-g', '48', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-map_metadata', '-1')
Render-Media ($sharedArgs + @('-vf', 'scale=1920:1080:flags=lanczos,unsharp=5:5:0.25:3:3:0', '-crf', '26', '-y', (Join-Path $videoDir 'ciclo-hero-1080.mp4')))
Render-Media ($sharedArgs + @('-vf', 'unsharp=5:5:0.2:3:3:0', '-crf', '24', '-y', (Join-Path $videoDir 'ciclo-hero-720.mp4')))
Render-Media ($sharedArgs + @('-vf', 'scale=2560:1440:flags=lanczos,unsharp=5:5:0.25:3:3:0', '-crf', '17', '-y', (Join-Path $masterDir 'ciclo-produttivo-1440p.mp4')))
