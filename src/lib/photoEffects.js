import { img } from '../data'

/* ═══════════════════════════════════════════════════════════
   Efeitos da cabine de fotos.
   Cada efeito é descrito por dados e desenhado de duas formas
   (prévia ao vivo em CSS + foto final em canvas) com o mesmo
   resultado, sem depender de ctx.filter (que o Safari não tem).
   ═══════════════════════════════════════════════════════════ */

export const ASSETS = {
  star1: 'convite/star1.png', star3: 'convite/star3.png', star4: 'convite/star4.png',
  hat: 'convite/hat.png', disco: 'convite/disco.png', butterfly: 'convite/butterfly.png',
  camera: 'convite/camera.png', bolt: 'convite/bolt.png', puppy: 'convite/puppy.png',
}

const STARS = [
  { src: 'star1', x: 0.05, y: 0.07, w: 0.11, r: -10 },
  { src: 'star3', x: 0.83, y: 0.13, w: 0.09, r: 12 },
  { src: 'star4', x: 0.08, y: 0.78, w: 0.09, r: 8 },
  { src: 'star1', x: 0.84, y: 0.75, w: 0.11, r: -6 },
]
const HAT = { src: 'hat', x: 0.5, y: -0.09, w: 0.24, r: 12 }

// confete com posições fixas (mesmo desenho na prévia e na foto)
function confetti(n, seed) {
  const colors = ['#ff4fa3', '#ffd43b', '#5fd36b', '#7db5ff', '#ff8a1f', '#ffffff', '#c9b6ff']
  let s = seed
  const rnd = () => (s = (s * 16807) % 2147483647) / 2147483647
  return Array.from({ length: n }, () => ({
    type: 'rect', x: rnd() * 0.96, y: rnd() * 0.96, w: 0.025 + rnd() * 0.02, ar: 0.5 + rnd() * 0.8,
    r: Math.round(rnd() * 360), color: colors[Math.floor(rnd() * colors.length)],
  }))
}

export const LEAK_STOPS = [
  [0, 'rgba(255,60,140,0)'], [0.22, 'rgba(255,60,140,.75)'], [0.42, 'rgba(255,214,0,.65)'],
  [0.6, 'rgba(60,255,170,.55)'], [0.8, 'rgba(40,140,255,.75)'], [1, 'rgba(120,60,255,0)'],
]

export const EFFECTS = [
  { id: 'natural', label: 'Natural', emoji: '📷', swatch: '#cfd8e8' },
  { id: 'pb', label: 'Preto e branco', emoji: '🖤', swatch: '#555', filter: { gray: 1, contrast: 1.2 }, vignette: 0.3 },
  { id: 'sepia', label: 'Sépia', emoji: '🟤', swatch: '#a67c52', filter: { sepia: 1, contrast: 1.05, brightness: 1.05 }, vignette: 0.45 },
  { id: 'vintage', label: 'Vintage', emoji: '📼', swatch: '#e4a95c', filter: { sepia: 0.3, saturate: 1.4, contrast: 0.92, brightness: 1.1 }, tint: { color: '#ffb347', alpha: 0.2, mode: 'soft-light' }, vignette: 0.55 },
  { id: 'prata', label: 'Prata', emoji: '🪩', swatch: '#c3cde0', filter: { gray: 1, contrast: 1.3, brightness: 1.12 }, tint: { color: '#7db5ff', alpha: 0.3, mode: 'overlay' }, vignette: 0.35, items: STARS },
  { id: 'noite', label: 'Noite azul', emoji: '🌙', swatch: '#2457e6', filter: { saturate: 1.3, contrast: 1.12, brightness: 0.95 }, tint: { color: '#1237c8', alpha: 0.5, mode: 'soft-light' }, vignette: 0.5, items: [STARS[0], STARS[1], STARS[3]] },
  { id: 'disco', label: 'Globo disco', emoji: '✨', swatch: 'conic-gradient(#ff4fa3,#ffd43b,#5fd36b,#7db5ff,#ff4fa3)', filter: { saturate: 1.5, contrast: 1.1 }, leak: true, vignette: 0.3, items: [{ src: 'disco', x: 0.6, y: -0.14, w: 0.44, r: 0 }, STARS[2], STARS[3]] },
  { id: 'festa', label: 'Chapéu de festa', emoji: '🥳', swatch: '#ff4fa3', filter: { saturate: 1.2 }, items: [...confetti(30, 7), HAT] },
  { id: 'colagem', label: 'Colagem do convite', emoji: '🦋', swatch: '#e9eef7', filter: { gray: 1, contrast: 1.15 }, items: [
    { src: 'butterfly', x: 0.03, y: 0.03, w: 0.2, r: -12 }, { src: 'bolt', x: 0.8, y: 0.04, w: 0.14, r: 10 },
    { src: 'camera', x: 0.72, y: 0.7, w: 0.24, r: 6 }, { src: 'star1', x: 0.06, y: 0.8, w: 0.12, r: 0 }, HAT] },
  { id: 'confete', label: 'Confete', emoji: '🎉', swatch: '#ffd43b', filter: { saturate: 1.25, brightness: 1.05 }, items: confetti(60, 21) },
  { id: 'rosa', label: 'Rosa chiclete', emoji: '💗', swatch: '#ff4fa3', filter: { saturate: 1.4, brightness: 1.08 }, tint: { color: '#ff4fa3', alpha: 0.32, mode: 'soft-light' }, items: STARS },
]

/* ── filtros de cor: string CSS (prévia) e pixel a pixel (foto final) ── */
export function cssFilter(f = {}) {
  const parts = []
  if (f.sepia) parts.push(`sepia(${f.sepia})`)
  if (f.gray) parts.push(`grayscale(${f.gray})`)
  if (f.saturate) parts.push(`saturate(${f.saturate})`)
  if (f.contrast) parts.push(`contrast(${f.contrast})`)
  if (f.brightness) parts.push(`brightness(${f.brightness})`)
  return parts.join(' ') || 'none'
}

const mul = (A, B) => A.map((_, i) => [0, 1, 2].map(j => A[i][0] * B[0][j] + A[i][1] * B[1][j] + A[i][2] * B[2][j]))

function colorMatrix(f) {
  let M = [[1, 0, 0], [0, 1, 0], [0, 0, 1]]
  if (f.sepia) { const a = 1 - f.sepia; M = mul([[0.393 + 0.607 * a, 0.769 - 0.769 * a, 0.189 - 0.189 * a], [0.349 - 0.349 * a, 0.686 + 0.314 * a, 0.168 - 0.168 * a], [0.272 - 0.272 * a, 0.534 - 0.534 * a, 0.131 + 0.869 * a]], M) }
  if (f.gray) { const a = 1 - f.gray; M = mul([[0.2126 + 0.7874 * a, 0.7152 - 0.7152 * a, 0.0722 - 0.0722 * a], [0.2126 - 0.2126 * a, 0.7152 + 0.2848 * a, 0.0722 - 0.0722 * a], [0.2126 - 0.2126 * a, 0.7152 - 0.7152 * a, 0.0722 + 0.9278 * a]], M) }
  if (f.saturate) { const s = f.saturate; M = mul([[0.213 + 0.787 * s, 0.715 - 0.715 * s, 0.072 - 0.072 * s], [0.213 - 0.213 * s, 0.715 + 0.285 * s, 0.072 - 0.072 * s], [0.213 - 0.213 * s, 0.715 - 0.715 * s, 0.072 + 0.928 * s]], M) }
  return M
}

function applyFilter(ctx, size, f) {
  if (!f || !Object.keys(f).length) return
  const data = ctx.getImageData(0, 0, size, size)
  const px = data.data
  const M = colorMatrix(f)
  const c = f.contrast ?? 1
  const b = f.brightness ?? 1
  const clamp = v => (v < 0 ? 0 : v > 255 ? 255 : v)
  for (let i = 0; i < px.length; i += 4) {
    const r = px[i], g = px[i + 1], bl = px[i + 2]
    let nr = M[0][0] * r + M[0][1] * g + M[0][2] * bl
    let ng = M[1][0] * r + M[1][1] * g + M[1][2] * bl
    let nb = M[2][0] * r + M[2][1] * g + M[2][2] * bl
    nr = clamp(nr); ng = clamp(ng); nb = clamp(nb)
    px[i] = clamp(((nr - 127.5) * c + 127.5) * b)
    px[i + 1] = clamp(((ng - 127.5) * c + 127.5) * b)
    px[i + 2] = clamp(((nb - 127.5) * c + 127.5) * b)
  }
  ctx.putImageData(data, 0, 0)
}

/* ── pré-carrega os adesivos ── */
export function loadAssets() {
  return Promise.all(Object.entries(ASSETS).map(([key, path]) => new Promise(resolve => {
    const im = new Image()
    im.onload = () => resolve([key, im])
    im.onerror = () => resolve([key, null])
    im.src = img(path)
  }))).then(entries => Object.fromEntries(entries))
}

/* ── desenha camadas do efeito (tint, brilho de disco, vinheta, adesivos) ── */
function drawLayers(ctx, size, effect, assets) {
  if (effect.leak) {
    const g = ctx.createLinearGradient(0, 0, size, size)
    LEAK_STOPS.forEach(([p, col]) => g.addColorStop(p, col))
    ctx.save(); ctx.globalCompositeOperation = 'screen'; ctx.globalAlpha = 0.6; ctx.fillStyle = g; ctx.fillRect(0, 0, size, size); ctx.restore()
  }
  if (effect.tint) {
    ctx.save(); ctx.globalCompositeOperation = effect.tint.mode; ctx.globalAlpha = effect.tint.alpha; ctx.fillStyle = effect.tint.color; ctx.fillRect(0, 0, size, size); ctx.restore()
  }
  if (effect.vignette) {
    const g = ctx.createRadialGradient(size / 2, size / 2, size * 0.7071 * 0.55, size / 2, size / 2, size * 0.7071)
    g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, `rgba(0,0,0,${effect.vignette})`)
    ctx.fillStyle = g; ctx.fillRect(0, 0, size, size)
  }
  for (const it of effect.items || []) {
    ctx.save()
    if (it.type === 'rect') {
      const w = it.w * size, h = w * it.ar
      ctx.translate(it.x * size + w / 2, it.y * size + h / 2); ctx.rotate(it.r * Math.PI / 180)
      ctx.fillStyle = it.color; ctx.fillRect(-w / 2, -h / 2, w, h)
    } else {
      const im = assets[it.src]
      if (im) {
        const w = it.w * size, h = w * (im.naturalHeight / im.naturalWidth)
        ctx.translate(it.x * size + w / 2, it.y * size + h / 2); ctx.rotate(it.r * Math.PI / 180)
        ctx.shadowColor = 'rgba(0,0,0,.35)'; ctx.shadowBlur = size * 0.012; ctx.shadowOffsetY = size * 0.006
        ctx.drawImage(im, -w / 2, -h / 2, w, h)
      }
    }
    ctx.restore()
  }
}

const sizeOf = (src) => (src instanceof HTMLVideoElement ? [src.videoWidth, src.videoHeight] : [src.naturalWidth, src.naturalHeight])

/* ── monta a polaroid final e devolve um Blob JPEG ── */
export async function renderPolaroid({ source, mirror, effect, name, assets }) {
  const PHOTO = 900, W = 1000, H = 1250, M = 50
  const photo = document.createElement('canvas')
  photo.width = photo.height = PHOTO
  const pctx = photo.getContext('2d', { willReadFrequently: true })

  const [sw, sh] = sizeOf(source)
  const side = Math.min(sw, sh)
  const sx = (sw - side) / 2, sy = (sh - side) / 2
  pctx.save()
  if (mirror) { pctx.translate(PHOTO, 0); pctx.scale(-1, 1) }
  pctx.drawImage(source, sx, sy, side, side, 0, 0, PHOTO, PHOTO)
  pctx.restore()
  applyFilter(pctx, PHOTO, effect.filter)
  drawLayers(pctx, PHOTO, effect, assets)

  try { await document.fonts.load('700 64px Caveat') } catch { /* usa fonte padrão */ }
  const out = document.createElement('canvas')
  out.width = W; out.height = H
  const ctx = out.getContext('2d')
  const paper = ctx.createLinearGradient(0, 0, W, H)
  paper.addColorStop(0, '#fdfcf8'); paper.addColorStop(1, '#f1efe6')
  ctx.fillStyle = paper; ctx.fillRect(0, 0, W, H)
  ctx.drawImage(photo, M, M)
  ctx.strokeStyle = 'rgba(0,0,0,.12)'; ctx.lineWidth = 3; ctx.strokeRect(M, M, PHOTO, PHOTO)
  ctx.textAlign = 'center'
  ctx.fillStyle = '#16275f'
  ctx.font = '700 70px Caveat, cursive'
  ctx.fillText((name || 'Convidado').slice(0, 24), W / 2, 1065, W - 160)
  ctx.fillStyle = '#5d6b95'
  ctx.font = '500 44px Caveat, cursive'
  ctx.fillText('aniversário da Nany · 20.11', W / 2, 1140, W - 160)
  if (assets.star1) ctx.drawImage(assets.star1, W - 150, H - 150, 80, 80)

  return new Promise((resolve, reject) => out.toBlob(b => (b ? resolve(b) : reject(new Error('Não foi possível gerar a foto.'))), 'image/jpeg', 0.88))
}
