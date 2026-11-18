import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, ArrowUpRight, MapPin } from 'lucide-react'
import Page from '../components/Page'
import Ransom from '../components/Ransom'
import Reveal from '../components/Reveal'
import Countdown from '../components/Countdown'
import useGuestName from '../hooks/useGuestName'
import { event, img, nanyPics } from '../data'
import { saveRsvp } from '../lib/partyService'
import { isCloudEnabled } from '../lib/supabase'

const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.address)}`

export default function Invitation() {
  const [name, setName] = useGuestName()
  const [confirmed, setConfirmed] = useState(false)
  const [saving, setSaving] = useState(false)
  const [notice, setNotice] = useState('')
  const [error, setError] = useState(false)

  const confirm = async (e) => {
    e.preventDefault()
    if (!name.trim() || saving) return
    setSaving(true); setNotice(''); setError(false)
    try { await saveRsvp(name.trim()); setConfirmed(true); setNotice('Presença confirmada! Até a festa ♡') }
    catch (err) { setError(true); setNotice(err.message || 'Não foi possível confirmar. Tente novamente.') }
    finally { setSaving(false) }
  }

  return (
    <Page className="theme-convite">
      {/* ── Réplica do convite em papel prateado ── */}
      <section className="paper-wrap">
        <div className="paper">
          <motion.img src={img('convite/disco.png')} alt="" className="p-ball" initial={{ y: -120, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: 'spring', stiffness: 50, damping: 9 }} />
          <img src={img('convite/butterfly.png')} alt="" className="sticker p-butterfly float-a" style={{ '--r': '-8deg' }} />
          <img src={img('convite/bolt.png')} alt="" className="sticker p-bolt float-b" style={{ '--r': '8deg' }} />
          <img src={img('convite/camera.png')} alt="" className="sticker p-camera float-a" style={{ '--r': '4deg' }} />
          <img src={img('convite/star1.png')} alt="" className="sticker p-star a twinkle" />
          <img src={img('convite/star3.png')} alt="" className="sticker p-star b twinkle" />
          <img src={img('convite/star4.png')} alt="" className="sticker p-star c twinkle" />

          <div className="p-title">
            <Ransom as="h1" text="Feliz Aniversário" delay={0.4} />
            <Ransom text="nany" className="p-name" delay={1.1} />
          </div>

          <div className="p-info">
            <p className="hand">venha celebrar meu aniversário!</p>
            <p className="hand when">{event.dateLabel}, {event.time}<br />{event.address}</p>
            <span className="hl">{event.note}</span>
          </div>

          <img src={img('convite/hat.png')} alt="" className="sticker p-hat float-b" style={{ '--r': '-6deg' }} />
          <motion.img src={nanyPics[2]} alt="Nany de óculos escuros" className="p-nany" initial={{ x: -80, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }} transition={{ type: 'spring', stiffness: 60, damping: 12 }} />
          <motion.img src={img('convite/puppy.png')} alt="" className="p-puppy" initial={{ y: 120, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ type: 'spring', stiffness: 60, damping: 12, delay: 0.2 }} />
        </div>
      </section>

      {/* ── Contagem + detalhes + confirmação ── */}
      <section className="rsvp-section">
        <Reveal className="rsvp-head">
          <span className="eyebrow">falta pouco</span>
          <h2>Contagem para o <i>grande dia</i></h2>
        </Reveal>
        <Reveal delay={0.1}><Countdown /></Reveal>

        <div className="rsvp-grid">
          <Reveal dir="right" className="rsvp-card details">
            <h3>Anota aí</h3>
            <ul>
              <li><b>Quando</b><span>{event.weekday}, {event.dateLabel}</span></li>
              <li><b>Horário</b><span>{event.time}</span></li>
              <li><b>Onde</b><span>{event.address}</span></li>
              <li><b>Não esqueça</b><span>{event.note}</span></li>
            </ul>
            <div className="btn-row">
              <a className="secondary-button" href={mapsUrl} target="_blank" rel="noreferrer"><MapPin size={16} /> Como chegar</a>
            </div>
          </Reveal>

          <Reveal dir="left" className="rsvp-card">
            <h3>Você vem?</h3>
            <form className="rsvp-form" onSubmit={confirm}>
              <label htmlFor="guest-name" className="eyebrow">Seu nome ou apelido</label>
              <input id="guest-name" value={name} onChange={e => setName(e.target.value)} placeholder="Como podemos te chamar?" maxLength={60} required />
              <button className="primary-button" type="submit" disabled={saving}>
                {saving ? 'Enviando...' : confirmed ? <><Check size={16} /> Confirmado</> : <>Confirmar presença <ArrowUpRight size={16} /></>}
              </button>
              {notice && <p className={error ? 'error-note' : 'success-note'} role="status">{notice}</p>}
            </form>
          </Reveal>
        </div>
        </section>
    </Page>
  )
}
