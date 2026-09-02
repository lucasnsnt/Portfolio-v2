# Regras permanentes — Portfolio v2

## Antes de alterar

1. Leia `docs/START-HERE.md`.
2. Consulte somente os documentos que ele indica para a área da tarefa.
3. Leia `docs/DECISOES-ATIVAS.md` apenas quando a tarefa puder mudar produto, identidade, arquitetura ou comportamento aprovado.

Não carregue todo `docs/planejamento/` por padrão.

## Regras essenciais

- `../Portfolio` e `references/` são somente leitura.
- Referências fornecem princípios; não copie identidade, assets, páginas ou código proprietário.
- Use português como idioma principal e mantenha compatibilidade com inglês.
- Não invente clientes, métricas, resultados, projetos ou depoimentos.
- Não instale animação ou WebGL sem experimento e justificativa.
- Interações essenciais devem funcionar em mobile, teclado e movimento reduzido.
- Trabalhe por cortes verticais pequenos; efeitos complexos começam em `experiments/`.
- Registre apenas decisões novas e duráveis em `docs/DECISOES-ATIVAS.md`.
- Antes de concluir implementação: execute `npm run check` e inspecione uma renderização desktop e mobile.

## Estado resumido

- `app/page.tsx` usa a experiência real em `components/portfolio/`.
- A abertura horizontal, o loading adaptado, Serviços e Selected Work já integram a homepage.
- A próxima evolução deve priorizar conteúdo real, fotografia final e refinamento de transições.
