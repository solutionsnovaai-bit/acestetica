/*
  Lista de tratamentos. Para incluir, tirar ou reescrever um cuidado, mexa só aqui.
  "nome" aparece na lista; "frase" entra na mensagem do WhatsApp ("queria saber mais sobre …").
*/

export type Tratamento = { nome: string; frase: string; texto: string }

export const GRUPOS: readonly { id: string; titulo: string; itens: readonly Tratamento[] }[] = [
  {
    id: 'rosto',
    titulo: 'Rosto',
    itens: [
      {
        nome: 'Limpeza de pele',
        frase: 'a limpeza de pele',
        texto: 'Higienização profunda, extração cuidadosa e finalização para a pele sair limpa, macia e descansada.',
      },
      {
        nome: 'Peeling químico',
        frase: 'o peeling químico',
        texto: 'Renovação da pele em sessões planejadas. O ativo e a intensidade são definidos na avaliação.',
      },
      {
        nome: 'Manchas e melasma',
        frase: 'o cuidado com manchas e melasma',
        texto: 'Acompanhamento para uniformizar o tom da pele, com expectativas claras desde a primeira conversa.',
      },
      {
        nome: 'Protocolo facial',
        frase: 'um protocolo facial personalizado',
        texto: 'Quando a pele pede mais de um cuidado, a Amanda combina os procedimentos num plano só.',
      },
    ],
  },
  {
    id: 'corpo',
    titulo: 'Corpo',
    itens: [
      {
        nome: 'Massagem',
        frase: 'a massagem',
        texto: 'Sessões para relaxar e cuidar do corpo, com a mesma atenção do atendimento facial.',
      },
      {
        nome: 'Protocolo corporal',
        frase: 'um protocolo corporal personalizado',
        texto: 'Plano montado na avaliação, de acordo com o seu objetivo e a sua rotina.',
      },
    ],
  },
]
