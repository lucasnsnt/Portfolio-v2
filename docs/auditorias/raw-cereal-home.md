# Auditoria inicial — Raw Cereal / homepage

Data da leitura: 27 de agosto de 2026  
Fonte pública: https://www.rawcereal.com/

Snapshot técnico local: `references/raw-cereal/snapshot-home-2026-08-27/`

## Escopo

Esta auditoria observa apenas o HTML, CSS, JavaScript e o comportamento entregues publicamente ao navegador. Ela não autoriza copiar código, mídia, textos, composição ou identidade do Raw Cereal.

O snapshot preserva o HTML integral, o CSS principal, os três bundles do Webflow, jQuery, GSAP, Finsweet, o loader de analytics diretamente referenciado e todos os scripts e estilos inline. Cada arquivo original possui URL, tamanho e hash registrados em `manifest.json`. As 138 URLs de mídia e recursos encontrados foram indexadas, mas as imagens e os vídeos não foram espelhados.

## O mecanismo principal

A abertura usa um scroll vertical para conduzir uma passagem horizontal entre dois capítulos de tela cheia:

```text
vídeo manifesto
→ frase vertical de transição
→ apresentação do estúdio + carrosséis de projetos
```

No desktop, a estrutura pública combina:

- uma trilha vertical de aproximadamente `200vw` de altura;
- uma câmera `sticky` de `100vh` com overflow oculto;
- um frame flex horizontal deslocado no eixo X conforme o scroll;
- primeira cena com `130vw`, seguida por um intervalo de `30vw`;
- segunda cena com `100vw`;
- texto de transição rotacionado entre os capítulos.

Em uma viewport observada de 1280 × 720, o frame percorreu aproximadamente:

- `0px` no início;
- `-650px` por volta de `700px` de scroll;
- `-1486px` por volta de `1600px` de scroll.

O gesto é grande, mas a informação de cada tela permanece estável. A experimentação está na passagem entre capítulos, não em animar cada elemento ao mesmo tempo.

## Base técnica pública

- Webflow para estrutura, estilos e interações.
- GSAP 3.6.1 em um marquee complementar.
- Um vídeo em autoplay, muted, loop e playsinline na cena inicial.
- Carrosséis de projetos construídos com imagens repetidas em faixas.
- Finsweet Scroll Disable para controle de scroll em estados específicos.
- Nenhum canvas, Three.js, Lenis, Locomotive Scroll ou Barba identificado na homepage pública.

Isso indica que a força da abertura vem sobretudo de composição, escala, mídia e transformação 2D — não de uma camada 3D obrigatória.

## Adaptação para o Portfolio v2

### Princípio absorvido

Uma primeira cena atmosférica conduz a uma segunda cena que explica com clareza quem trabalha, o que oferece e para onde o visitante deve seguir.

### Transformação própria

```text
matéria digital abstrata + sinal de sistema
→ transição tipográfica curta
→ Lucas Santos / Software Engineer / serviços / contato
```

- A cena inicial não usará a mídia do Raw Cereal; será feita com textura, fotografia própria ou composição abstrata da identidade NSNT.
- A paleta será quente, escura, creme e bronze.
- O texto e a grade serão próprios.
- O loading antigo desembocará na primeira cena, em vez de existir como uma introdução desconectada.
- A passagem horizontal será testada sem dependência adicional. GSAP só entra se a versão nativa não oferecer controle suficiente.
- A versão mobile será vertical e direta, preservando o corte visual sem prender o scroll.

## Hipótese do primeiro experimento

Uma transição horizontal curta, controlada pelo scroll vertical, pode entregar o impacto do Raw Cereal e ao mesmo tempo melhorar nossa clareza comercial se:

- a segunda cena já contiver nome, título, oferta e direção de contato;
- o deslocamento não ultrapassar dois capítulos;
- o conteúdo continuar disponível com movimento reduzido;
- mobile não reproduzir literalmente a câmera sticky horizontal;
- a textura e a tipografia criarem uma assinatura própria.

## O que ainda precisa ser medido

- duração percebida e resistência do scroll em diferentes alturas de viewport;
- ponto exato em que o loading entrega o controle à hero;
- comportamento do experimento em mobile real;
- custo de fotografia, vídeo ou textura animada próprios;
- legibilidade da oferta durante e depois da transição;
- se a passagem deve terminar já mostrando a primeira entrada de Selected Work.
