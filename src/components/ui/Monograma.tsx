import { m } from 'motion/react'
import type { MotionValue } from 'motion/react'
import { ESPESSURA, MONO, PAPEL } from '../abertura/tracos'

const [, , W, H] = PAPEL.mono
const FOLGA = ESPESSURA

type Props = {
  className?: string
  /** Espessura do traço, na escala do desenho (padrão: a do logotipo). */
  espessura?: number
  /** 0 a 1: quanto do desenho já foi traçado. Sem isso, aparece inteiro. */
  progresso?: MotionValue<number>
}

/** O monograma da marca (as letras A e C dentro do perfil) em traço de caneta. */
export default function Monograma({ className = '', espessura = ESPESSURA, progresso }: Props) {
  return <svg className={className} viewBox={`${-FOLGA} ${-FOLGA} ${W + 2 * FOLGA} ${H + 2 * FOLGA}`} fill="none" stroke="currentColor"
    strokeWidth={espessura} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    {MONO.map(t => progresso
      ? <m.path key={t.id} d={t.d} style={{ pathLength: progresso }} />
      : <path key={t.id} d={t.d} />)}
  </svg>
}
