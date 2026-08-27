# Base técnica

## Setup inicial

- React 19 com TypeScript.
- Vinext sobre Vite.
- Tailwind disponível, sem obrigação de usá-lo como fonte de decisões visuais.
- Configuração local compatível com Sites e Cloudflare.
- Nenhuma biblioteca de animação ou WebGL instalada nesta fase.

Essa base foi escolhida para iniciar o trabalho com rotas, componentes e experimentos sem herdar a arquitetura visual do portfólio antigo.

## Dependências experimentais

GSAP, Lenis, Three.js, React Three Fiber ou alternativas só devem ser adicionadas após um experimento demonstrar necessidade, custo e fallback.

## Segurança da cadeia de dependências

Na criação da base, `npm audit --omit=dev` reportou avisos de severidade alta na cadeia gerada de Next.js, PostCSS e Sharp. Parte dos avisos não possuía correção automática disponível na versão criada.

Antes de qualquer publicação:

1. Repetir a auditoria.
2. Verificar atualizações compatíveis do scaffold.
3. Confirmar se os caminhos vulneráveis são utilizados pelo projeto.
4. Não executar correções forçadas que alterem versões principais sem validação completa.

## Validação inicial

- Lint concluído.
- Build de produção concluído.
- Rota principal respondendo localmente.

A tela de fundação não representa o design final.
