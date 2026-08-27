# Comece aqui — mapa do projeto

## O que estamos construindo

Um único portfólio para Lucas Santos capaz de:

- Vender serviços freelance, começando por landing pages sem limitar outros trabalhos.
- Demonstrar capacidade técnica e projetos para recrutadores.
- Apresentar experimentos visuais e tecnológicos de maneira organizada.
- Converter interesse em conversa profissional pelo WhatsApp.

O conceito é **arquivo digital em movimento**: estrutura precisa sob uma camada visual pós-digital, material, jovem e humana.

## Como usar a documentação

Os documentos não são capítulos intercambiáveis. Cada um responde a um tipo de decisão.

| Documento | Responsabilidade | Consultar quando |
|---|---|---|
| 01 — Direção criativa | Objetivo, público, posicionamento e personalidade | A solução parece correta, mas sem propósito claro |
| 02 — Matriz de referências | O que absorver e evitar em cada referência | Uma seção precisa de repertório ou corre risco de copiar |
| 03 — Linguagem visual | Paleta, tipografia, textura, fotografia, grid e mídia | Criar ou revisar a aparência |
| 04 — Linguagem de movimento | Motivos, intensidade, loading, transições e adaptação | Animar ou criar interação |
| 05 — Estrutura e conteúdo | Seções, páginas, percursos e função editorial | Alterar arquitetura ou conteúdo |
| 06 — Anti-padrões | Diagnóstico de escolhas automáticas ou genéricas | Auditar proposta ou saída de IA |
| 07 — Critérios de aprovação | Portões de clareza, identidade, mobile, desempenho e qualidade | Decidir se algo está pronto |

Os originais estão preservados em `docs/planejamento/` com suas pastas e nomes.

Para decisões sobre stack, dependências e publicação, consulte `docs/BASE-TECNICA.md`.

## Ordem recomendada por tipo de tarefa

### Criar uma seção

```text
05 função e conteúdo
→ 02 referência aplicável
→ 03 composição visual
→ 04 movimento
→ 06 auditoria anti-genérico
→ 07 aprovação
```

### Criar um efeito

```text
04 função do movimento
→ experimento isolado
→ 03 integração visual
→ mobile e fallback
→ 07 aprovação
```

### Escrever conteúdo

```text
01 posicionamento
→ 05 função da seção
→ voz real de Lucas
→ 06 revisão anti-IA
→ verificação factual
```

## Hierarquia das referências

- Raw Cereal: ritmo, apresentação de projetos e postura de estúdio.
- Dennis Snellenberg: clareza profissional e conversão.
- Ivor Studios: organização entre trabalhos e experimentos.
- Tonami Komuro: matéria digital, distorção e técnica.
- Sania: colagem e assimetria.
- Aristide Benoist: escala e refinamento.
- Yannick Gregoire: metadados e linguagem de sistema.
- Imagens pessoais: paleta, textura e atmosfera próprias.

## Próxima etapa

1. Auditar o código completo de `../Portfolio`.
2. Isolar e compreender a animação de entrada atual.
3. Auditar comportamento e implementação pública do Raw Cereal e referências prioritárias.
4. Escolher fontes e calibrar tokens com assets reais.
5. Criar experimentos isolados para loading, textura e revelação.
6. Construir o primeiro corte vertical.

## Definição do primeiro corte vertical

- Navegação principal.
- Loading baseado na animação antiga.
- Hero com posicionamento claro.
- Primeira entrada de Selected Work.
- Versão mobile correspondente.
- Fallback com movimento reduzido.

O corte só avança para o restante da homepage após validação pelos critérios do documento 07.
