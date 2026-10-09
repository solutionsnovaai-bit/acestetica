import { useRef } from 'react'
import { m, useScroll, useSpring, useTransform } from 'motion/react'
import { AMANDA_TEXTO } from '../../content/textos'
import { AMANDA } from '../../config/imagens'
import { useMotionPreferences } from '../../hooks/useMotionPreferences'
import Monograma from '../ui/Monograma'
import Revelar, { CORTINA, CORTINA_SOBE, Titulo } from '../ui/Revelar'

/**
 * A Amanda: o retrato num arco, que se abre de baixo para cima, e o monograma da marca
 * sendo desenhado ao fundo conforme a rolagem.
 */
export default function Amanda() {
  const { reduced } = useMotionPreferences()
  const ref = useRef<HTMLElement>(null)
  const foto = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: foto, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-5%', '5%'])
  const { scrollYProgress: secao } = useScroll({ target: ref, offset: ['start 75%', 'end 85%'] })
  const desenho = useSpring(secao, { stiffness: 70, damping: 26, restDelta: .001 })
  const aparece = useTransform(desenho, [0, .05], [0, 1])

  return <section ref={ref} id="amanda" className="amanda secao" aria-labelledby="amanda-titulo">
    <div className="conteiner amanda-grade">
      <div className="amanda-retrato">
        <m.div className="amanda-mono" aria-hidden="true" style={reduced ? undefined : { opacity: aparece }}>
          <Monograma espessura={3.5} progresso={reduced ? undefined : desenho} />
        </m.div>
        {/* a figura (sem recorte) é quem avisa que entrou na tela; a cortina é o miolo */}
        <m.figure ref={foto} className="amanda-foto" initial={reduced ? false : 'fechada'} whileInView="aberta" viewport={{ once: true, amount: .25 }}>
          <m.div className="amanda-cortina" variants={CORTINA_SOBE} transition={{ duration: 1.6, ease: CORTINA }}>
            <picture>
              <source type="image/avif" srcSet={AMANDA.avif} sizes="(min-width: 1024px) 36vw, 78vw" />
              <m.img src={AMANDA.src} srcSet={AMANDA.webp} sizes="(min-width: 1024px) 36vw, 78vw" width={AMANDA.largura} height={AMANDA.altura}
                loading="lazy" decoding="async" alt={AMANDA_TEXTO.fotoAlt} style={reduced ? undefined : { y, scale: 1.12 }} />
            </picture>
          </m.div>
        </m.figure>
      </div>

      <div className="amanda-texto">
        <Titulo id="amanda-titulo" className="titulo" linhas={AMANDA_TEXTO.titulo} />
        <div className="amanda-paragrafos">
          {AMANDA_TEXTO.paragrafos.map((p, i) => <Revelar key={i} delay={i * .08}><p className="lead">{p}</p></Revelar>)}
        </div>
        <ul className="amanda-pontos">
          {AMANDA_TEXTO.pontos.map((p, i) => <Revelar as="li" key={p} delay={i * .08} y={14}>{p}</Revelar>)}
        </ul>
      </div>
    </div>
  </section>
}
