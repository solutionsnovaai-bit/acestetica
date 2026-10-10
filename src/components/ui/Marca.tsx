import { ARCO, BEAUTY, CORACAO, FOLHAS, HASTE, LINHAS, MONO, NOME, PONTOS, QUADRO, QUADRO_MONO, RAMINHO, TRACO } from '../abertura/marca'

/** O monograma SB com o perfil, sozinho, na cor do texto em volta. */
export function Monograma({ className = '' }: { className?: string }) {
  const [x, y, w, h] = QUADRO_MONO
  return <svg className={className} viewBox={`${x - 4} ${y - 4} ${w + 8} ${h + 8}`} fill="currentColor" aria-hidden="true" focusable="false">
    <path d={MONO} fillRule="evenodd" />
  </svg>
}

/**
 * O logotipo inteiro. As cores vêm de variáveis CSS (--lg-vinho, --lg-rose, --lg-fio, --lg-cinza),
 * definidas na classe .logotipo: assim ele muda de tom sobre fundo claro ou escuro.
 */
export default function Logotipo({ className = '' }: { className?: string }) {
  return <svg className={`logotipo ${className}`} viewBox={QUADRO.join(' ')} aria-hidden="true" focusable="false">
    <g fill="none" stroke="var(--lg-fio)" strokeWidth={TRACO} strokeLinecap="round">
      <path d={ARCO} />
      <path d={HASTE} />
      <g transform={CORACAO.posicao}><path d={CORACAO.d} strokeWidth={CORACAO.traco} strokeLinejoin="round" /></g>
    </g>
    <g fill="var(--lg-fio)">{PONTOS.map(([x, y, r], i) => <circle key={i} cx={x} cy={y} r={r} />)}</g>
    <g fill="var(--lg-rose)">
      {FOLHAS.map((d, i) => <path key={i} d={d} />)}
      <path d={RAMINHO} fillRule="evenodd" />
    </g>
    <g fill="var(--lg-vinho)">
      <path d={MONO} fillRule="evenodd" />
      {NOME.map((d, i) => <path key={i} d={d} fillRule="evenodd" />)}
    </g>
    <g fill="var(--lg-cinza)">
      {BEAUTY.map((d, i) => <path key={i} d={d} fillRule="evenodd" />)}
      {LINHAS.map(([x0, y, x1, e], i) => <rect key={i} x={x0} y={y - e / 2} width={x1 - x0} height={e} />)}
    </g>
  </svg>
}
