// out/ 디렉터리 내 이미지를 in-place로 최적화한다.
// - PNG/JPEG/JPG: 너비 max 1920px로 리사이즈, 품질 80 재인코딩 (포맷 유지)
// - WebP: 너비 max 1920px로 리사이즈, 품질 80
// - 원본 파일명 유지 → 컴포넌트의 next/image src 수정 불필요
// 기준 크기: 500KB 미만은 건너뛴다 (이미 충분히 작음).
//
// 콘텐츠 해시 캐시 (HM-FE-104):
//   각 이미지의 sha256(원본) + 설정(q/w)을 키로 최적화 결과를 캐시한다.
//   - 캐시 hit → 캐시본 복사 (sharp 스킵, 빠름)
//   - 캐시 miss → sharp 최적화 + 캐시 저장
//   캐시 경로: env IMAGE_CACHE_DIR (CI self-hosted EC2 영구 경로) || node_modules/.cache/kkebi-images (로컬)
//   설정(QUALITY/MAX_WIDTH) 변경 시 키가 바뀌어 자동 재처리.

import { readdir, stat, readFile, writeFile, mkdir, copyFile, access } from "node:fs/promises";
import { join, extname } from "node:path";
import { createHash } from "node:crypto";
import sharp from "sharp";

const TARGET_DIR = "out";
const MAX_WIDTH = 1920;
const QUALITY = 80;
const SKIP_BELOW_BYTES = 500 * 1024;

const SUPPORTED = new Set([".png", ".jpg", ".jpeg", ".webp"]);

// 캐시 디렉터리 — CI는 env로 EC2 영구 경로 지정, 로컬은 node_modules/.cache.
const CACHE_DIR = process.env.IMAGE_CACHE_DIR || "node_modules/.cache/kkebi-images";
// 설정 시그니처 — 바뀌면 캐시 키가 달라져 자동 무효화.
const SETTINGS_SIG = `q${QUALITY}-w${MAX_WIDTH}`;

async function* walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

function cacheKeyFor(buf, ext) {
  const sha = createHash("sha256").update(buf).digest("hex");
  return `${sha}-${SETTINGS_SIG}${ext}`;
}

async function exists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function optimizeOne(file) {
  const ext = extname(file).toLowerCase();
  if (!SUPPORTED.has(ext)) return null;

  const { size: before } = await stat(file);
  if (before < SKIP_BELOW_BYTES) return null;

  const buf = await readFile(file);

  // ── 캐시 조회 ──────────────────────────────────────────────
  const cachePath = join(CACHE_DIR, cacheKeyFor(buf, ext));
  if (await exists(cachePath)) {
    const { size: cachedSize } = await stat(cachePath);
    // 캐시본이 원본보다 크면(최적화 무의미했던 케이스) 원본 유지.
    if (cachedSize < before) {
      await copyFile(cachePath, file);
      return { file, before, after: cachedSize, skipped: false, cached: true };
    }
    return { file, before, after: before, skipped: true, cached: true };
  }

  // ── 캐시 miss → sharp 최적화 ───────────────────────────────
  const img = sharp(buf, { failOn: "none" });
  const meta = await img.metadata();

  let pipeline = img;
  if (meta.width && meta.width > MAX_WIDTH) {
    pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
  }

  let out;
  if (ext === ".png") {
    out = await pipeline.png({ quality: QUALITY, compressionLevel: 9, palette: true }).toBuffer();
  } else if (ext === ".webp") {
    out = await pipeline.webp({ quality: QUALITY }).toBuffer();
  } else {
    out = await pipeline.jpeg({ quality: QUALITY, mozjpeg: true }).toBuffer();
  }

  // 최적화본을 캐시에 저장 (원본보다 작을 때만 의미 있지만, 키 일관성 위해 결과 그대로 저장).
  await writeFile(cachePath, out).catch(() => { /* 캐시 저장 실패는 빌드 막지 않음 */ });

  if (out.length >= before) return { file, before, after: before, skipped: true, cached: false };

  await writeFile(file, out);
  return { file, before, after: out.length, skipped: false, cached: false };
}

function fmt(bytes) {
  if (bytes >= 1024 * 1024) return (bytes / 1024 / 1024).toFixed(2) + "MB";
  return (bytes / 1024).toFixed(1) + "KB";
}

async function main() {
  await mkdir(CACHE_DIR, { recursive: true });

  let totalBefore = 0;
  let totalAfter = 0;
  let count = 0;
  let cacheHits = 0;
  let sharpRuns = 0;

  for await (const file of walk(TARGET_DIR)) {
    const r = await optimizeOne(file);
    if (!r) continue;
    totalBefore += r.before;
    totalAfter += r.after;
    if (r.cached) cacheHits++;
    else sharpRuns++;
    if (!r.skipped) {
      count++;
      const saved = (((r.before - r.after) / r.before) * 100).toFixed(0);
      const tag = r.cached ? "cache" : "sharp";
      console.log(`  [${tag}] ${file}  ${fmt(r.before)} → ${fmt(r.after)}  (-${saved}%)`);
    }
  }

  console.log("");
  console.log(`최적화 완료: ${count}개 적용 (cache hit ${cacheHits} / sharp ${sharpRuns})`);
  console.log(`총 ${fmt(totalBefore)} → ${fmt(totalAfter)} (감소량 ${fmt(totalBefore - totalAfter)})`);
  console.log(`캐시 경로: ${CACHE_DIR}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
