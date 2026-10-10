import { useLayoutEffect, useRef } from 'react'
import { animate } from 'motion/react'
import { CONSULTA_MOBILE } from '../../config/imagens'
import { ALVOS, ARCO, BEAUTY, CORACAO, FOLHAS, HASTE, LINHAS, MONO, NOME, PONTOS, QUADRO, RAMINHO, TRACO } from './marca'
import type { Matriz, Parte } from './marca'

export type ModoAbertura = 'completa' | 'rapida' | 'nenhuma'

export function modoAbertura(): ModoAbertura {
  const m = document.documentElement.dataset.abertura
  return m === 'rapida' || m === 'nenhuma' ? m : 'completa'
}

type Props = {
  /** O papel começou a subir: o topo do site entra. */
  onSaida: () => void
  /** O papel saiu e o desenho se dissolveu no letreiro: a abertura sai de cena. */
  onFim: () => void
}

const PARTES: readonly Parte[] = ['arco', 'ramo', 'mono', 'nome', 'beauty', 'raminho', 'coracao']
const matriz = (m: Matriz) => `matrix(${m.map(v => Number(v.toFixed(5))).join(', ')})`
const espera = (s: number) => new Promise<void>(r => window.setTimeout(r, s * 1000))
const E = [0.22, 1, 0.36, 1] as const
const CANETA = [0.45, 0, 0.15, 1] as const
const CORTINA = [0.76, 0, 0.24, 1] as const

/*
  Abertura (1ª visita ~5 s; ao voltar ~2 s).
  1. Num papel claro, o logotipo do salão se monta: o arco fino é a barra de carregamento de verdade
     (fontes e a arte do topo), o monograma é contornado e preenchido, o ramo cresce e solta as folhas,
     o nome entra letra por letra e o coração fecha com um quique.
  2. Com tudo carregado, o logotipo voa, ainda sobre o papel, até o lugar exato do letreiro na parede.
  3. O papel sobe como uma cortina (e um véu rosé logo atrás dele): a parede aparece com o metal já embaixo do desenho.
  O palco é um SVG do tamanho da tela (1 unidade = 1 px); cada parte do logotipo é um grupo com a sua matriz.
  Tudo o que se move é transform, opacity ou traço: nada de layout durante a animação.
*/
export default function Abertura({ onSaida, onFim }: Props) {
  const raiz = useRef<HTMLDivElement>(null)
  const papel = useRef<HTMLDivElement>(null)
  const veu = useRef<HTMLDivElement>(null)
  const palco = useRef<SVGSVGElement>(null)
  const arco = useRef<SVGPathElement>(null)
  const contador = useRef<HTMLDivElement>(null)
  const numero = useRef<HTMLSpanElement>(null)

  useLayoutEffect(() => {
    const modo = modoAbertura()
    if (modo === 'nenhuma') { onSaida(); onFim(); return }
    const completa = modo === 'completa'
    try { sessionStorage.setItem('sis-abertura', '1') } catch { /* navegação privada */ }

    let cancelado = false
    let voando = false
    const svg = palco.current!
    const grupos = Object.fromEntries(PARTES.map(p => [p, svg.querySelector<SVGGElement>(`[data-parte="${p}"]`)!])) as Record<Parte, SVGGElement>
    const arte = () => document.querySelector<HTMLElement>('[data-arte]')

    /*
      inicio: a matriz que põe o logotipo inteiro no centro da tela.
      destino: para cada parte, a matriz que a põe em cima do letreiro da arte do topo.
    */
    const medir = () => {
      const vw = window.innerWidth, vh = window.innerHeight
      svg.setAttribute('viewBox', `0 0 ${vw} ${vh}`)
      const [qx, qy, qw, qh] = QUADRO
      const s = Math.min(vw * .84, vh * .6 * (qw / qh), 700) / qw
      const inicio: Matriz = [s, 0, 0, s, (vw - qw * s) / 2 - qx * s, (vh - qh * s) / 2 - vh * .035 - qy * s]
      const A = ALVOS[window.matchMedia(CONSULTA_MOBILE).matches ? 'mobile' : 'desktop']
      const R = arte()?.getBoundingClientRect()
      const temArte = Boolean(R && R.width > 0)
      const destino = {} as Record<Parte, Matriz>
      PARTES.forEach(p => {
        if (R && temArte) {
          const [a, b, c, d, e, f] = A.partes[p]
          const kx = R.width / A.w, ky = R.height / A.h
          destino[p] = [kx * a, ky * b, kx * c, ky * d, kx * e + R.left, ky * f + R.top]
        } else destino[p] = inicio
        if (!voando) grupos[p].style.transform = matriz(inicio)
      })
      return { inicio, destino, temArte }
    }

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

    /* O arco anda com o tempo do desenho, mas só chega ao fim quando tudo carregou. */
    const DESENHO = 2.9
    let raf = 0, exibido = 0, pronto = false
    const inicioRelogio = performance.now()
    const arcoCompleto = new Promise<void>(resolve => {
      const quadro = (agora: number) => {
        if (cancelado) return
        const tempo = Math.min(1, (agora - inicioRelogio) / 1000 / DESENHO)
        const carga = pronto ? 1 : .55 + .35 * (feitas / tarefas.length)
        const alvo = Math.min(tempo, carga) * 100
        exibido += (alvo - exibido) * .14
        if (alvo >= 100 && exibido > 99.4) exibido = 100
        if (numero.current) numero.current.textContent = String(Math.round(exibido)).padStart(2, '0')
        if (arco.current) arco.current.style.strokeDashoffset = (1 - exibido / 100).toFixed(4)
        if (exibido >= 100) { resolve(); return }
        raf = requestAnimationFrame(quadro)
      }
      raf = requestAnimationFrame(quadro)
    })
    void carregado.then(() => { pronto = true })

    const roda = async () => {
      const q = <T extends Element>(s: string) => Array.from(svg.querySelectorAll<T>(s))
      const monoTraco = svg.querySelector<SVGPathElement>('.ab-mono-traco')!
      const monoCheio = svg.querySelector<SVGPathElement>('.ab-mono-cheio')!
      const haste = svg.querySelector<SVGPathElement>('.ab-haste')!
      const folhas = q<SVGPathElement>('.ab-folha'), pontos = q<SVGCircleElement>('.ab-ponto')
      const letras = q<SVGPathElement>('.ab-letra'), miudas = q<SVGPathElement>('.ab-miuda'), linhas = q<SVGRectElement>('.ab-linha')
      const raminho = svg.querySelector<SVGPathElement>('.ab-raminho')!, coracao = svg.querySelector<SVGGElement>('.ab-coracao')!

      if (completa) {
        animate(svg, { opacity: [0, 1] }, { duration: .5 })
        animate(contador.current!, { opacity: [0, 1] }, { duration: .6, delay: .1 })
        /* O monograma: o contorno se desenha e o vinho preenche. */
        animate(monoTraco, { strokeDashoffset: [1, 0] }, { duration: 1.7, delay: .15, ease: CANETA })
        animate(monoCheio, { opacity: [0, 1] }, { duration: .8, delay: 1.05, ease: 'easeOut' })
        /* O ramo cresce de baixo para cima e solta as folhas, uma a uma. */
        animate(haste, { strokeDashoffset: [1, 0] }, { duration: 1.1, delay: .45, ease: CANETA })
        folhas.forEach((f, i) => animate(f, { scale: [.1, 1], opacity: [0, 1] }, { type: 'spring', stiffness: 170, damping: 15, delay: .8 + i * .11 }))
        pontos.forEach((p, i) => animate(p, { scale: [0, 1], opacity: [0, 1] }, { type: 'spring', stiffness: 300, damping: 13, delay: 1.5 + i * .1 }))
        /* O nome, letra por letra; depois a assinatura, com as duas linhas se abrindo. */
        letras.forEach((p, i) => animate(p, { opacity: [0, 1], y: [34, 0] }, { duration: .7, delay: 1.2 + i * .058, ease: E }))
        linhas.forEach(l => animate(l, { scaleX: [0, 1], opacity: [0, 1] }, { duration: .7, delay: 2, ease: E }))
        miudas.forEach((p, i) => animate(p, { opacity: [0, 1] }, { duration: .5, delay: 2.02 + i * .05 }))
        animate(raminho, { opacity: [0, 1], scale: [.82, 1] }, { duration: .8, delay: 2.2, ease: E })
        /* O coração fecha o logotipo com um quique. */
        animate(coracao, { scale: [0, 1], opacity: [0, 1] }, { type: 'spring', stiffness: 260, damping: 10, delay: 2.5 })
        await arcoCompleto
        if (cancelado) return
        await espera(.3)
      } else {
        monoTraco.style.strokeDashoffset = '0'; haste.style.strokeDashoffset = '0'
        ;[monoCheio, raminho, coracao, ...folhas, ...pontos, ...letras, ...miudas, ...linhas].forEach(p => { (p as SVGElement).style.opacity = '1' })
        animate(svg, { opacity: [0, 1] }, { duration: .45, ease: 'easeOut' })
        await Promise.all([espera(.55), carregado])
        if (arco.current) arco.current.style.strokeDashoffset = '0'
      }
      if (cancelado) return

      /*
        O logotipo voa primeiro, ainda sobre o papel, até o lugar exato do letreiro. Só então o papel sobe (e o véu atrás dele):
        a parede aparece com o metal já embaixo do desenho, que se dissolve nele.
      */
      medida = medir()
      voando = true
      const { inicio, destino, temArte } = medida
      animate(contador.current!, { opacity: 0 }, { duration: .3 })
      const voo = completa ? 1.05 : .85
      const subida = completa ? 1.15 : 1
      if (temArte) {
        /* Animação nativa do navegador: as matrizes valem no palco, com origem em 0 0 (ver abertura.css). */
        PARTES.forEach(p => grupos[p].animate(
          [{ transform: matriz(inicio) }, { transform: matriz(destino[p]) }],
          { duration: voo * 1000, easing: 'cubic-bezier(0.7, 0, 0.2, 1)', fill: 'forwards' }))
      }
      await espera(voo * .58)
      if (cancelado) return
      raiz.current?.classList.remove('is-bloqueando')
      raiz.current?.classList.add('is-saindo')
      onSaida()
      const sobe = (alvo: HTMLElement, atraso: number) => animate(alvo,
        { transform: ['translate3d(0, 0, 0)', 'translate3d(0, -104%, 0)'] }, { duration: subida, delay: atraso, ease: CORTINA })
      const cortinas = [sobe(papel.current!, 0), sobe(veu.current!, .13)]
      const some = animate(svg, { opacity: 0 }, { duration: .55, delay: temArte ? subida * .72 : 0, ease: 'easeInOut' })
      await Promise.all([some.finished, ...cortinas.map(c => c.finished)])
      if (!cancelado) onFim()
    }

    roda().catch(() => { if (!cancelado) { onSaida(); onFim() } })
    return () => { cancelado = true; cancelAnimationFrame(raf); window.removeEventListener('resize', aoRedimensionar) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const tracado = { pathLength: 1, strokeDasharray: '1 1', strokeDashoffset: 1 }
  return <div ref={raiz} className="abertura is-bloqueando" aria-hidden="true">
    <div ref={veu} className="ab-veu" />
    <div ref={papel} className="ab-papel papel">
      <div ref={contador} className="ab-contador"><span ref={numero} className="ab-numero num">00</span></div>
    </div>
    <svg ref={palco} className="ab-palco">
      <g data-parte="arco" className="ab-parte ab-fio" strokeWidth={TRACO}>
        <path className="ab-trilho" d={ARCO} />
        <path ref={arco} d={ARCO} {...tracado} />
      </g>
      <g data-parte="ramo" className="ab-parte">
        <path className="ab-haste ab-fio" d={HASTE} strokeWidth={TRACO} {...tracado} />
        {FOLHAS.map((d, i) => <path key={i} className="ab-folha ab-rose" d={d} opacity={0} />)}
        {PONTOS.map(([x, y, r], i) => <circle key={i} className="ab-ponto ab-fio-cheio" cx={x} cy={y} r={r} opacity={0} />)}
      </g>
      <g data-parte="mono" className="ab-parte">
        <path className="ab-mono-traco" d={MONO} {...tracado} />
        <path className="ab-mono-cheio ab-vinho" d={MONO} fillRule="evenodd" opacity={0} />
      </g>
      <g data-parte="nome" className="ab-parte">
        {NOME.map((d, i) => <path key={i} className="ab-letra ab-vinho" d={d} fillRule="evenodd" opacity={0} />)}
      </g>
      <g data-parte="beauty" className="ab-parte ab-cinza">
        {LINHAS.map(([x0, y, x1, e], i) => <rect key={i} className={`ab-linha ${i === 0 ? 'is-esquerda' : ''}`} x={x0} y={y - e / 2} width={x1 - x0} height={e} opacity={0} />)}
        {BEAUTY.map((d, i) => <path key={i} className="ab-miuda" d={d} fillRule="evenodd" opacity={0} />)}
      </g>
      <g data-parte="raminho" className="ab-parte">
        <path className="ab-raminho ab-rose" d={RAMINHO} fillRule="evenodd" opacity={0} />
      </g>
      <g data-parte="coracao" className="ab-parte">
        <g transform={CORACAO.posicao}>
          <g className="ab-coracao ab-fio" opacity={0}><path d={CORACAO.d} strokeWidth={CORACAO.traco} strokeLinejoin="round" /></g>
        </g>
      </g>
    </svg>
  </div>
}
