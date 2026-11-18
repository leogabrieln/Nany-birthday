import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
import { ArrowDown, ArrowUpRight, CalendarDays, Clock, MapPin } from 'lucide-react'
import Page from '../components/Page'
import Ransom from '../components/Ransom'
import Reveal from '../components/Reveal'
import Countdown from '../components/Countdown'
import { chapters, event, img, nanyPics } from '../data'

/* ───────────── 1. Capa ───────────── */
// Adesivo com parallax (wrapper) + flutuação CSS (imagem) para não haver conflito de transform
function Par({ cls, src, y, anim, r }) {
  return (
    <motion.div className={`par ${cls}`} style={{ y }}>
      <img src={src} alt="" className={`sticker-in ${anim}`} style={{ '--r': r }} />
    </motion.div>
  )
}

function Hero() {
  const { scrollY } = useScroll()
  const ballY = useTransform(scrollY, [0, 700], [0, 140])
  const ballRot = useTransform(scrollY, [0, 1200], [0, 200])
  const up = useTransform(scrollY, [0, 700], [0, -90])
  const down = useTransform(scrollY, [0, 700], [0, 110])
  const fade = useTransform(scrollY, [0, 420], [1, 0])

  return (
    <section className="hero">
      <div className="stars-bg" />
      <div className="hero-glow" />

      <motion.div className="hero-ball" style={{ y: ballY, rotate: ballRot }}>
        <img src={img('convite/disco.png')} alt="" className="spin-slow" />
      </motion.div>

      <Par cls="hero-butterfly" src={img('convite/butterfly.png')} y={up} anim="float-a" r="-12deg" />
      <Par cls="hero-camera" src={img('convite/camera.png')} y={down} anim="float-b" r="10deg" />
      <Par cls="hero-bolt" src={img('convite/bolt.png')} y={down} anim="float-a" r="6deg" />
      <img src={img('convite/star1.png')} alt="" className="sticker hero-star s1 twinkle" />
      <img src={img('convite/star3.png')} alt="" className="sticker hero-star s2 twinkle" />
      <img src={img('convite/star4.png')} alt="" className="sticker hero-star s3 twinkle" />
      <Par cls="hero-hat" src={img('convite/hat.png')} y={up} anim="float-b" r="-14deg" />

      <motion.img src={nanyPics[2]} alt="Nany de óculos escuros e maiô da Marie" className="hero-nany left" style={{ y: up }}
        initial={{ x: -160, opacity: 0, rotate: -12 }} animate={{ x: 0, opacity: 1, rotate: -6 }} transition={{ delay: 0.5, type: 'spring', stiffness: 70, damping: 12 }} />
      <motion.img src={nanyPics[4]} alt="Nany com a peruca verde e amarela" className="hero-nany right" style={{ y: down }}
        initial={{ x: 160, opacity: 0, rotate: 12 }} animate={{ x: 0, opacity: 1, rotate: 5 }} transition={{ delay: 0.7, type: 'spring', stiffness: 70, damping: 12 }} />

      <div className="hero-copy">
        <motion.p className="hero-kicker" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          bora celebrar ✦ 20 de novembro
        </motion.p>
        <Ransom as="h1" text="Happy Birthday" className="hero-title" delay={0.3} />
        <Ransom text="Nany!" className="hero-title hero-name" delay={0.9} />
        <motion.p className="hero-hand" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
          venha celebrar o meu aniversário!
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.7 }}>
          <Link to="/convite" className="primary-button">Entrar na festa <ArrowUpRight size={17} /></Link>
        </motion.div>
      </div>

      <motion.div className="scroll-hint" style={{ opacity: fade }}>
        <span>role para ver</span><ArrowDown size={18} />
      </motion.div>
    </section>
  )
}

/* ───────────── 2. Faixas em movimento ───────────── */
function Ribbons() {
  const words = ['FELIZ ANIVERSÁRIO NANY', '20 DE NOVEMBRO', 'ÀS 13:00', 'LEVAR KIT CHURRASCO', 'VAI TER FESTA']
  const row = (n) => [...Array(2)].map((_, k) => (
    <div className="ribbon-set" key={k} aria-hidden={k === 1 || undefined}>
      {words.map((w, i) => <span key={i + n}>{w}<em>✦</em></span>)}
    </div>
  ))
  return (
    <div className="ribbons" aria-label="Feliz aniversário Nany, 20 de novembro, às 13:00">
      <div className="ribbon r-chrome"><div className="ribbon-track">{row('a')}</div></div>
      <div className="ribbon r-pink"><div className="ribbon-track reverse">{row('b')}</div></div>
    </div>
  )
}

/* ───────────── 3. Rolagem grande: capítulos da Nany ───────────── */
const bgStops = ['#0f1d38', '#162a52', '#0f1d38', '#1b2f5c', '#0f1d38', '#162a52', '#1b2f5c', '#0f1d38']

function Chapter({ c, i, n, progress }) {
  const s = i / n
  const e = (i + 1) / n
  const m = (s + e) / 2
  const side = i % 2 ? -1 : 1
  const opacity = useTransform(progress,
    i === 0 ? [0, e - 0.025, e] : i === n - 1 ? [s, s + 0.025, 1] : [s, s + 0.025, e - 0.025, e],
    i === 0 ? [1, 1, 0] : i === n - 1 ? [0, 1, 1] : [0, 1, 1, 0])
  const x = useTransform(progress, [s, m, e], [side * 340, 0, side * -340])
  const y = useTransform(progress, [s, m, e], [90, 0, -90])
  const scale = useTransform(progress, [s, m, e], [0.55, 1, 1.18])
  const rotate = useTransform(progress, [s, m, e], [side * -22, side * 4, side * 20])
  const tx = useTransform(progress, [s, m, e], [side * -160, 0, side * 160])

  return (
    <motion.div className="chapter" style={{ opacity }}>
      <motion.img src={img(c.img)} alt={c.title} className="chapter-img" style={{ x, y, scale, rotate }} />
      <motion.div className="chapter-text" style={{ x: tx }}>
        <span className="chapter-num">capítulo {String(i + 1).padStart(2, '0')}</span>
        <h3>{c.title}</h3>
        <p>{c.text}</p>
      </motion.div>
    </motion.div>
  )
}

function Stage() {
  const ref = useRef(null)
  const n = chapters.length
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const bg = useTransform(scrollYProgress, bgStops.map((_, i) => i / (bgStops.length - 1)), bgStops)
  const ballRot = useTransform(scrollYProgress, [0, 1], [0, 900])
  const ballScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.25, 0.9])
  const orbit = useTransform(scrollYProgress, [0, 1], [0, 1080])
  const [idx, setIdx] = useState(0)
  useMotionValueEvent(scrollYProgress, 'change', (v) => setIdx(Math.min(n - 1, Math.max(0, Math.floor(v * n)))))

  return (
    <section className="stage" ref={ref} style={{ height: `${n * 85 + 40}vh` }}>
      <motion.div className="stage-sticky" style={{ backgroundColor: bg }}>
        <div className="stars-bg" />
        <motion.img src={img('convite/disco.png')} alt="" className="stage-ball" style={{ rotate: ballRot, scale: ballScale }} />
        <motion.div className="orbit" style={{ rotate: orbit }}>
          <img src={img('convite/star1.png')} alt="" className="o1" />
          <img src={img('convite/star3.png')} alt="" className="o2" />
          <img src={img('convite/star4.png')} alt="" className="o3" />
          <img src={img('convite/bolt.png')} alt="" className="o4" />
        </motion.div>
        <div className="stage-head"><span className="eyebrow">a história de uma estrela</span><b>{String(idx + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}</b></div>
        {chapters.map((c, i) => <Chapter key={c.img} c={c} i={i} n={n} progress={scrollYProgress} />)}
        <motion.div className="stage-bar" style={{ scaleX: scrollYProgress }} />
      </motion.div>
    </section>
  )
}

/* ───────────── 4. Galeria de polaroids com parallax ───────────── */
const polaroids = [
  { p: 0, cap: 'pose de estrela', bg: '#ffb3d6', r: -4 },
  { p: 1, cap: 'sempre sorrindo', bg: '#ffd43b', r: 3 },
  { p: 2, cap: 'olha a peruca!', bg: '#7db5ff', r: -3 },
  { p: 3, cap: 'hora do milho', bg: '#b4e5ae', r: 4 },
  { p: 4, cap: 'cientista maluca', bg: '#ffb77a', r: -2 },
  { p: 5, cap: 'vai, Brasil!', bg: '#cfd8e8', r: 3 },
  { p: 6, cap: 'cara de travessa', bg: '#c9b6ff', r: -4 },
  { p: 7, cap: 'fofura de inverno', bg: '#ffb3d6', r: 2 },
]
const order = [4, 2, 6, 0, 5, 3, 7, 1]

function Polaroid({ item }) {
  return (
    <figure className="polaroid" style={{ '--r': `${item.r}deg` }}>
      <div className="polaroid-photo" style={{ background: item.bg }}>
        <img src={nanyPics[order[item.p]]} alt="Nany" loading="lazy" />
      </div>
      <figcaption>{item.cap}</figcaption>
    </figure>
  )
}

function Gallery() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const c1 = useTransform(scrollYProgress, [0, 1], [90, -170])
  const c2 = useTransform(scrollYProgress, [0, 1], [-40, 80])
  const c3 = useTransform(scrollYProgress, [0, 1], [150, -230])
  const cols = [polaroids.slice(0, 3), polaroids.slice(3, 6), polaroids.slice(6, 8)]
  return (
    <section className="gallery" ref={ref}>
      <Reveal className="gallery-head">
        <span className="eyebrow">álbum de família</span>
        <Ransom text="Quanta estrela!" delay={0.1} className="small" />
      </Reveal>
      <div className="gallery-cols">
        {[c1, c2, c3].map((y, ci) => (
          <motion.div className={`gcol gcol-${ci}`} style={{ y }} key={ci}>
            {cols[ci].map(item => <Polaroid item={item} key={item.p} />)}
          </motion.div>
        ))}
      </div>
    </section>
  )
}

/* ───────────── 5. Detalhes ───────────── */
function BigDay() {
  const rows = [
    { Icon: CalendarDays, k: 'Quando', v: `${event.weekday}, ${event.dateLabel}` },
    { Icon: Clock, k: 'Horário', v: event.time },
    { Icon: MapPin, k: 'Onde', v: event.address },
  ]
  return (
    <section className="bigday">
      <img src={img('convite/camera.png')} alt="" className="sticker bd-camera float-b" style={{ '--r': '-8deg' }} />
      <img src={img('convite/butterfly.png')} alt="" className="sticker bd-butterfly float-a" style={{ '--r': '10deg' }} />
      <Reveal className="bigday-head"><span className="eyebrow">a contagem já começou</span></Reveal>
      <Ransom text="Vem pra festa" delay={0.1} className="small" />
      <Reveal delay={0.1}><Countdown /></Reveal>
      <div className="bigday-rows">
        {rows.map(({ Icon, k, v }, i) => (
          <Reveal key={k} delay={i * 0.12} dir="zoom" className="bd-chip">
            <Icon size={22} /><div><b>{k}</b><span>{v}</span></div>
          </Reveal>
        ))}
      </div>
      <Reveal className="bd-note"><span>{event.note}</span></Reveal>
    </section>
  )
}

/* ───────────── 7. Despedida ───────────── */
function Outro() {
  return (
    <section className="outro">
      <div className="stars-bg" />
      <motion.img src={img('convite/puppy.png')} alt="" className="outro-puppy" style={{ x: '-50%' }} initial={{ y: 140, rotate: 8 }} whileInView={{ y: 0, rotate: -3 }} viewport={{ once: true }} transition={{ type: 'spring', stiffness: 60, damping: 11 }} />
      <Reveal className="outro-copy">
        <p className="hero-hand">te espero lá!</p>
        <Ransom text="Não falte" className="small" />
        <Link to="/convite" className="primary-button">Confirmar presença <ArrowUpRight size={17} /></Link>
      </Reveal>
    </section>
  )
}

export default function Home() {
  return (
    <Page className="home-page">
      <Hero />
      <Ribbons />
      <Stage />
      <Gallery />
      <BigDay />
      <Outro />
    </Page>
  )
}
