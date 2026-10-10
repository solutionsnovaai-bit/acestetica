/*
  Imagens fixas do site, em AVIF com reserva em WebP, servidas pelo próprio site.
*/

type Foto = { avif: string; webp: string; src: string; largura: number; altura: number }

/** Arte do topo no computador (16:9): o logotipo na parede, ancorado à direita. */
export const HERO_DESKTOP: Foto = {
  avif: '/hero/desktop-1100.avif 1100w, /hero/desktop-1672.avif 1672w',
  webp: '/hero/desktop-1100.webp 1100w, /hero/desktop-1672.webp 1672w',
  src: '/hero/desktop-1672.webp', largura: 1672, altura: 941,
}

/** Arte do topo no celular (9:16): o logotipo no alto, a parede livre embaixo. */
export const HERO_MOBILE: Foto = {
  avif: '/hero/mobile-640.avif 640w, /hero/mobile-941.avif 941w',
  webp: '/hero/mobile-640.webp 640w, /hero/mobile-941.webp 941w',
  src: '/hero/mobile-941.webp', largura: 941, altura: 1672,
}

/**
 * Quando o site usa a arte de celular (logotipo no alto, texto embaixo): telas estreitas e tablets em pé.
 * Telas largas, inclusive celular deitado, usam a arte de computador.
 * É a mesma regra do CSS (src/styles/secoes.css): se mudar aqui, mude lá.
 */
export const CONSULTA_MOBILE = '(max-width: 699px), (max-width: 1023px) and (max-aspect-ratio: 1333/1000)'

/** O logotipo impresso em papel (quadrado). */
export const PAPEL: Foto = {
  avif: '/marca/papel-640.avif 640w, /marca/papel-1100.avif 1100w',
  webp: '/marca/papel-640.webp 640w, /marca/papel-1100.webp 1100w',
  src: '/marca/papel-1100.webp', largura: 1100, altura: 1100,
}

/** Fotos de cabelos feitos no salão, para o carrossel (4:5). "alt" descreve cada uma. */
const cabelo = (n: string, alt: string): Foto & { alt: string } => ({
  avif: `/cabelos/${n}-720.avif`,
  webp: `/cabelos/${n}-720.webp`,
  src: `/cabelos/${n}-720.webp`, largura: 720, altura: 900, alt,
})
export const CABELOS = [
  cabelo('01', 'Loiro em degradê com ondas nas pontas'),
  cabelo('02', 'Preto azulado em camadas'),
  cabelo('03', 'Castanho acobreado com ondas'),
  cabelo('04', 'Mechas caramelo em cabelo liso e longo'),
  cabelo('05', 'Penteado preso de lado com cachos'),
  cabelo('06', 'Loiro claro escovado, com volume'),
  cabelo('07', 'Mechas douradas em cabelo longo'),
  cabelo('08', 'Mechas avermelhadas'),
  cabelo('09', 'Preto azulado com movimento'),
  cabelo('10', 'Castanho liso e longo'),
] as const
