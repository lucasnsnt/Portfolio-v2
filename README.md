# Portfolio v2 — Lucas Santos

Nova versão do portfólio pessoal e profissional de Lucas Santos.

O projeto integra apresentação comercial para clientes, aprofundamento técnico para recrutadores e um espaço experimental autoral. A direção é definida como um arquivo digital em movimento: jovem, pós-digital, material e funcional.

## Comece por aqui

Antes de alterar interface, conteúdo ou arquitetura, leia:

1. `docs/START-HERE.md`
2. `docs/DECISOES-ATIVAS.md`
3. O documento específico da área que será modificada em `docs/planejamento/`
4. `AGENTS.md`

## Estado atual

- Base técnica e documentação de planejamento consolidadas.
- Portfólio anterior e Raw Cereal auditados como fontes de princípios e mecânicas.
- Loading anterior adaptado e integrado à nova abertura.
- Homepage real implementada com navegação, hero horizontal, posicionamento, mídias em movimento e início da seção de serviços.
- Adaptações iniciais para mobile e movimento reduzido implementadas.
- Próximo corte: conteúdo real e entrada de `Selected Work`.

## Áreas de trabalho

- `app/`: rotas, layout e estilos globais.
- `components/portfolio/`: implementação principal da experiência do portfólio.
- `components/`: componentes compartilhados, incluindo o loading de entrada.
- `content/`: textos, metadados e estrutura bilíngue.
- `experiments/`: somente protótipos isolados que ainda não foram promovidos ao produto.
- `public/assets/`: fotografia, mídia, texturas e fallbacks aprovados.
- `tests/`: verificações de comportamento, acessibilidade e visual.
- `docs/`: direção, decisões, auditorias e processo.

## Projeto anterior

O portfólio atual permanece em `../Portfolio`. Ele é uma fonte de auditoria, especialmente para a animação de entrada e a solução bilíngue, e não deve ser modificado durante o desenvolvimento da versão 2.

## Comandos principais

- `npm run dev`: ambiente de desenvolvimento.
- `npm run build`: compilação de produção.
- `npm run lint`: análise estática.
- `npm run check`: lint e build em sequência.
