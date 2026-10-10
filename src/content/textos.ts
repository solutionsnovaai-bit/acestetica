/*
  Textos do site. Para mudar uma frase, mexa só aqui.
  Listas em "titulo" viram quebras de linha.
*/
import { SITE } from '../config/site'

export const NAV = [
  { href: '#servicos', rotulo: 'Serviços' },
  { href: '#cabelos', rotulo: 'Cabelos' },
  { href: '#como-funciona', rotulo: 'Como funciona' },
  { href: '#avaliacoes', rotulo: 'Avaliações' },
  { href: '#onde-fica', rotulo: 'Onde fica' },
] as const

export const HERO = {
  titulo: ['Sua beleza,', 'nossa paixão.'],
  texto: `Salão de beleza feminina no ${SITE.endereco.bairro}. Cabelo, unhas, cílios, sobrancelhas e estética num só lugar.`,
  cta: 'Agendar horário',
  link: 'Ver os serviços',
} as const

export const FAIXA = ['Cabelo', 'Loiros', 'Unhas', 'Cílios', 'Sobrancelhas', 'Micropigmentação', 'Estética facial e corporal', 'Massagem', 'Depilação'] as const

export const MANIFESTO = {
  /** As palavras acendem uma a uma conforme a rolagem. Trechos entre *asteriscos* ficam em itálico vinho. */
  texto:
    'Beleza, cuidado e autoestima em um só lugar. Aqui você faz o cabelo, a unha e a sobrancelha, e ainda sai com a pele cuidada, *sem correr de um endereço para o outro.* É o seu dia de beleza completo, no Itaim Paulista.',
} as const

export const SERVICOS = {
  titulo: ['Tudo o que você', 'precisa, aqui tem.'],
  texto: 'Toque em um serviço para saber mais e já perguntar no WhatsApp.',
  perguntar: 'Perguntar sobre',
} as const

export const GALERIA = {
  titulo: ['Cabelos que', 'saíram daqui.'],
  texto: 'Cortes, cores e penteados feitos no salão.',
  link: 'Ver mais no Instagram',
} as const

export const PASSOS = {
  titulo: ['Do primeiro oi', 'ao seu horário.'],
  itens: [
    { titulo: 'Você chama no WhatsApp', texto: 'Conta o que quer fazer e escolhe o melhor dia.' },
    { titulo: 'A gente confirma o horário', texto: 'Com o tempo certo para cada serviço que você escolheu.' },
    { titulo: 'Você vem e aproveita', texto: 'Dá para juntar cabelo, unha e estética na mesma visita.' },
  ],
  cta: 'Agendar pelo WhatsApp',
} as const

export const AVALIACOES = {
  titulo: ['Quem vem,', 'recomenda.'],
  legenda: (n: number) => `Nota no Google, em ${n} avaliações.`,
  elogiosTitulo: 'O que as clientes elogiam',
  elogios: ['Profissionais de primeira', 'Atendimento cuidadoso', 'Equipe dedicada', 'O corte do jeito que você pediu'],
  cta: 'Ler as avaliações no Google',
} as const

export const ONDE = {
  titulo: ['Fica no', `${SITE.endereco.bairro}.`],
  texto: 'Atendimento com hora marcada. Chame no WhatsApp para combinar o seu horário.',
  horarioTitulo: 'Horário',
  fechado: 'Fechado',
  mapa: 'Abrir no mapa',
  whatsapp: 'Combinar um horário',
  mapaTitulo: `Mapa: ${SITE.nome}, ${SITE.endereco.rua}`,
} as const

export const CONVITE = {
  titulo: ['Vamos marcar', 'o seu horário?'],
  texto: 'Mande uma mensagem e a gente responde com os dias e horários disponíveis.',
  cta: 'Agendar pelo WhatsApp',
} as const

export const RODAPE = {
  faixa: 'Sua beleza, nossa paixão',
} as const
