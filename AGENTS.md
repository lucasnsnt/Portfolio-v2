# Instruções permanentes do Portfolio v2

## Leitura obrigatória

Antes de agir:

1. Leia `docs/START-HERE.md` por completo.
2. Leia `docs/DECISOES-ATIVAS.md`.
3. Leia integralmente o documento responsável pela área alterada em `docs/planejamento/`.
4. Consulte `docs/WORKFLOW-IA.md` para a ordem de execução e validação.

Não substitua a leitura dos documentos por uma síntese genérica.

## Fontes de verdade

- Direção e posicionamento: documento 01.
- Uso das referências: documento 02.
- Cor, tipografia, textura, imagem e composição: documento 03.
- Animação, scroll, cursor e adaptação: documento 04.
- Arquitetura, conteúdo e percursos: documento 05.
- Diagnóstico de decisões genéricas: documento 06.
- Aprovação e qualidade: documento 07.

Cada documento mantém sua responsabilidade. Não duplique decisões entre eles sem necessidade.

## Regras do projeto

- O portfólio antigo em `../Portfolio` é somente leitura até uma tarefa autorizar alterações nele.
- Reaproveite código antigo somente depois de documentar o que será preservado e por quê.
- Referências fornecem princípios; não copie páginas, assets, identidade ou código proprietário.
- Snapshots em `references/` são fontes externas somente leitura: podem ser estudados e recortados para auditoria, mas nunca importados pelo produto ou usados como dependência do build.
- Raw Cereal é a principal referência de ritmo e apresentação, não um template.
- Use português como idioma principal e mantenha arquitetura compatível com inglês.
- Classifique projetos reais, conceituais, acadêmicos e experimentais com transparência.
- Não crie métricas, clientes, resultados ou depoimentos fictícios.
- Não instale bibliotecas de animação ou WebGL antes de um experimento justificar a dependência.
- Toda interação essencial deve funcionar em mobile, teclado e movimento reduzido.
- Preserve o estilo experimental por adaptação, não por remoção indiscriminada.

## Processo de implementação

- Trabalhe por cortes verticais pequenos.
- Prototipe efeitos complexos em `experiments/`.
- Registre decisões novas em `docs/DECISOES-ATIVAS.md`.
- Valide a função da seção antes do acabamento.
- Compare desktop, mobile e fallback.
- Execute `npm run check` antes de declarar uma entrega concluída.
- Não declare qualidade visual sem inspecionar uma renderização real.

## Estado atual da execução

- A fundação inicial foi substituída pela primeira execução real do portfólio.
- A homepage em `app/page.tsx` combina o loading adaptado do portfólio anterior com a experiência principal em `components/portfolio/`.
- A mecânica horizontal inspirada conceitualmente no Raw Cereal foi aprovada como base da abertura, sem importar código ou identidade da referência.
- A antiga rota `/experiments/raw-cereal-hero` existe apenas como compatibilidade temporária de preview e renderiza a mesma implementação real.
- O próximo corte deve consolidar conteúdo, fotografia e transição para `Selected Work`, preservando mobile, movimento reduzido e clareza comercial.
