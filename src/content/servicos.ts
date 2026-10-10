/*
  Lista de serviços. Para incluir, tirar ou reescrever um serviço, mexa só aqui.
  "nome" aparece na lista; "frase" entra na mensagem do WhatsApp ("queria saber mais sobre …").
*/

export type Servico = { nome: string; frase: string; texto: string }

export const GRUPOS: readonly { id: string; titulo: string; itens: readonly Servico[] }[] = [
  {
    id: 'cabelo',
    titulo: 'Cabelo',
    itens: [
      { nome: 'Corte', frase: 'o corte', texto: 'Do acerto das pontas à mudança de visual, conversado antes de a tesoura entrar.' },
      { nome: 'Coloração', frase: 'a coloração', texto: 'Do tom inteiro às mechas e aos loiros, com a cor escolhida junto com você.' },
      { nome: 'Escova', frase: 'a escova', texto: 'Lisa ou modelada, para o dia a dia ou para uma ocasião especial.' },
      { nome: 'Hidratação capilar', frase: 'a hidratação capilar', texto: 'Tratamento para devolver maciez e brilho aos fios.' },
      { nome: 'Progressiva', frase: 'a progressiva', texto: 'Alinhamento dos fios para reduzir o volume e o frizz.' },
      { nome: 'Botox capilar', frase: 'o botox capilar', texto: 'Tratamento de reposição para fios ressecados ou com frizz.' },
    ],
  },
  {
    id: 'olhar',
    titulo: 'Olhar e lábios',
    itens: [
      { nome: 'Cílios', frase: 'os cílios', texto: 'Extensão de cílios para destacar o olhar.' },
      { nome: 'Design de sobrancelhas', frase: 'o design de sobrancelhas', texto: 'O desenho pensado para o formato do seu rosto.' },
      { nome: 'Micropigmentação de sobrancelhas', frase: 'a micropigmentação de sobrancelhas', texto: 'Preenchimento das falhas com um desenho que dura mais.' },
      { nome: 'Micropigmentação labial', frase: 'a micropigmentação labial', texto: 'Cor e contorno para os lábios.' },
    ],
  },
  {
    id: 'estetica',
    titulo: 'Rosto e corpo',
    itens: [
      { nome: 'Limpeza de pele', frase: 'a limpeza de pele', texto: 'Higienização profunda e extração cuidadosa.' },
      { nome: 'Botox facial', frase: 'o botox facial', texto: 'Para suavizar as linhas de expressão. A indicação é conversada antes.' },
      { nome: 'Estética para emagrecimento', frase: 'os procedimentos estéticos para emagrecimento', texto: 'Procedimentos corporais indicados de acordo com o seu objetivo.' },
      { nome: 'Drenagem', frase: 'a drenagem', texto: 'Massagem de movimentos suaves para aliviar o inchaço.' },
      { nome: 'Massagem relaxante', frase: 'a massagem relaxante', texto: 'Uma pausa para soltar a tensão do corpo.' },
      { nome: 'Depilação', frase: 'a depilação', texto: 'Para o rosto e para o corpo.' },
    ],
  },
  {
    id: 'maos',
    titulo: 'Mãos e pés',
    itens: [
      { nome: 'Manicure e pedicure', frase: 'a manicure e pedicure', texto: 'Unhas cuidadas e esmaltadas com capricho.' },
      { nome: 'Escalda-pés', frase: 'o escalda-pés', texto: 'Um momento de relaxamento para os pés cansados.' },
    ],
  },
]
