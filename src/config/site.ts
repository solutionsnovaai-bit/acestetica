/*
  Dados do salão. Tudo o que muda (telefone, endereço, horário, Instagram) fica aqui.
*/

export const SITE = {
  nome: 'Sisters Bela Beauty',
  assinatura: 'Salão de beleza feminina',
  /** O lema do salão. */
  lema: 'Sua beleza, nossa paixão.',
  /** WhatsApp com 55 + DDD + número (só números). */
  whatsapp: '5511984178579',
  whatsappExibicao: '(11) 98417-8579',
  /** Perfil do Instagram (sem @). Deixe vazio para esconder o link. */
  instagram: 'sistersbelabeauty',
  endereco: {
    rua: 'Rua Alfredo Moreira Pinto, 338',
    bairro: 'Itaim Paulista',
    cidade: 'São Paulo',
    uf: 'SP',
    cep: '08110-220',
  },
  /** Identificador do lugar no Google Maps (abre a ficha com as avaliações). */
  googlePlaceId: 'ChIJ_faUZDNjzpQR5Jk8bp9TT0Q',
  /** Nota e número de avaliações no Google. Atualize de vez em quando. */
  google: { nota: 5.0, avaliacoes: 8 },
  /**
   * false: o site pede para o Google NÃO listar (bom enquanto é só uma prévia).
   * true: o site aparece nas buscas. Troque para true na hora de publicar de vez.
   */
  indexar: false,
} as const

/** Horário de atendimento. dia: 0 = domingo … 6 = sábado. Horas em "HH:MM"; null = fechado. */
export const HORARIO = [
  { dia: 1, rotulo: 'Segunda', abre: null, fecha: null },
  { dia: 2, rotulo: 'Terça', abre: '09:00', fecha: '18:00' },
  { dia: 3, rotulo: 'Quarta', abre: '09:00', fecha: '18:00' },
  { dia: 4, rotulo: 'Quinta', abre: '09:00', fecha: '18:00' },
  { dia: 5, rotulo: 'Sexta', abre: '09:00', fecha: '18:00' },
  { dia: 6, rotulo: 'Sábado', abre: '08:00', fecha: '18:00' },
  { dia: 0, rotulo: 'Domingo', abre: null, fecha: null },
] as const

export const ENDERECO_LINHA = `${SITE.endereco.rua}, ${SITE.endereco.bairro}`
export const ENDERECO_CURTO = `${SITE.endereco.bairro}, ${SITE.endereco.cidade}`
export const ENDERECO_COMPLETO = `${SITE.endereco.rua}, ${SITE.endereco.bairro}, ${SITE.endereco.cidade} - ${SITE.endereco.uf}, ${SITE.endereco.cep}`
export const INSTAGRAM_URL = SITE.instagram ? `https://www.instagram.com/${SITE.instagram}/` : ''

export const SEO = {
  titulo: 'Sisters Bela Beauty | Salão de beleza feminina no Itaim Paulista, São Paulo',
  descricao:
    'Salão de beleza feminina no Itaim Paulista: cabelo, unhas, cílios, sobrancelhas, micropigmentação, estética facial e corporal, depilação e massagem. Agende pelo WhatsApp.',
  compartilharTitulo: 'Sisters Bela Beauty · Sua beleza, nossa paixão',
  compartilharTexto: 'Cabelo, unhas, cílios, sobrancelhas e estética num só lugar, no Itaim Paulista.',
  imagemAlt: 'Logotipo do Sisters Bela Beauty: as letras S e B em vinho com um perfil feminino, ramos de folhas rosé e o nome do salão.',
  corTema: '#FBF4F1',
  corFundo: '#FBF4F1',
} as const

/** Mensagens prontas do WhatsApp, uma para cada botão do site. */
export const MENSAGENS = {
  padrao: 'Olá! Vim pelo site do Sisters Bela Beauty e queria agendar um horário.',
  servico: (nome: string) => `Olá! Vim pelo site do Sisters Bela Beauty e queria saber mais sobre ${nome}.`,
  caminho: 'Olá! Vim pelo site do Sisters Bela Beauty e queria confirmar um horário para ir até aí.',
} as const
