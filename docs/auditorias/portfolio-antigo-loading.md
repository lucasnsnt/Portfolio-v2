# Auditoria — animação do portfólio anterior

## Origem

- Componente: `../Portfolio/src/components/HeroSection.jsx`
- Estilos: `../Portfolio/src/styles/hero.css`
- Responsividade: `../Portfolio/src/styles/responsive.css`
- Fontes: `../Portfolio/public/fonts/`

O projeto anterior não foi modificado.

## Gesto original

1. A expressão cursiva “web developer” começa grande e visível.
2. Ela diminui e recua para o fundo.
3. “LUCAS / SANTOS” entra com deslocamento vertical e distorção orgânica.
4. A descrição profissional aparece depois do nome.

A implementação original utiliza CSS e um filtro SVG com turbulência e displacement map. Não depende de biblioteca de animação.

## Preservado

- Nome dividido em duas linhas.
- Contraste entre eco cursivo e bloco tipográfico pesado.
- Distorção orgânica do nome.
- Entrada sequencial: eco, nome e informação.
- Fontes já pertencentes ao projeto anterior.

## Adaptado

- Fundo claro substituído pela paleta escura quente.
- O eco “web developer” foi atualizado para “software developer”, refletindo o novo posicionamento.
- Composição central simétrica substituída por um bloco assimétrico.
- “SANTOS” passa a usar contorno para criar contraste material.
- Duração reduzida para aproximadamente 1,3 a 2,2 segundos conforme o carregamento real.
- Tagline final substituída por estados discretos de preparação.
- Saída integrada à revelação da página.
- Versão mobile reduz escala e remove metadados secundários.
- Movimento reduzido usa apenas uma transição curta de opacidade.

## Relação com carregamento real

O loading aguarda:

- Evento de carregamento da janela.
- Fontes essenciais disponíveis.
- Duração mínima para evitar um flash incompreensível.
- Tempo máximo para impedir bloqueio indefinido.

A página já existe e permanece funcional abaixo do overlay. Recursos pesados futuros deverão continuar carregando progressivamente depois da saída.

## Pendências

- Reavaliar o texto do eco apenas se o título profissional definitivo mudar.
- Definir comportamento de visitas recorrentes.
- Integrar o loading ao hero definitivo para que a saída pareça contínua.
- Medir o tempo com os assets reais do primeiro viewport.
