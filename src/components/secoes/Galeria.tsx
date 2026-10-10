import { useEffect, useRef } from 'react'
import { m, useAnimationFrame, useMotionValue, useScroll, useSpring, useTransform, useVelocity } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { GALERIA } from '../../content/textos'
import { INSTAGRAM_URL, SITE } from '../../config/site'
import { CABELOS } from '../../config/imagens'
import { useMotionPreferences } from '../../hooks/useMotionPreferences'
import { useSceneActivity } from '../../hooks/useSceneActivity'
import BrandIcon from '../ui/BrandIcon'
import Revelar, { Titulo } from '../ui/Revelar'

const envolve = (min: number, max: number, v: number) => { const r = max - min; return ((((v - min) % r) + r) % r) + min }

function Cartao({ i, oculto }: { i: number; oculto?: boolean }) {
  const f = CABELOS[i]
  return <figure className="galeria-cartao" aria-hidden={oculto || undefined}>
    <picture>
      <source type="image/avif" srcSet={f.avif} />
      <img src={f.src} srcSet={f.webp} width={f.largura} height={f.altura}
        loading="lazy" decoding="async" draggable={false} alt={oculto ? '' : `${f.alt}, feito no ${SITE.nome}`} />
    </picture>
  </figure>
}

/**
 * Os cabelos feitos no salão, num carrossel que anda sozinho.
 * Ele acelera com a rolagem da página, desacelera até parar quando o mouse está em cima
 * e pode ser arrastado com o dedo ou com o mouse. Com "reduzir movimento", vira uma fila que a pessoa rola.
 */
export default function Galeria() {
  const ref = useRef<HTMLElement>(null)
  const trilho = useRef<HTMLDivElement>(null)
  const ativa = useSceneActivity(ref)
  const { reduced } = useMotionPreferences()
  const base = useMotionValue(0)
  const { scrollY } = useScroll()
  const impulso = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 380 })
  const fator = useTransform(impulso, [-1000, 0, 1000], [3, 0, 3], { clamp: false })
  const x = useTransform(base, v => `${envolve(-50, 0, v)}%`)
  /* 1 = andando, 0 = parado (mouse em cima ou dedo segurando); a mola faz a parada e a retomada suaves */
  const ritmo = useSpring(1, { stiffness: 60, damping: 20 })
  const arrasto = useRef<{ x: number; base: number; largura: number } | null>(null)

  useAnimationFrame((_, delta) => {
    if (!ativa || reduced || arrasto.current) return
    const passo = -1.05 * (Math.min(delta, 50) / 1000) * ritmo.get()
    base.set(base.get() + passo * (1 + Math.min(Math.abs(fator.get()), 5)))
  })

  /* Arrastar: o dedo (ou o mouse) leva a fila; ao soltar, ela volta a andar sozinha. */
  useEffect(() => {
    const el = trilho.current
    if (!el || reduced) return
    const pega = (e: PointerEvent) => {
      if (e.pointerType === 'mouse' && e.button !== 0) return
      arrasto.current = { x: e.clientX, base: base.get(), largura: el.scrollWidth }
      el.setPointerCapture(e.pointerId)
      el.classList.add('is-arrastando')
    }
    const leva = (e: PointerEvent) => {
      const a = arrasto.current
      if (a) base.set(a.base + ((e.clientX - a.x) / a.largura) * 100)
    }
    const solta = (e: PointerEvent) => {
      if (!arrasto.current) return
      arrasto.current = null
      el.classList.remove('is-arrastando')
      if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId)
    }
    el.addEventListener('pointerdown', pega)
    el.addEventListener('pointermove', leva)
    el.addEventListener('pointerup', solta)
    el.addEventListener('pointercancel', solta)
    return () => {
      el.removeEventListener('pointerdown', pega); el.removeEventListener('pointermove', leva)
      el.removeEventListener('pointerup', solta); el.removeEventListener('pointercancel', solta)
    }
  }, [reduced, base])

  const indices = CABELOS.map((_, i) => i)
  return <section ref={ref} id="cabelos" className="galeria secao papel" aria-labelledby="galeria-titulo">
    <div className="conteiner galeria-cabeca">
      <Titulo id="galeria-titulo" className="titulo" linhas={GALERIA.titulo} />
      <div className="galeria-lado">
        <Revelar delay={.08}><p className="lead">{GALERIA.texto}</p></Revelar>
        {INSTAGRAM_URL && <Revelar delay={.14}>
          <a className="link-linha" href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
            <BrandIcon brand="instagram" />{GALERIA.link}<ArrowUpRight aria-hidden="true" strokeWidth={2} />
            <span className="sr-only"> (abre em nova aba)</span>
          </a>
        </Revelar>}
      </div>
    </div>

    <Revelar className={`galeria-janela ${reduced ? 'is-parada' : ''}`} y={40} amount={.1}>
      <m.div ref={trilho} className="galeria-trilho" style={reduced ? undefined : { x }}
        onHoverStart={() => ritmo.set(0)} onHoverEnd={() => ritmo.set(1)}>
        <div className="galeria-metade">{indices.map(i => <Cartao key={i} i={i} />)}</div>
        {!reduced && <div className="galeria-metade" aria-hidden="true">{indices.map(i => <Cartao key={i} i={i} oculto />)}</div>}
      </m.div>
    </Revelar>
  </section>
}
