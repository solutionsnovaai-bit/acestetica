import { useLayoutEffect, useRef } from 'react'
import { animate } from 'motion/react'
import { CONSULTA_MOBILE } from '../../config/imagens'
import { ALVOS, ESPESSURA, MONO, NOME, PAPEL, SUB } from './tracos'
import type { Caixa } from './tracos'

export type ModoAbertura = 'completa' | 'rapida' | 'nenhuma'

export function modoAbertura(): ModoAbertura {
  const m = document.documentElement.dataset.abertura
  return m === 'rapida' || m === 'nenhuma' ? m : 'completa'
}

type Props = {
  /** A luz começou a abrir: o topo do site entra. */
  onSaida: () => void
  /** O logotipo pousou na parede: a abertura sai de cena. */
  onFim: () => void
}

type Ret = { x: number; y: number; w: number; h: number }
type Grupo = 'mono' | 'nome' | 'sub'
const GRUPOS: readonly Grupo[] = ['mono', 'nome', 'sub']

const espera = (s: number) => new Promise<void>(r => window.setTimeout(r, s * 1000))
const E = [0.22, 1, 0.36, 1] as const
const CANETA = [0.45, 0, 0.15, 1] as const

/* Caixa que envolve o logotipo inteiro no papel (do topo do monograma à base da assinatura). */
const U = {
  x: PAPEL.nome[0],
  y: PAPEL.mono[1],
  w: PAPEL.nome[2],
  h: PAPEL.sub[1] + PAPEL.sub[3] - PAPEL.mono[1],
}

/* Tempo de cada traço do monograma (início e duração, em segundos): o rosto, depois o A, depois o C. */
const RITMO: Record<string, readonly [number, number]> = {
  contorno: [.15, 1.55],
  pernaE: [1.0, .62],
  pernaD: [1.22, .42],
  barra: [1.5, .3],
  c: [1.55, .68],
  labio: [2.12, .18],
}

/*
  Abertura (1ª visita ~4,5 s; ao voltar ~1,5 s).
  1. No azul-marinho da assinatura, um traço de ouro desenha o logotipo: o rosto, o A, o C, e depois o letreiro, letra por letra.
  2. O contador acompanha o carregamento de verdade (fontes e a arte do topo).
  3. A luz abre a partir do monograma e revela a parede; o desenho voa e pousa exatamente em cima do letreiro de metal.
  Tudo o que se move é transform, opacity ou máscara: nada de layout durante a animação.
*/
export default function Abertura({ onSaida, onFim }: Props) {
  const raiz = useRef<HTMLDivElement>(null)
  const noite = useRef<HTMLDivElement>(null)
  const contador = useRef<HTMLDivElement>(null)
  const numero = useRef<HTMLSpanElement>(null)
  const fio = useRef<HTMLSpanElement>(null)
  const refs = { mono: useRef<HTMLDivElement>(null), nome: useRef<HTMLDivElement>(null), sub: useRef<HTMLDivElement>(null) }

  useLayoutEffect(() => {
    const modo = modoAbertura()
    if (modo === 'nenhuma') { onSaida(); onFim(); return }
    const completa = modo === 'completa'
    try { sessionStorage.setItem('ac-abertura', '1') } catch { /* navegação privada */ }

    let cancelado = false
    let voando = false
    const els = { mono: refs.mono.current!, nome: refs.nome.current!, sub: refs.sub.current! }
    const arte = () => document.querySelector<HTMLElement>('[data-arte]')

    /*
      Cada grupo tem o tamanho final (o do letreiro na parede) e começa reduzido no centro da tela.
      inicio: onde fica no palco. destino: onde está na arte do topo.
    */
    const medir = () => {
      const vw = window.innerWidth, vh = window.innerHeight
      const s = Math.min((vw * .8) / U.w, (vh * .5) / U.h, 600 / U.w)
      const ox = (vw - U.w * s) / 2, oy = (vh - U.h * s) / 2 - vh * .035
      const A = ALVOS[window.matchMedia(CONSULTA_MOBILE).matches ? 'mobile' : 'desktop']
      const R = arte()?.getBoundingClientRect()
      const inicio = {} as Record<Grupo, Ret>, destino = {} as Record<Grupo, Ret>
      GRUPOS.forEach(g => {
        const p: Caixa = PAPEL[g], a: Caixa = A[g]
        inicio[g] = { x: ox + (p[0] - U.x) * s, y: oy + (p[1] - U.y) * s, w: p[2] * s, h: p[3] * s }
        destino[g] = R && R.width > 0
          ? { x: R.left + (a[0] / A.w) * R.width, y: R.top + (a[1] / A.h) * R.height, w: (a[2] / A.w) * R.width, h: (a[3] / A.h) * R.height }
          : inicio[g]
        const el = els[g]
        el.style.width = `${destino[g].w}px`
        el.style.height = `${destino[g].h}px`
        if (!voando) el.style.transform = transformacao(inicio[g], destino[g])
      })
      /* traço fino das letras: sempre ~1,2 px na tela, seja qual for a escala */
      els.nome.style.setProperty('--traco', (1.2 / s).toFixed(2))
      return { inicio, destino, temArte: Boolean(R && R.width > 0) }
    }
    const transformacao = (de: Ret, para: Ret) => `translate3d(${de.x.toFixed(2)}px, ${de.y.toFixed(2)}px, 0) scale(${(de.w / para.w).toFixed(5)}, ${(de.h / para.h).toFixed(5)})`

    let medida = medir()
    const aoRedimensionar = () => { if (!voando) medida = medir() }
    window.addEventListener('resize', aoRedimensionar)

    /* Carregamento real: as fontes e a arte do topo. */
    const img = arte()?.querySelector('img') ?? null
    const tarefas = [
      document.fonts?.ready ?? Promise.resolve(),
      img ? (img.complete && img.naturalWidth ? Promise.resolve() : new Promise<void>(r => { img.addEventListener('load', () => r(), { once: true }); img.addEventListener('error', () => r(), { once: true }) })) : Promise.resolve(),
    ]
    let feitas = 0
    const carregado = Promise.race([Promise.all(tarefas.map(t => Promise.resolve(t).then(() => { feitas++ }))), espera(7)])

    /* Contador: anda com o tempo do desenho, mas só chega a 100 quando tudo carregou. */
    const DESENHO = 2.9
    let raf = 0, exibido = 0, pronto = false
    const inicioRelogio = performance.now()
    const cemPorCento = new Promise<void>(resolve => {
      const quadro = (agora: number) => {
        if (cancelado) return
        const tempo = Math.min(1, (agora - inicioRelogio) / 1000 / DESENHO)
        const carga = pronto ? 1 : .55 + .35 * (feitas / tarefas.length)
        const alvo = Math.min(tempo, carga) * 100
        exibido += (alvo - exibido) * .14
        if (alvo >= 100 && exibido > 99.4) exibido = 100
        if (numero.current) numero.current.textContent = String(Math.round(exibido)).padStart(2, '0')
        if (fio.current) fio.current.style.transform = `scaleX(${(exibido / 100).toFixed(4)})`
        if (exibido >= 100) { resolve(); return }
        raf = requestAnimationFrame(quadro)
      }
      raf = requestAnimationFrame(quadro)
    })
    void carregado.then(() => { pronto = true })

    const roda = async () => {
      const tracos = Array.from(els.mono.querySelectorAll<SVGPathElement>('path'))
      const letras = Array.from(els.nome.querySelectorAll<SVGPathElement>('path'))
      const assinatura = Array.from(els.sub.querySelectorAll<SVGPathElement>('path'))

      if (completa) {
        animate(contador.current!, { opacity: [0, 1] }, { duration: .6, delay: .1 })
        /* 1. O monograma, como um traço de caneta. */
        tracos.forEach(p => {
          const [quando, dura] = RITMO[p.dataset.id ?? ''] ?? [0, 1]
          animate(p, { strokeDashoffset: [1, 0], opacity: [0, 1] }, {
            strokeDashoffset: { duration: dura, delay: quando, ease: CANETA },
            opacity: { duration: .12, delay: quando },
          })
        })
        /* O letreiro: o contorno de cada letra se desenha e o ouro preenche. */
        letras.forEach((p, i) => {
          const d = 1.6 + i * .075
          animate(p, { strokeDashoffset: [1, 0], opacity: [0, 1] }, {
            strokeDashoffset: { duration: .8, delay: d, ease: CANETA },
            opacity: { duration: .12, delay: d },
          })
          animate(p, { fillOpacity: [0, 1] }, { duration: .55, delay: d + .45, ease: 'easeOut' })
        })
        /* A assinatura sobe, letra por letra. */
        assinatura.forEach((p, i) => {
          animate(p, { opacity: [0, 1], y: [10, 0] }, { duration: .6, delay: 2.4 + i * .028, ease: E })
        })
        await cemPorCento
        if (cancelado) return
        await espera(.28)
      } else {
        tracos.forEach(p => { p.style.strokeDashoffset = '0'; p.style.opacity = '1' })
        letras.forEach(p => { p.style.strokeDashoffset = '0'; p.style.opacity = '1'; p.style.fillOpacity = '1' })
        assinatura.forEach(p => { p.style.opacity = '1' })
        GRUPOS.forEach(g => animate(els[g], { opacity: [0, 1] }, { duration: .45, ease: 'easeOut' }))
        await Promise.all([espera(.5), carregado])
      }
      if (cancelado) return

      /* 3. A luz abre a partir do monograma; o desenho voa e pousa no letreiro da parede. */
      medida = medir()
      voando = true
      const { inicio, destino, temArte } = medida
      const centro = { x: inicio.mono.x + inicio.mono.w / 2, y: inicio.mono.y + inicio.mono.h / 2 }
      animate(contador.current!, { opacity: 0 }, { duration: .3 })
      raiz.current?.classList.remove('is-bloqueando')
      onSaida()
      const n = noite.current!
      n.style.setProperty('--cx', `${centro.x}px`)
      n.style.setProperty('--cy', `${centro.y}px`)
      n.classList.add('is-abrindo')
      const dur = completa ? 1.25 : 1
      const luz = animate(n, { '--raio': ['-12vmax', '170vmax'] } as never, { duration: dur + .15, ease: [0.6, 0, 0.25, 1] })
      if (!temArte) {
        await animate(raiz.current!, { opacity: 0 }, { duration: .5 }).finished
        if (!cancelado) onFim()
        return
      }
      const voos = GRUPOS.map(g => animate(els[g],
        { transform: [transformacao(inicio[g], destino[g]), `translate3d(${destino[g].x.toFixed(2)}px, ${destino[g].y.toFixed(2)}px, 0) scale(1, 1)`] },
        { duration: dur, ease: [0.7, 0, 0.2, 1] }))
      /* perto do pouso, o desenho se dissolve no metal */
      GRUPOS.forEach(g => animate(els[g], { opacity: 0 }, { duration: .5, delay: dur - .42, ease: 'easeIn' }))
      await Promise.all([...voos.map(v => v.finished), luz.finished])
      await espera(.1)
      if (!cancelado) onFim()
    }

    roda().catch(() => { if (!cancelado) { onSaida(); onFim() } })
    return () => { cancelado = true; cancelAnimationFrame(raf); window.removeEventListener('resize', aoRedimensionar) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const tracado = { pathLength: 1, strokeDasharray: '1 1', strokeDashoffset: 1, opacity: 0 }
  return <div ref={raiz} className="abertura is-bloqueando" aria-hidden="true">
    <div ref={noite} className="ab-noite" />
    <div ref={refs.mono} className="ab-grupo">
      <svg viewBox={`0 0 ${PAPEL.mono[2]} ${PAPEL.mono[3]}`} preserveAspectRatio="none" className="ab-mono" strokeWidth={ESPESSURA}>
        {MONO.map(t => <path key={t.id} data-id={t.id} d={t.d} {...tracado} />)}
      </svg>
    </div>
    <div ref={refs.nome} className="ab-grupo">
      <svg viewBox={`0 0 ${PAPEL.nome[2]} ${PAPEL.nome[3]}`} preserveAspectRatio="none" className="ab-nome">
        {NOME.map((d, i) => <path key={i} d={d} fillRule="evenodd" fillOpacity={0} {...tracado} />)}
      </svg>
    </div>
    <div ref={refs.sub} className="ab-grupo">
      <svg viewBox={`0 0 ${PAPEL.sub[2]} ${PAPEL.sub[3]}`} preserveAspectRatio="none" className="ab-sub">
        {SUB.map((d, i) => <path key={i} d={d} fillRule="evenodd" opacity={0} />)}
      </svg>
    </div>
    <div ref={contador} className="ab-contador">
      <span ref={numero} className="ab-numero num">00</span>
      <span className="ab-trilho"><span ref={fio} className="ab-fio" /></span>
    </div>
  </div>
}
