/*
  Textos do site. Para mudar uma frase, mexa só aqui.
  Listas em "titulo" viram quebras de linha.
*/
import { SITE } from '../config/site'

export const NAV = [
  { href: '#tratamentos', rotulo: 'Tratamentos' },
  { href: '#como-funciona', rotulo: 'Como funciona' },
  { href: '#amanda', rotulo: 'A Amanda' },
  { href: '#avaliacoes', rotulo: 'Avaliações' },
  { href: '#onde-fica', rotulo: 'Onde fica' },
] as const

export const HERO = {
  titulo: ['Sua pele,', 'em boas mãos.'],
  texto: 'Estética facial e corporal em Itaquera. A Amanda avalia a sua pele de perto e monta um protocolo só para você.',
  cta: 'Agendar um horário',
  link: 'Ver os tratamentos',
} as const

export const FAIXA = ['Limpeza de pele', 'Peeling químico', 'Manchas e melasma', 'Protocolos faciais', 'Cuidados corporais', 'Avaliação individual'] as const

export const MANIFESTO = {
  /** As palavras acendem uma a uma conforme a rolagem. Trechos entre *asteriscos* ficam em itálico dourado. */
  texto:
    'Aqui ninguém escolhe tratamento em tabela. Primeiro a Amanda olha a sua pele de perto, pergunta da sua rotina e ouve o que te incomoda. *Só depois nasce o protocolo:* o seu, para o rosto, para o corpo ou para os dois.',
} as const

export const TRATAMENTOS = {
  titulo: ['Para o rosto', 'e para o corpo.'],
  texto: 'Toque em um cuidado para saber como ele funciona. A indicação certa para você sai da avaliação.',
  perguntar: 'Perguntar sobre',
} as const

export const PASSOS = {
  titulo: ['Do primeiro oi', 'ao seu protocolo.'],
  itens: [
    { titulo: 'Você chama no WhatsApp', texto: 'Conta o que procura e combina o melhor dia e horário.' },
    { titulo: 'A Amanda avalia a sua pele', texto: 'Uma conversa e um olhar de perto, antes de qualquer procedimento.' },
    { titulo: 'O protocolo é feito para você', texto: 'Para o rosto, para o corpo ou para os dois, no seu ritmo.' },
  ],
  cta: 'Começar pelo WhatsApp',
} as const

export const AMANDA_TEXTO = {
  titulo: ['Quem cuida', 'de você.'],
  paragrafos: [
    `${SITE.profissional} é esteticista e atende em ${SITE.endereco.bairro}, na Zona Leste de São Paulo. Trabalha com estética facial e corporal e não indica nenhum procedimento sem antes avaliar a pele de quem chega.`,
    'Quem já foi atendida fala de um cuidado atento a cada detalhe e de uma conversa franca sobre o que dá para esperar de cada tratamento.',
  ],
  pontos: ['Avaliação individual', 'Protocolo personalizado', 'Rosto e corpo'],
  fotoAlt: `Retrato da ${SITE.profissional}, de blusa branca, com o queixo apoiado na mão.`,
} as const

export const AVALIACOES = {
  titulo: ['Quem veio,', 'recomenda.'],
  legenda: (n: number) => `Nota no Google, em ${n} avaliações.`,
  elogiosTitulo: 'O que as clientes mais elogiam',
  elogios: ['Atendimento atencioso', 'Espaço limpo e organizado', 'Produtos de qualidade', 'Resultado na pele'],
  cta: 'Ler as avaliações no Google',
} as const

export const ONDE = {
  titulo: ['Fica em', 'Itaquera.'],
  texto: 'Atendimento com hora marcada. Chame no WhatsApp para combinar o seu horário.',
  horarioTitulo: 'Horário',
  fechado: 'Fechado',
  mapa: 'Abrir no mapa',
  whatsapp: 'Combinar um horário',
  mapaTitulo: `Mapa: ${SITE.nome}, ${SITE.endereco.rua}`,
} as const

export const CONVITE = {
  titulo: ['Vamos cuidar', 'da sua pele?'],
  texto: 'A avaliação é o primeiro passo. Mande uma mensagem e a Amanda te responde com os horários.',
  cta: 'Agendar pelo WhatsApp',
} as const

export const RODAPE = {
  faixa: SITE.assinatura,
} as const
