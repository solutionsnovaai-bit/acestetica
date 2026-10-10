import { useState } from 'react'
import { ArrowUpRight, Plus } from 'lucide-react'
import { SERVICOS } from '../../content/textos'
import { GRUPOS } from '../../content/servicos'
import { MENSAGENS } from '../../config/site'
import { waLink } from '../../lib/whatsapp'
import Revelar, { Titulo } from '../ui/Revelar'

/**
 * Os serviços, em lista. Tocar num nome abre a explicação e o atalho para perguntar no WhatsApp
 * (a mensagem já vai com o nome do serviço). Só um fica aberto por vez.
 */
export default function Servicos() {
  const [aberto, setAberto] = useState<string | null>(GRUPOS[0].itens[0].nome)
  return <section id="servicos" className="servicos secao fundo-petala papel" aria-labelledby="servicos-titulo">
    <div className="conteiner servicos-grade">
      <div className="servicos-cabeca">
        <Titulo id="servicos-titulo" className="titulo" linhas={SERVICOS.titulo} />
        <Revelar delay={.1}><p className="lead">{SERVICOS.texto}</p></Revelar>
      </div>
      <div className="servicos-lista">
        {GRUPOS.map(g => <div key={g.id} className="servicos-grupo">
          <Revelar><h3 className="servicos-grupo-nome">{g.titulo}</h3></Revelar>
          <ul>
            {g.itens.map((t, i) => {
              const ativo = aberto === t.nome
              const id = `servico-${g.id}-${i}`
              return <Revelar as="li" key={t.nome} delay={i * .06} y={18} className={`servico ${ativo ? 'is-aberto' : ''}`}>
                <h4>
                  <button type="button" className="servico-botao" aria-expanded={ativo} aria-controls={id} onClick={() => setAberto(ativo ? null : t.nome)}>
                    <span className="servico-nome">{t.nome}</span>
                    <span className="servico-sinal" aria-hidden="true"><Plus strokeWidth={1.5} /></span>
                  </button>
                </h4>
                <div id={id} className="servico-painel" role="region" aria-label={t.nome} inert={!ativo}>
                  <div>
                    <p>{t.texto}</p>
                    <a className="link-linha servico-link" href={waLink(MENSAGENS.servico(t.frase))} target="_blank" rel="noopener noreferrer">
                      {SERVICOS.perguntar} {t.frase}<ArrowUpRight aria-hidden="true" strokeWidth={2} />
                      <span className="sr-only"> (abre o WhatsApp em nova aba)</span>
                    </a>
                  </div>
                </div>
              </Revelar>
            })}
          </ul>
        </div>)}
      </div>
    </div>
  </section>
}
