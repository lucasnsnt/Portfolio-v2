# Raw Cereal — referência técnica local

Esta pasta preserva snapshots do código público entregue pelo site do Raw Cereal ao navegador. Ela existe para permitir leitura real de estrutura, estilos, interações e dependências durante o desenvolvimento do Portfolio v2.

## Separação de responsabilidades

- `snapshot-*/original/`: material externo preservado sem edição.
- `snapshot-*/extracted/`: recortes mecânicos para facilitar a leitura.
- `snapshot-*/manifest.json`: URLs, data, tamanho e hash dos arquivos baixados.
- `docs/auditorias/raw-cereal-home.md`: interpretação técnica produzida para o projeto.
- `experiments/raw-cereal-hero-study/`: implementação original baseada nos princípios encontrados.

## Regra de uso

O snapshot é somente leitura e não participa do build. Nenhum arquivo desta pasta deve ser importado pela aplicação, copiado para `app/`, publicado ou tratado como asset do Portfolio v2.

Ao adaptar uma solução:

1. localizar o mecanismo no snapshot;
2. descrevê-lo na auditoria;
3. registrar o princípio que interessa;
4. reimplementar o comportamento com estrutura, nomes, conteúdo, composição e assets próprios;
5. comparar o resultado pelo comportamento, não por semelhança literal.

