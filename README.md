# AC Estética

Site de uma página da AC Estética (Rua Colonial das Missões, 445, Itaquera, São Paulo).

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
Não precisa de variável de ambiente. Com domínio próprio, defina `VITE_SITE_URL`
(ex.: `https://acestetica.com.br`) nas variáveis do projeto e publique de novo.

**Aparecer no Google:** o site sai com `indexar: false` em `src/config/site.ts`, ou seja, pede aos buscadores
para não listar a página (bom enquanto é uma prévia). Na hora de publicar de vez, troque para `indexar: true`.

## Onde mudar cada coisa

| O quê | Arquivo |
| --- | --- |
| WhatsApp, Instagram, endereço, horário, nota do Google | `src/config/site.ts` |
| Mensagens prontas do WhatsApp | `src/config/site.ts` (`MENSAGENS`) |
| Textos de todas as seções | `src/content/textos.ts` |
| Lista de tratamentos (nomes e explicações) | `src/content/tratamentos.ts` |
| Cores e fontes | `src/styles/tema.css` |
| Imagens (topo, retrato, logotipo em papel) | `public/` e `src/config/imagens.ts` |

Todos os botões abrem o WhatsApp com uma mensagem pronta. Na lista de tratamentos, a mensagem já vai com o
nome do tratamento.

## O que tem no site

Abertura (peça de motion) → topo com o letreiro na parede → fita dos cuidados → o jeito de atender →
tratamentos → como funciona → a Amanda → avaliações → onde fica → convite final → rodapé.
Balão do WhatsApp sempre visível.

**Abertura**: no azul-marinho da assinatura, um traço de ouro desenha o logotipo (o rosto, o A, o C e depois o
letreiro, letra por letra) enquanto o contador acompanha o carregamento de verdade. A luz abre a partir do
monograma, revela a parede, e o desenho voa e pousa em cima do letreiro de metal. Na 1ª visita dura cerca de
4,5 s; ao voltar na mesma sessão, uma versão curta; com "reduzir movimento" ligado no aparelho, não há abertura.

**Topo**: a arte já traz o logotipo, e ele nunca é cortado. No computador a arte ocupa a largura toda, com o
letreiro à direita e o texto no lado livre; se a janela for larga demais para a altura, a arte encolhe em vez
de cortar. No celular, o letreiro fica inteiro no alto e o texto embaixo. Uma luz quente acompanha o mouse.

**Fita**: os cuidados correm sozinhos, aceleram com a rolagem e invertem o sentido quando a pessoa rola para cima.

**O jeito de atender**: as palavras acendem uma a uma conforme a rolagem.

**Tratamentos**: lista que abre um item por vez, com a explicação e o atalho para perguntar no WhatsApp.

**Como funciona**: três passos; um fio de ouro corre por eles com a rolagem e cada passo acende quando o fio chega.

**A Amanda**: o retrato num arco, que se abre como cortina, com o monograma sendo desenhado atrás conforme a rolagem.

**Avaliações**: a nota conta até 5,0 e as estrelas acendem uma a uma. O botão abre a ficha da clínica no Google.

**Onde fica**: endereço, horário com "aberto agora" calculado no fuso de São Paulo e o mapa.

**Convite final**: o logotipo em ouro sobre papel, como um cartão que inclina com o mouse e ganha reflexo,
com a sombra de palmeira balançando ao fundo.

O rodapé tem o botão "Pausar movimento".

## Trocar as artes do topo

As artes ficam em `public/hero/`: `desktop-1672` e `desktop-1100` (16:9) e `mobile-941` e `mobile-640` (9:16),
cada uma em `.avif` e `.webp`. Para trocar por versões maiores, salve com os mesmos nomes ou ajuste os nomes e
tamanhos em `src/config/imagens.ts`.

A abertura pousa o desenho em cima do letreiro usando a posição do logotipo dentro de cada arte. Essas posições
estão em `ALVOS`, no fim de `src/components/abertura/tracos.ts` (x, y, largura e altura, em pixels da arte).
Se a nova arte tiver o logotipo em outro lugar ou tamanho, atualize esses números.

## Arquivos

Menos de 100 arquivos no total (sem contar `node_modules` e `dist`).
