# Sisters Bela Beauty

Site de uma página do Sisters Bela Beauty, salão de beleza feminina
(Rua Alfredo Moreira Pinto, 338, Itaim Paulista, São Paulo).

React 19, TypeScript 5.9, Vite 6.4, Tailwind 4.3, Motion 12 e Lenis 1.3 (versões fixas no package.json).
Fontes Bodoni Moda (títulos) e Instrument Sans (texto), servidas pelo próprio site.
Imagens em AVIF com reserva em WebP. O único serviço externo é o mapa do Google, na seção "Onde fica".

## Rodar

Requisito: Node.js 20 ou superior.

```bash
npm ci
npm run dev      # http://localhost:4173
npm run build    # gera a pasta dist/
npm run check    # confere os tipos (opcional)
```

## Publicar na Vercel

Importe o repositório na Vercel. Framework: Vite. Build: `npm run build`. Saída: `dist`.
Não precisa de variável de ambiente: o endereço usado nas tags de compartilhamento vem do domínio de
produção do projeto na Vercel. Com domínio próprio, defina `VITE_SITE_URL`
(ex.: `https://sistersbelabeauty.com.br`) nas variáveis do projeto e publique de novo.

**Aparecer no Google:** o site sai com `indexar: false` em `src/config/site.ts`, ou seja, pede aos buscadores
para não listar a página (bom enquanto é uma prévia). Na hora de publicar de vez, troque para `indexar: true`.

## Onde mudar cada coisa

| O quê | Arquivo |
| --- | --- |
| WhatsApp, Instagram, endereço, horário, nota do Google | `src/config/site.ts` |
| Mensagens prontas do WhatsApp | `src/config/site.ts` (`MENSAGENS`) |
| Textos de todas as seções | `src/content/textos.ts` |
| Lista de serviços (nomes e explicações) | `src/content/servicos.ts` |
| Cores e fontes | `src/styles/tema.css` |
| Imagens (topo, cabelos, logotipo em papel) | `public/` e `src/config/imagens.ts` |

Todos os botões abrem o WhatsApp com uma mensagem pronta. Na lista de serviços, a mensagem já vai com o
nome do serviço.

## O que tem no site

Abertura (peça de motion) → topo com o logotipo na parede → fita dos serviços → o jeito do salão →
serviços → cabelos (carrossel) → como funciona → avaliações → onde fica → convite final → rodapé.
Balão do WhatsApp sempre visível.

**Abertura**: num papel claro, o logotipo se monta. O arco fino é a barra de carregamento de verdade, o
monograma é contornado e preenchido, o ramo cresce e solta as folhas, o nome entra letra por letra e o
coração fecha com um quique. Depois o logotipo voa até o lugar exato do relevo na parede e o papel sobe como
uma cortina. Na 1ª visita dura cerca de 5 s; ao voltar na mesma sessão, uma versão curta; com "reduzir
movimento" ligado no aparelho, não há abertura.

**Topo**: a arte já traz o logotipo, e ele nunca é cortado. No computador a arte ocupa a largura toda, com o
logotipo à direita e o texto no lado livre; se a janela for larga demais para a altura, a arte encolhe em vez
de cortar. No celular, o logotipo fica inteiro no alto e o texto embaixo. Uma luz quente acompanha o mouse.

**Fita**: os serviços correm sozinhos, aceleram com a rolagem e invertem o sentido quando a pessoa rola para cima.

**O jeito do salão**: as palavras acendem uma a uma conforme a rolagem.

**Serviços**: lista em quatro grupos, que abre um item por vez, com a explicação e o atalho para perguntar no WhatsApp.

**Cabelos**: carrossel que anda sozinho, sem fim. Acelera com a rolagem, para com calma quando o mouse passa
por cima e pode ser arrastado com o dedo ou com o mouse. Com "reduzir movimento", vira uma fila que a pessoa rola.

**Como funciona**: três passos; um fio rosé corre por eles com a rolagem e cada passo acende quando o fio chega.

**Avaliações**: a nota conta até 5,0 e as estrelas acendem uma a uma. O botão abre a ficha do salão no Google.

**Onde fica**: endereço, horário com "aberto agora" calculado no fuso de São Paulo e o mapa.

**Convite final**: o logotipo gravado em papel, como um cartão que inclina com o mouse e ganha reflexo,
com uma sombra de folhas balançando ao fundo.

O rodapé tem o botão "Pausar movimento".

## Trocar as fotos do carrossel

As fotos ficam em `public/cabelos/`, numeradas (`01-720`, `02-720`…), com 720 px de largura,
proporção 4:5, em dois formatos (`.avif` e `.webp`). A lista, com a descrição de cada foto, está em
`CABELOS`, no fim de `src/config/imagens.ts`. Para pôr mais fotos, salve os dois arquivos e acrescente uma linha.

## Trocar as artes do topo

As artes ficam em `public/hero/`: `desktop-1672` e `desktop-1100` (16:9) e `mobile-941` e `mobile-640` (9:16),
cada uma em `.avif` e `.webp`. Para trocar por versões maiores, salve com os mesmos nomes ou ajuste os nomes e
tamanhos em `src/config/imagens.ts`.

A abertura pousa o desenho em cima do relevo usando a posição de cada parte do logotipo dentro de cada arte.
Essas posições estão em `ALVOS`, no fim de `src/components/abertura/marca.ts`. Se a nova arte tiver o logotipo
em outro lugar ou tamanho, esses números e as medidas do topo em `src/styles/secoes.css` precisam ser refeitos.

## Arquivos

Menos de 100 arquivos no total (sem contar `node_modules` e `dist`).
