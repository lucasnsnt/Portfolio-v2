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

## Estado atual

- O código do portfólio anterior e sua animação de entrada foram auditados.
- O comportamento público do Raw Cereal foi analisado e documentado sem transformar a referência em template.
- O loading antigo foi adaptado para introduzir `SOFTWARE DEVELOPER`.
- A mecânica horizontal de abertura foi validada, ganhou conteúdo profissional e foi promovida para a homepage real.
- A abertura atual apresenta posicionamento, serviços iniciais e CTA provisório de contato.
- As imagens pessoais de referência já participam da composição, mas a seleção de fotografia final continua pendente.

## Próxima etapa

1. Revisar o conteúdo real da hero e da seção de serviços.
2. Definir a entrada de `Selected Work` e os primeiros projetos que serão apresentados.
3. Substituir o CTA provisório pela URL profissional definitiva do WhatsApp.
4. Calibrar tipografia, fotografia, ritmo e legibilidade em desktop e mobile.
5. Validar a passagem do loading para a hero e da hero para o conteúdo seguinte.

## Primeiro corte vertical

- Navegação principal: implementada, ainda sujeita a refinamento de conteúdo.
- Loading baseado na animação antiga: implementado.
- Hero com posicionamento e mecânica principal: implementada como base real.
- Primeira entrada de `Selected Work`: próxima entrega estrutural.
- Versão mobile correspondente: existe como adaptação inicial e precisa de validação real.
- Fallback com movimento reduzido: implementado na abertura.

O corte só avança para o restante da homepage após validação pelos critérios do documento 07.
