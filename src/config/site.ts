/*
  Dados da clínica. Tudo o que muda (telefone, endereço, horário, Instagram) fica aqui.
*/

export const SITE = {
  nome: 'AC Estética',
  assinatura: 'Saúde e bem-estar',
  /** Quem atende. */
  profissional: 'Amanda',
  /** WhatsApp com 55 + DDD + número (só números). */
  whatsapp: '5511987055461',
  whatsappExibicao: '(11) 98705-5461',
  /** Perfil do Instagram (sem @). Deixe vazio para esconder o link. */
  instagram: 'acesteticaa',
  endereco: {
    rua: 'Rua Colonial das Missões, 445',
    bairro: 'Itaquera',
    cidade: 'São Paulo',
    uf: 'SP',
    cep: '08295-300',
  },
  /** Identificador do lugar no Google Maps (abre a ficha com as avaliações). */
  googlePlaceId: 'ChIJjfjlVpplzpQRGmyRk4KiBKw',
  /** Nota e número de avaliações no Google. Atualize de vez em quando. */
  google: { nota: 5.0, avaliacoes: 74 },
  /**
   * false: o site pede para o Google NÃO listar (bom enquanto é só uma prévia).
   * true: o site aparece nas buscas. Troque para true na hora de publicar de vez.
   */
  indexar: false,
} as const

/** Horário de atendimento. dia: 0 = domingo … 6 = sábado. Horas em "HH:MM"; null = fechado. */
export const HORARIO = [
  { dia: 1, rotulo: 'Segunda', abre: null, fecha: null },
  { dia: 2, rotulo: 'Terça', abre: '09:30', fecha: '18:00' },
  { dia: 3, rotulo: 'Quarta', abre: '09:30', fecha: '18:00' },
  { dia: 4, rotulo: 'Quinta', abre: '09:30', fecha: '18:00' },
  { dia: 5, rotulo: 'Sexta', abre: '09:30', fecha: '18:00' },
  { dia: 6, rotulo: 'Sábado', abre: '08:00', fecha: '13:00' },
  { dia: 0, rotulo: 'Domingo', abre: null, fecha: null },
] as const

export const ENDERECO_LINHA = `${SITE.endereco.rua}, ${SITE.endereco.bairro}`
export const ENDERECO_COMPLETO = `${SITE.endereco.rua}, ${SITE.endereco.bairro}, ${SITE.endereco.cidade} - ${SITE.endereco.uf}, ${SITE.endereco.cep}`
export const INSTAGRAM_URL = SITE.instagram ? `https://www.instagram.com/${SITE.instagram}/` : ''

export const SEO = {
  titulo: 'AC Estética | Estética facial e corporal em Itaquera, São Paulo',
  descricao:
    'Limpeza de pele, peeling e protocolos para rosto e corpo em Itaquera, Zona Leste de São Paulo. Avaliação individual com a Amanda. Agende pelo WhatsApp.',
  compartilharTitulo: 'AC Estética · Saúde e bem-estar',
  compartilharTexto: 'Estética facial e corporal em Itaquera, com avaliação individual e protocolo feito para você.',
  imagemAlt: 'Logotipo da AC Estética em dourado sobre papel creme: as letras A e C dentro de um perfil feminino.',
  corTema: '#18212F',
  corFundo: '#F4EBDD',
} as const

/** Mensagens prontas do WhatsApp, uma para cada botão do site. */
export const MENSAGENS = {
  padrao: 'Oi, Amanda! Vim pelo site e queria agendar uma avaliação.',
  tratamento: (nome: string) => `Oi, Amanda! Vim pelo site e queria saber mais sobre ${nome}.`,
  caminho: 'Oi, Amanda! Vim pelo site e queria confirmar um horário para ir até aí.',
} as const
