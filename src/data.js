// ─────────────────────────────────────────────────────────────
//  Dados da festa — edite aqui para personalizar o site
// ─────────────────────────────────────────────────────────────
const base = import.meta.env.BASE_URL || '/'
export const img = (path) => `${base}img/${path}`

export const event = {
  name: 'Nany',
  dateLabel: '20 de novembro',
  weekday: 'sexta-feira',
  time: '13:00',
  address: 'Rua Pastor Ariano Ferreira, 345',
  note: 'Levar kit churrasco',
  dateISO: '2026-11-20T13:00:00',
  endISO: '2026-11-20T19:00:00',
}

// Cole aqui o link da playlist do Spotify (ex.: https://open.spotify.com/playlist/XXXXXXXX)
export const spotifyUrl = ''


// Recortes da Nany usados na rolagem da Home
export const chapters = [
  { img: 'nany/n3.png', title: 'Pose de estrela', text: 'Óculos escuros, mão na cintura e muita atitude.' },
  { img: 'nany/n4.png', title: 'Hora do milho', text: 'Prioridade absoluta: o milho. O resto espera.' },
  { img: 'nany/n5.png', title: 'Cabelo de festa', text: 'A peruca verde e amarela chegou pra brilhar.' },
  { img: 'nany/n7.png', title: 'Vai, Brasil!', text: 'Verde, amarelo e um sorriso do tamanho do mundo.' },
  { img: 'nany/n1.png', title: 'Cara de travessura', text: 'Quando a brincadeira começa, ninguém segura.' },
  { img: 'nany/n6.png', title: 'Cientista da festa', text: 'Óculos de proteção ligados: hoje é dia de experimento.' },
  { img: 'nany/n2.png', title: 'Fofura de inverno', text: 'Touquinha, casaco e aquele sorriso de sempre.' },
  { img: 'nany/n8.png', title: 'Mais uma pose', text: 'Porque uma pose só nunca é o bastante.' },
]

export const nanyPics = ['n1', 'n2', 'n3', 'n4', 'n5', 'n6', 'n7', 'n8'].map(n => img(`nany/${n}.png`))

