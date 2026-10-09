/*
  Imagens fixas do site, em AVIF com reserva em WebP, servidas pelo próprio site.
*/

type Foto = { avif: string; webp: string; src: string; largura: number; altura: number }

/** Arte do topo no computador (16:9): o letreiro na parede, ancorado à direita. */
export const HERO_DESKTOP: Foto = {
  avif: '/hero/desktop-1100.avif 1100w, /hero/desktop-1672.avif 1672w',
  webp: '/hero/desktop-1100.webp 1100w, /hero/desktop-1672.webp 1672w',
  src: '/hero/desktop-1672.webp', largura: 1672, altura: 941,
}

/** Arte do topo no celular (9:16): o letreiro no alto, a parede livre embaixo. */
export const HERO_MOBILE: Foto = {
  avif: '/hero/mobile-640.avif 640w, /hero/mobile-941.avif 941w',
  webp: '/hero/mobile-640.webp 640w, /hero/mobile-941.webp 941w',
  src: '/hero/mobile-941.webp', largura: 941, altura: 1672,
}

/**
 * Quando o site usa a arte de celular (letreiro no alto, texto embaixo): telas estreitas e tablets em pé.
 * Telas largas, inclusive celular deitado, usam a arte de computador.
 * É a mesma regra do CSS (src/styles/secoes.css): se mudar aqui, mude lá.
 */
export const CONSULTA_MOBILE = '(max-width: 699px), (max-width: 1023px) and (max-aspect-ratio: 1333/1000)'

/** Logotipo em ouro sobre papel (quadrado). */
export const PAPEL: Foto = {
  avif: '/marca/papel-640.avif 640w, /marca/papel-1100.avif 1100w',
  webp: '/marca/papel-640.webp 640w, /marca/papel-1100.webp 1100w',
  src: '/marca/papel-1100.webp', largura: 1100, altura: 1100,
}

/** Retrato da Amanda. */
export const AMANDA: Foto = {
  avif: '/fotos/amanda-700.avif 700w, /fotos/amanda-1170.avif 1170w',
  webp: '/fotos/amanda-700.webp 700w, /fotos/amanda-1170.webp 1170w',
  src: '/fotos/amanda-1170.webp', largura: 1170, altura: 1340,
}
