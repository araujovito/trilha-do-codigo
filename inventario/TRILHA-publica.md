# Trilha de aprendizado (versão pública)

Gerado por `jogo/gerar-dados.mjs`. Traz só as paradas cujo trecho e cuja pergunta vêm de projetos públicos; a numeração original foi mantida, por isso há saltos.

---

## Parada 1. Terminal: dar ordens por texto

**Pré-requisitos:** nenhum

**Explicação:** O terminal é uma janela onde você digita ordens em vez de clicar, como mandar um recado escrito para um funcionário em vez de apontar com o dedo. Cada linha é um comando; o computador executa e responde com texto. No trecho, um arquivo de receitas (Makefile) guarda um comando chamado `checar-token`, que confere se uma variável existe e, se não existir, escreve um aviso e para (`exit 1`).

**No seu projeto:** `fundo-eleitoral-br/Makefile:20-25`

```make
checar-token:
	@test -n "$$HF_TOKEN" || { \
	  echo "HF_TOKEN ausente. O segredo do Codespaces so e injetado quando a"; \
	  echo "maquina inicia -- pare e reabra o codespace, ou confira se o segredo"; \
	  echo "tem acesso a este repositorio em github.com/settings/codespaces."; \
	  exit 1; }
```

**Pergunta de entrevista:** (fundo-eleitoral-br) "Por que a publicação no Hugging Face é uma etapa do `make tudo` e não um passo manual?"

- a) Porque o Hugging Face só aceita envio automatizado.
- b) Porque, se for um passo manual e opcional, alguém roda a ingestão, fecha a aba e perde o resultado. **(correta)**
- c) Porque a publicação manual deixaria o dataset mais lento para baixar.

**Fonte do motivo:** `fundo-eleitoral-br/docs/decisoes.md:132` — "Se publicar for um passo manual e opcional, mais cedo ou mais tarde alguém — provavelmente eu mesmo — vai rodar a ingestão, fechar a aba e perder o resultado."

**Seguimento provável:** "E o que essa escolha custa?"

**Como responder o seguimento:** não documentado — prepare sua resposta

**Onde estudar:** PT-BR: free-programming-books/courses/free-courses-pt_BR.md L516 (Shell), L320 (Linux). EN: freeCodeCamp/curriculum/challenges/english/blocks/lecture-understanding-the-command-line-and-working-with-bash/

## Parada 2. Instalar ambiente e dependências

**Pré-requisitos:** 1

**Explicação:** Dependência é um programa de outra pessoa que o seu projeto usa, como a receita que pede "farinha pronta" em vez de moer o trigo. Cada linguagem tem um arquivo que lista o que precisa ser instalado, e uma ferramenta (pip, uv, npm, yarn, mvn) lê a lista e baixa tudo. No trecho, a lista está em `dependencies`, com a versão mínima de cada pacote.

**No seu projeto:** `fundo-eleitoral-br/pyproject.toml:6-11`

```toml
dependencies = [
    "duckdb>=1.1",
    "polars>=1.0",
    "pyarrow>=17",
    "curl_cffi>=0.7",
    "huggingface-hub>=0.25",
```

**Pergunta de entrevista:** (fundo-eleitoral-br) "Por que você usou DuckDB lendo Parquet em vez de um Postgres?"

- a) Porque o DuckDB aguenta mais usuários simultâneos que o Postgres.
- b) Porque o Hugging Face só entrega dados para o DuckDB.
- c) Porque um Postgres adicionaria container, migrations e credenciais para resolver um problema de concorrência de escrita que o projeto não tem. **(correta)**

**Fonte do motivo:** `fundo-eleitoral-br/docs/decisoes.md:40` — "Um Postgres aqui adicionaria container, migrations e credenciais para resolver um problema de concorrência de escrita que este projeto não tem."

**Seguimento provável:** "Em que situação você trocaria para um Postgres?"

**Como responder o seguimento:** Custo não documentado como custo; o ADR diz o que invalidaria a escolha: "precisar de escrita concorrente ou de servir as consultas para uma aplicação multiusuário".

**Onde estudar:** PT-BR: free-programming-books/books/free-programming-books-pt_BR.md L417 (Python). EN: freeCodeCamp/curriculum/structure/superblocks/python-v9.json (python-installation)

## Parada 3. Variáveis e constantes

**Pré-requisitos:** 1, 2

**Explicação:** Variável é uma caixa com etiqueta onde você guarda um valor para usar depois, como o número de telefone anotado na agenda com o nome da pessoa. Constante é uma caixa que não deve mudar; por convenção, o nome vai em maiúsculas. No trecho, `PISO_LEGAL` guarda o valor 30.0 e o resto do código usa o nome em vez de repetir o número.

**No seu projeto:** `fundo-eleitoral-br/src/fundo_eleitoral/analise.py:23-27`

```python
PISO_LEGAL = 30.0

# A cota regula a distribuicao feita PELO PARTIDO: FEFC vindo de outra
# candidatura ja foi contado no repasse original (ADR-009).
_so_direto = f"AND ds_origem_receita <> '{ORIGEM_REPASSE}'"
```

**Pergunta de entrevista:** (fundo-eleitoral-br) "Por que o cálculo de concentração exclui o repasse entre candidaturas?"

- a) Porque incluir o repasse sempre reduz o Gini, já que as transferências correm de quem recebeu muito para candidaturas menores. **(correta)**
- b) Porque o TSE não publica esse tipo de repasse.
- c) Porque os dados de repasse entre candidaturas não existem em 2018.

**Fonte do motivo:** `fundo-eleitoral-br/docs/decisoes.md:180-183` — "incluir o repasse sempre *reduz* o Gini, porque as transferências correm de quem recebeu muito para candidaturas menores."

**Seguimento provável:** "Há algo sobre esse resultado que você ainda não consegue explicar?"

**Como responder o seguimento:** Sim, e está registrado: "Observação sobre 2018 … Vale investigar se reflete mudança de regra entre ciclos ou apenas o FEFC menor daquele ano — não está respondido." (docs/decisoes.md, ADR-009).

**Onde estudar:** PT-BR: free-programming-books/books/free-programming-books-pt_BR.md L86 (Lógica de Programação para iniciantes); free-programming-books/courses/free-courses-pt_BR.md L401. EN: developer-roadmap/roadmaps/javascript/content/all-about-variables@kvActjpU4FUJdrmuFoFEe.md

## Parada 4. Tipos de dado (texto, inteiro, dinheiro em centavos)

**Pré-requisitos:** 3

**Explicação:** Todo valor tem um tipo, como a diferença entre uma palavra escrita, um número contado nos dedos e um valor com vírgula. O tipo diz o que dá para fazer com o valor: somar números, juntar textos. Dinheiro costuma ser guardado como número inteiro de centavos, porque números com vírgula acumulam erros pequenos de arredondamento. No trecho, `Money` é um inteiro de 64 bits que representa centavos.

**No seu projeto:** `mesa-de-credito/backend/internal/finance/schedule.go:26-30`

```go
// Money stores a monetary amount as integer cents.
type Money int64

// MonthlyRate is an exact non-negative monthly rate. A value of 0.01 means 1%.
// Numerator and denominator are stored by value so callers cannot mutate them.
```

**Pergunta de entrevista:** (liquidacao-pix) "Por que o dinheiro é guardado como inteiro em centavos e não como número decimal?"

- a) Porque o Postgres não tem tipo decimal.
- b) Para a conservação do dinheiro ser verificável e não haver erro de arredondamento. **(correta)**
- c) Porque inteiros ocupam menos espaço e deixam as consultas mais rápidas.

**Fonte do motivo:** `liquidacao-pix/MEMORIA_TECNICA.md:77` — "Conservação do dinheiro verificável; sem erro de arredondamento"

**Seguimento provável:** "E qual o custo dessa escolha?"

**Como responder o seguimento:** não documentado — prepare sua resposta

**Onde estudar:** PT-BR: free-programming-books/courses/free-courses-pt_BR.md L401. EN: developer-roadmap/roadmaps/javascript/content/data-types@-jbPPuEXacBR0d0CWPHgd.md; freeCodeCamp/curriculum/challenges/english/blocks/core-primitives-in-python/

## Parada 5. Condicionais (se/senão) e operadores

**Pré-requisitos:** 3, 4

**Explicação:** Condicional é uma bifurcação: se a condição for verdadeira, o programa segue por um caminho; senão, por outro, como "se chover, leve guarda-chuva". Os operadores comparam (`===`, `!`, `>`) ou combinam condições. No trecho, a função recusa a ação cedo (`return`) quando o jogo já acabou ou quando o tipo de ação não está na lista permitida.

**No seu projeto:** `thronfolge/src/simulacao.js:275-279`

```javascript
export function validarAcao(estado, acao) {
  const tipos = new Set(["aguardar", "conversar", "propor_amizade", "difamar",
    "pedir_apoio", "aceitar_pedido_apoio", "recusar_pedido_apoio"]);
  if (estado.encerrado) return { valida: false, motivo: "a escolha do rei já terminou" };
  if (!tipos.has(acao.tipo)) return { valida: false, motivo: "ação desconhecida" };
```

**Pergunta de entrevista:** (thronfolge) "Por que no jogo a eleição pelos grandes é o que faz rei, e a unção não é condição?"

- a) Porque a unção é difícil de simular com cinco poderes.
- b) Porque o motor de regras não consegue representar cerimônias.
- c) Porque a eleição é o passo que faz rei, e a unção não era obrigatória (Henrique I a recusou em 919). **(correta)**

**Fonte do motivo:** `thronfolge/RECADOS.md:51-55` — "a eleição é o passo que faz rei; a unção não era obrigatória (Henrique I a recusou em 919)."

**Seguimento provável:** "O que essa simplificação deixa de fora?"

**Como responder o seguimento:** não documentado — prepare sua resposta

**Onde estudar:** PT-BR: free-programming-books/courses/free-courses-pt_BR.md L401; L411 (Curso em Vídeo Python). EN: developer-roadmap/roadmaps/python/content/conditionals@NP1kjSk0ujU0Gx-ajNHlR.md; developer-roadmap/roadmaps/javascript/content/arithmetic-operators@0PK1NwlgkNe2Vf-We4uLH.md e comparison-operators@-v4_V4UuoZSgUk2sqOCim.md

## Parada 6. Listas e dicionários (arrays e objetos)

**Pré-requisitos:** 3, 4

**Explicação:** Lista é uma fila numerada de itens, como a lista de compras. Dicionário (objeto) é um conjunto de pares nome-valor, como uma ficha de cadastro com campos. No trecho, `estado` é um objeto: `turno` recebe 0, `eventos` recebe uma lista vazia `[]` e `ultima_mudanca_apoio` recebe um objeto vazio `{}`. O operador `??=` só preenche o campo se ele ainda não existir.

**No seu projeto:** `thronfolge/src/simulacao.js:9-16`

```javascript
export function criarEstado(configuracao) {
  const estado = copiar(configuracao);
  estado.turno ??= 0;
  estado.eventos ??= [];
  estado.eleito ??= null;
  estado.encerrado ??= null;
  estado.ultima_mudanca_apoio ??= {};
  estado.pedido_apoio_pendente ??= null;
```

**Pergunta de entrevista:** (thronfolge) "Por que cada personagem só pode mudar de apoio uma vez por mês?"

- a) Porque um grande trocava de lado várias vezes no mesmo mês sem custo, e a IA aceitava pedidos de apoio em nome do jogador. **(correta)**
- b) Para o jogo rodar mais rápido a cada turno.
- c) Porque as fontes históricas registram uma troca de lado por mês.

**Fonte do motivo:** `thronfolge commit 201ae5f` — "um grande trocava de lado várias vezes no mesmo mês sem custo, e a IA aceitava pedidos de apoio em nome do jogador."

**Seguimento provável:** "E qual o custo dessa regra?"

**Como responder o seguimento:** não documentado — prepare sua resposta

**Onde estudar:** PT-BR: free-programming-books/courses/free-courses-pt_BR.md L411. EN: developer-roadmap/roadmaps/python/content/lists@UT_SR7G-LYtzqooWrEtF1.md e dictionaries@bc9CL_HMT-R6nXO1eR-gP.md; freeCodeCamp/curriculum/challenges/english/blocks/dictionaries-and-loops/

## Parada 8. Funções (e funções puras)

**Pré-requisitos:** 3, 5, 6

**Explicação:** Função é uma receita com nome: recebe ingredientes (parâmetros), faz o preparo e entrega um prato (resultado). Depois é só chamar o nome. Uma função pura sempre devolve o mesmo resultado para os mesmos ingredientes e não mexe em nada fora dela. No trecho, `calcularPoder` conta quantos territórios a pessoa governa e devolve um objeto com territórios, soldados e ouro.

**No seu projeto:** `thronfolge/src/simulacao.js:132-142`

```javascript
export function calcularPoder(estado, pessoaId) {
  const pessoa = personagem(estado, pessoaId);
  const territorios = (estado.regioes ?? []).filter(
    (regiao) => regiao.governante === pessoaId,
  ).length;
  return {
    territorios,
    soldados: pessoa.soldados,
    ouro: pessoa.ouro,
  };
}
```

**Pergunta de entrevista:** (thronfolge) "Por que os recursos de 936 aparecem em faixas e não em números exatos?"

- a) Porque a interface não comporta números grandes.
- b) Para dar incerteza ao jogador sobre os recursos dos rivais.
- c) Porque as fontes de 955 e 981 só dão escala. **(correta)**

**Fonte do motivo:** `thronfolge/contexto.md:177-180` — "porque as fontes de 955 e 981 só dão escala" (é "Proposta do Claude" em "Decisões em aberto", contexto.md:172, não decisão confirmada)

**Seguimento provável:** "Que limitação dessas fontes você precisa reconhecer?"

**Como responder o seguimento:** "As duas fontes são posteriores a 936: dão escala, não valores. É uma proposta do Claude registrada em 'Decisões em aberto', ainda não confirmada por mim." (RECADOS.md:184; contexto.md:172)

**Onde estudar:** PT-BR: free-programming-books/books/free-programming-books-pt_BR.md L417 (Pense em Python). EN: developer-roadmap/roadmaps/python/content/functions-builtin-functions@-DJgS6l2qngfwurExlmmT.md; freeCodeCamp/curriculum/challenges/english/blocks/control-flow-and-functions-in-python/

## Parada 9. Strings e normalização de texto

**Pré-requisitos:** 4, 8

**Explicação:** String é texto. Para comparar textos escritos de jeitos diferentes, "Aquisição" e "aquisicao", primeiro se padroniza: tira acento, deixa minúsculas, tira espaços sobrando, como arrumar fichas de arquivo num padrão antes de ordenar. No trecho, `NFKD` separa a letra do acento, o laço descarta os acentos e a última linha troca espaços repetidos por um só.

**No seu projeto:** `contratinho/contratinho/filtro.py:57-59`

```python
    sem_acento = unicodedata.normalize("NFKD", texto)
    sem_acento = "".join(c for c in sem_acento if not unicodedata.combining(c))
    return re.sub(r"\s+", " ", sem_acento).strip().lower()
```

**Pergunta de entrevista:** (contratinho) "Por que os perfis têm uma lista de exclusão além dos termos de busca?"

- a) Porque, sem exclusão, a ferramenta devolve ruído, o usuário para de ler os avisos e ela vira enfeite. **(correta)**
- b) Porque a API do PNCP exige termos de exclusão na consulta.
- c) Para reduzir o custo de cada consulta ao PNCP.

**Fonte do motivo:** `contratinho/README.md:116-120` — "Sem exclusão a ferramenta devolve ruído, o usuário para de ler os avisos, e vira enfeite."

**Seguimento provável:** "E qual o custo dessa escolha?"

**Como responder o seguimento:** não documentado — prepare sua resposta

**Onde estudar:** EN: freeCodeCamp/curriculum/structure/superblocks/javascript-v9.json (javascript-variables-and-strings); developer-roadmap/roadmaps/python/content/basic-syntax@6xRncUs3_vxVbDur567QA.md. PT-BR: free-programming-books/courses/free-courses-pt_BR.md L411

## Parada 10. JSON

**Pré-requisitos:** 6

**Explicação:** JSON é um formato de texto para guardar e trocar dados: pares nome-valor entre chaves, listas entre colchetes, como uma ficha de cadastro que qualquer linguagem consegue ler. O trecho é um arquivo JSON inteiro: o `package.json`, que descreve o projeto (nome, tipo de módulo, comandos). Aspas duplas em todos os nomes e sem vírgula depois do último item.

**No seu projeto:** `thronfolge/package.json:1-9`

```json
{
  "name": "thronfolge",
  "private": true,
  "type": "module",
  "scripts": {
    "start": "node servidor.js",
    "test": "node --test"
  }
}
```

**Pergunta de entrevista:** (thronfolge) "Por que a simulação fica separada da interface e é testada com `node --test`?"

- a) Porque o navegador não consegue rodar a simulação.
- b) Porque a simulação não depende da interface, e o Node, que já está disponível, a testa sem precisar instalar um motor de jogo. **(correta)**
- c) Porque o framework do projeto obriga essa divisão.

**Fonte do motivo:** `thronfolge/contexto.md:99-102` — o ambiente já tem Node e não tem Godot; um mapa político estático não justifica instalar um motor antes de validar o núcleo

**Seguimento provável:** "E qual o custo dessa escolha?"

**Como responder o seguimento:** Não documentado — prepare sua resposta.

**Onde estudar:** EN: developer-roadmap/roadmaps/javascript/content/json@bFNvtHp97OzKnPJgr7WaH.md

## Parada 13. Erros e exceções (try/catch)

**Pré-requisitos:** 5, 8

**Explicação:** Exceção é o aviso que o programa levanta quando algo dá errado, como o alarme de incêndio. `try` tenta executar; `catch` (ou `except`) diz o que fazer se o alarme tocar, para o programa não cair. No trecho, `personagem(...)` lança erro se o autor não existir; o `catch` captura o erro e devolve `valida: false` com o motivo.

**No seu projeto:** `thronfolge/src/simulacao.js:280-284`

```javascript
  try {
    personagem(estado, acao.autor);
  } catch {
    return { valida: false, motivo: "autor inexistente" };
  }
```

**Pergunta de entrevista:** (hub-integracoes) "Por que uma dependência fora do ar vira erro 503 e nunca derruba o processo?"

- a) Porque o orquestrador não consegue reiniciar processos que caem.
- b) Porque o teste de resiliência mostrou os processos morrendo quando o PostgreSQL reiniciava (evento `error` não tratado). **(correta)**
- c) Porque o Fastify derruba o processo por padrão ao receber um 503.

**Fonte do motivo:** `hub-integracoes/docs/decisoes.md:87` — "o teste de resiliência mostrou os processos morrendo quando o PostgreSQL reiniciava (evento `error` não tratado)."

**Seguimento provável:** "Como você garante que isso continua valendo?"

**Como responder o seguimento:** Custo não documentado como limitação; a fonte registra a condição do teste: "o teste de resiliência falha se api ou relay reiniciarem, ou se algum pedido ficar sem resposta HTTP."

**Onde estudar:** EN: developer-roadmap/roadmaps/python/content/error-handling@4XqSkc3Tuub-ZVXvGfMIT.md; freeCodeCamp/curriculum/structure/superblocks/python-v9.json (python-error-handling)

## Parada 15. Classes, dataclasses e objetos imutáveis

**Pré-requisitos:** 6, 8

**Explicação:** Classe é um molde: define quais informações um tipo de coisa tem, como o formulário em branco de um cadastro. Cada objeto é um formulário preenchido. `@dataclass` gera o código chato do molde automaticamente; `frozen=True` impede alterar o objeto depois de criado. No trecho, `Licitacao` é o molde de uma contratação, com id, objeto, órgão, UF e modalidade.

**No seu projeto:** `contratinho/contratinho/filtro.py:18-28`

```python
@dataclass(frozen=True, slots=True)
class Licitacao:
    """O que o radar precisa saber de uma contratação, independente da fonte.

    Existe para que `filtro` não importe pypncp: a conversão fica em `fonte`.
    """

    id: str
    objeto: str
    orgao: str
    uf: str | None
```

**Pergunta de entrevista:** (atlas-cientifico) "Por que as revisões de medidas são append-only, com versão otimista?"

- a) Porque corrigir uma leitura não pode apagar a evidência anterior, e dois revisores não devem sobrescrever um ao outro. **(correta)**
- b) Porque o Postgres não permite UPDATE em tabelas com índice.
- c) Para reduzir o espaço ocupado pelo histórico.

**Fonte do motivo:** `atlas-cientifico/docs/decisoes.md:56` — "Corrigir uma leitura não pode apagar a evidência anterior; dois revisores não devem sobrescrever um ao outro"

**Seguimento provável:** "O que essa garantia não cobre?"

**Como responder o seguimento:** "Banco impede UPDATE/DELETE; autor é declarado. Não equivale a assinatura ou revisão científica independente"

**Onde estudar:** EN: developer-roadmap/roadmaps/python/content/classes@AqwzR8dZKLQIoj_6KKZ3t.md; developer-roadmap/roadmaps/java/content/ (classes-and-objects). PT-BR: free-programming-books/books/free-programming-books-pt_BR.md L417 (Python), L258 (Java)

## Parada 17. Expressões regulares

**Pré-requisitos:** 9

**Explicação:** Expressão regular é um padrão de busca em texto, como um coringa de caça-palavras: "qualquer dígito", "palavra inteira", "uma ou mais vezes". No trecho, `\b` marca fronteira de palavra: assim "impressão" não casa dentro de "impressora". O `r[...]+` aceita espaço, hífen ou barra entre as palavras do termo.

**No seu projeto:** `contratinho/contratinho/filtro.py:131-134`

```python
    palavras = [_formas(p) for p in normalizar(termo).split()]
    if not palavras:
        return re.compile(r"(?!)")  # termo vazio nunca casa
    return re.compile(rf"\b{r'[\s\-/]+'.join(palavras)}\b")
```

**Pergunta de entrevista:** (contratinho) "Por que o escopo inicial do Contratinho é só RJ e até R$ 250 mil?"

- a) Porque a API do PNCP só devolve contratos do RJ.
- b) Porque acima de R$ 250 mil a licitação exige outro tipo de cadastro.
- c) Porque começar largo é receber cem avisos no primeiro dia e parar de ler todos eles. **(correta)**

**Fonte do motivo:** `contratinho commit 1c84483` — "Começar largo é receber cem avisos no primeiro dia e parar de ler todos eles"

**Seguimento provável:** "E quando você amplia o escopo?"

**Como responder o seguimento:** Custo não documentado; a fonte diz que a ampliação "está anotado no ROADMAP para ser cobrado quando a hora de ampliar chegar".

**Onde estudar:** EN: developer-roadmap/roadmaps/python/content/regular-expressions@7t6mJBsaFMWPi7o9fbhhq.md; freeCodeCamp/curriculum/structure/superblocks/javascript-v9.json (basic-regex)

## Parada 19. Gerenciador de contexto (with / finally)

**Pré-requisitos:** 13, 14

**Explicação:** Algumas coisas precisam ser abertas e depois fechadas, como uma porta de geladeira, mesmo que algo dê errado no meio. O gerenciador de contexto garante o fechamento. No trecho, o `finally` fecha a conexão com o banco sempre, e o `except` desfaz (`rollback`) o que foi feito se houve erro; sem erro, o `commit` grava tudo.

**No seu projeto:** `contratinho/contratinho/estado.py:30-40`

```python
    conexao = sqlite3.connect(caminho)
    try:
        conexao.execute("PRAGMA journal_mode=WAL")
        conexao.executescript(ESQUEMA)
        yield conexao
        conexao.commit()
    except BaseException:
        conexao.rollback()
        raise
    finally:
        conexao.close()
```

**Pergunta de entrevista:** (contratinho) "Por que a marcação de "já avisado" é gravada depois de imprimir o aviso e não antes?"

- a) Porque gravar no SQLite antes de imprimir é mais lento.
- b) Porque repetir incomoda, mas perder o prazo custa dinheiro. **(correta)**
- c) Porque a gravação precisa do texto já formatado do aviso.

**Fonte do motivo:** `contratinho/README.md:126-128` — "Repetir incomoda; perder o prazo custa dinheiro."

**Seguimento provável:** "O que acontece se o processo morrer no meio?"

**Como responder o seguimento:** "Se o processo morrer entre imprimir e gravar, o aviso se repete na próxima rodada." (README.md:127)

**Onde estudar:** EN: developer-roadmap/roadmaps/python/content/file-handling@Nf3kRDSl_vas6QPXG7eVa.md (uso mais comum do with). Sem item específico no G-curriculo.md para o padrão em si

## Parada 20. SQL e consulta parametrizada

**Pré-requisitos:** 4, 6

**Explicação:** SQL é a linguagem para conversar com um banco de dados, que é uma planilha gigante organizada em tabelas. Um comando diz o que inserir, buscar ou alterar. Os pontos de interrogação `?` são lacunas preenchidas depois, com os valores enviados à parte; assim um texto malicioso nunca vira comando. No trecho, `INSERT OR IGNORE` grava o aviso e ignora se já existir.

**No seu projeto:** `contratinho/contratinho/estado.py:65-68`

```python
    conexao.executemany(
        "INSERT OR IGNORE INTO visto (id, perfil, objeto, visto_em) VALUES (?, ?, ?, ?)",
        [(a.licitacao.id, a.perfil, a.licitacao.objeto[:500], agora) for a in achados],
    )
```

**Pergunta de entrevista:** (contratinho) "Por que o estado da CLI é um SQLite e não um arquivo JSON?"

- a) Porque o JSON não guarda datas.
- b) Porque o Django exige SQLite para a CLI funcionar.
- c) Porque JSON reescrito inteiro corrompe em interrupção, e o SQLite dá índice e transação sem dependência nova. **(correta)**

**Fonte do motivo:** `contratinho/README.md:112-114` — "JSON reescrito inteiro corrompe em interrupção; SQLite dá índice e transação sem dependência nova."

**Seguimento provável:** "E qual o custo dessa escolha?"

**Como responder o seguimento:** não documentado — prepare sua resposta

**Onde estudar:** PT-BR: free-programming-books/courses/free-courses-pt_BR.md L103 (Database); free-programming-books/books/free-programming-books-pt_BR.md L113. EN: developer-roadmap/roadmaps/sql/content/basic-sql-syntax@JDDG4KfhtIlw1rkNCzUli.md; freeCodeCamp/curriculum/structure/superblocks/relational-databases-v9.json

## Parada 24. Estatística básica (mediana, percentil)

**Pré-requisitos:** 6, 7, 8

**Explicação:** A mediana é o valor do meio quando os números estão em ordem; ela não se deixa levar por um valor extremo, ao contrário da média. É como o salário "típico" de uma sala, mesmo que um colega ganhe milhões. No trecho, a função copia a lista, ordena, acha o meio e, se a quantidade for par, tira a média dos dois do meio.

**No seu projeto:** `raio-x-patrimonial/app/lib/deputados.ts:81-88`

```ts
export function median(values: number[]) {
  if (!values.length) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2
    ? sorted[middle]
    : (sorted[middle - 1] + sorted[middle]) / 2;
}
```

**Pergunta de entrevista:** (raio-x-patrimonial) "Por que a síntese da comparação patrimonial usa mediana e não média?"

- a) Porque a variação máxima passa de 5.000% e distorceria qualquer média. **(correta)**
- b) Porque a mediana é mais simples de calcular em TypeScript.
- c) Porque o TSE publica só medianas.

**Fonte do motivo:** `raio-x-patrimonial commit d3c726d` — "a variação máxima passa de 5.000% e distorceria qualquer média."

**Seguimento provável:** "O que a mediana não resolve?"

**Como responder o seguimento:** "o percentual não é calculado quando a declaração de 2022 foi zero" (commit d3c726d). Os valores são nominais (README.md:266).

**Onde estudar:** Sem item específico no G-curriculo.md

## Parada 25. APIs HTTP, rotas e requisições

**Pré-requisitos:** 6, 10, 13

**Explicação:** API é um balcão de atendimento de um programa: você faz um pedido por um endereço (rota) e recebe uma resposta com um código numérico, como 200 (deu certo), 400 (pedido mal formado) e 401 (sem permissão). No trecho, o servidor responde 401 se o horário assinado estiver fora da tolerância e 400 se o pedido não passar na validação.

**No seu projeto:** `hub-integracoes/backend/src/app.ts:371-382`

```ts
    // Checked after the signature, so only a valid sender learns about clock skew.
    // Inside the window, a replayed request is absorbed by the event-id dedupe.
    if (!isFreshTimestamp(timestamp, Date.now(), config.WEBHOOK_TOLERANCE_SECONDS)) {
      metrics.webhook('stale_timestamp');
      return reply.code(401).send({ error: 'timestamp_out_of_tolerance', toleranceSeconds: config.WEBHOOK_TOLERANCE_SECONDS });
    }

    const parsed = orderSchema.safeParse(body.value);
    if (!parsed.success) {
      metrics.webhook('invalid_order');
      return reply.code(400).send({ error: 'invalid_order', details: parsed.error.issues });
    }
```

**Pergunta de entrevista:** (hub-integracoes) "Por que o serviço tem um `/health` separado de um `/ready`?"

- a) Porque o Caddy exige duas rotas distintas de verificação.
- b) Para não reiniciar um processo saudável só porque uma dependência transitória está indisponível. **(correta)**
- c) Porque o `/ready` é mais barato e o `/health` testa o banco.

**Fonte do motivo:** `hub-integracoes/docs/decisoes.md:23` — "não reiniciar um processo saudável só porque uma dependência transitória está indisponível"

**Seguimento provável:** "O que muda para quem monitora o serviço?"

**Como responder o seguimento:** Custo/limitação não documentado; a fonte registra só a consequência: "monitoramento e orquestração devem usar `/ready` para tráfego e `/health` para liveness".

**Onde estudar:** PT-BR: free-programming-books/courses/free-courses-pt_BR.md L349 (Networking). EN: developer-roadmap/roadmaps/backend/content/how-does-the-internet-work@yCnn-NfSxIybUQ2iTuUGq.md e learn-about-apis@EwvLPSI6AlZ4TnNIJTZA4.md

## Parada 26. Configuração por variável de ambiente

**Pré-requisitos:** 3, 25

**Explicação:** Variável de ambiente é um valor que fica fora do código, no computador que o executa, como o interruptor do prédio que o síndico regula sem mexer na fiação. Assim o mesmo programa roda em lugares diferentes. No trecho, a lista de sites permitidos vem da variável `ATRIBUICAO_ORIGENS` (CORS, a regra do navegador sobre quem pode chamar a API); o `*` (todos) é recusado de propósito.

**No seu projeto:** `atribuicao-canais/app/main.py:116-122`

```python
ORIGENS = [o.strip() for o in os.environ.get("ATRIBUICAO_ORIGENS", "").split(",") if o.strip() and o.strip() != "*"]
if ORIGENS:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=ORIGENS,
        allow_methods=["POST", "DELETE"],
        allow_headers=["Content-Type"],
```

**Pergunta de entrevista:** (atribuicao-canais) "Por que o CORS só aceita as origens listadas em `ATRIBUICAO_ORIGENS` e ignora "*"?"

- a) Porque o navegador bloqueia "*" quando há cookies.
- b) Porque o Render não aceita "*" na configuração.
- c) Porque, com "*", qualquer site poderia injetar eventos em nome dos próprios visitantes e distorcer a atribuição. **(correta)**

**Fonte do motivo:** `atribuicao-canais commit 22632c6` — ""*" é ignorado de propósito, porque qualquer site poderia injetar eventos em nome dos próprios visitantes e distorcer a atribuição."

**Seguimento provável:** "E qual o custo dessa escolha?"

**Como responder o seguimento:** não documentado — prepare sua resposta

**Onde estudar:** Sem item específico no G-curriculo.md. Para CORS: developer-roadmap/roadmaps/backend/content/ (cors, https)

## Parada 27. Armazenamento no navegador (localStorage)

**Pré-requisitos:** 8, 10, 11

**Explicação:** O `localStorage` é uma gaveta que o navegador reserva para cada site, e o que se guarda ali continua depois de fechar a página. Só guarda texto, por isso o objeto é convertido em JSON antes (`JSON.stringify`). No trecho, o botão Salvar grava a partida na gaveta com uma chave (nome da etiqueta).

**No seu projeto:** `thronfolge/src/interface.js:258-261`

```javascript
  document.querySelector("#salvar").addEventListener("click", () => {
    localStorage.setItem(CHAVE_SAVE, JSON.stringify({ estado, jogadorId, alvoId }));
    informar("Partida salva neste navegador.");
  });
```

**Pergunta de entrevista:** (diario-glicemia) "Por que o service worker guarda no cache só a estrutura pública do site e não as respostas de arquivos do diário?"

- a) Porque o cache do navegador não aceita respostas de API.
- b) Porque um aparelho compartilhado guardaria fotos da criança num cache que sobrevive a "apagar os dados do diário". **(correta)**
- c) Para o site carregar mais rápido.

**Fonte do motivo:** `diario-glicemia commit 898c1be` — "Um aparelho compartilhado guardaria fotos da criança num cache que sobrevive a "apagar os dados do diário"."

**Seguimento provável:** "O que o usuário perde com isso?"

**Como responder o seguimento:** Não documentado para o modo Supabase; a fonte registra que a cópia em cache guarda só a estrutura pública, então o diário precisa de conexão para ler e gravar os registros.

**Onde estudar:** EN: developer-roadmap/roadmaps/javascript/content/ (dom-apis); freeCodeCamp/curriculum/structure/superblocks/javascript-v9.json (dom-manipulation-and-events)

## Parada 28. Funções assíncronas (async) e atualização otimista

**Pré-requisitos:** 8, 13, 25

**Explicação:** Algumas tarefas demoram, como salvar na internet. Função assíncrona não trava o programa enquanto espera; `await` diz "espere aqui o resultado". Atualização otimista é mostrar o resultado na tela antes de a resposta chegar e desfazer se der erro, como riscar um item da lista antes de ter certeza de que a compra passou. No trecho, `apply` aplica, `save` salva e, se falhar, `rollback` desfaz.

**No seu projeto:** `diario-glicemia/site/logic.js:42-46`

```javascript
  async function optimisticCommit(apply,rollback,save){
    apply();
    try{await save();return true}
    catch(error){rollback();throw error}
  }
```

**Pergunta de entrevista:** (diario-glicemia) "Por que cada gravação envia só a linha alterada e não o dia inteiro?"

- a) Para que duas pessoas registrando refeições diferentes no mesmo dia não apaguem o registro uma da outra. **(correta)**
- b) Para economizar dados móveis do celular.
- c) Porque o Supabase limita o tamanho de cada requisição.

**Fonte do motivo:** `diario-glicemia/README.md:196` — "Assim, duas pessoas registrando refeições diferentes no mesmo dia não apagam o registro uma da outra."

**Seguimento provável:** "E se duas pessoas editarem a mesma refeição ao mesmo tempo?"

**Como responder o seguimento:** "Se duas pessoas editam *a mesma* refeição ao mesmo tempo, o site avisa do conflito; quem salvar por último, depois do aviso, vence." (README.md:196)

**Onde estudar:** EN: developer-roadmap/roadmaps/javascript/content/ (asynchronous-javascript); freeCodeCamp/curriculum/structure/superblocks/javascript-v9.json (asynchronous-javascript). Atualização otimista: sem item específico no G-curriculo.md

## Parada 29. Componentes React e servidor x cliente

**Pré-requisitos:** 8, 12, 28

**Explicação:** React monta a tela a partir de peças reutilizáveis (componentes), como blocos de montar; cada peça cuida da sua parte. Parte do código roda no servidor, que prepara a página, e parte roda no navegador, que reage aos cliques. No trecho, a linha `"use client"` marca o componente para rodar no navegador, e os `useState`/`useEffect` importados guardam e reagem ao estado.

**No seu projeto:** `raio-x-patrimonial/app/Dashboard.tsx:1-6`

```tsx
"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

import DeputyProfile from "./DeputyProfile";
```

**Pergunta de entrevista:** (raio-x-patrimonial) "Por que cada deputado tem uma página própria (`/deputado/<id>`), renderizada no servidor?"

- a) Porque o React 19 não permite renderizar listas grandes no cliente.
- b) Para o Google indexar cada deputado.
- c) Porque é útil para apontar uma trajetória específica sem mandar a pessoa procurar na lista. **(correta)**

**Fonte do motivo:** `raio-x-patrimonial/README.md:38-41` — "útil para apontar uma trajetória específica sem mandar a pessoa procurar na lista."

**Seguimento provável:** "E qual o custo dessa escolha?"

**Como responder o seguimento:** não documentado — prepare sua resposta

**Onde estudar:** EN: freeCodeCamp/curriculum/structure/superblocks/front-end-development-libraries-v9.json (react-fundamentals, react-state-hooks-and-routing)


---

# Apêndice: Depois

Conceitos avançados ou de nicho; cada um assume o que já está nas paradas indicadas.

## Depois 1. Transações e travas de linha (FOR UPDATE)

**Pré-requisitos:** 20, 28

**Explicação:** Transação é um grupo de passos que vale como uma coisa só: ou todos acontecem, ou nenhum, como uma transferência em que o débito e o crédito não podem ficar pela metade. `FOR UPDATE` tranca a linha enquanto você trabalha nela, como uma sala de reunião com a porta trancada. No trecho, as contas são ordenadas por id e trancadas uma a uma, sempre na mesma ordem, para duas transferências não se esperarem para sempre.

**No seu projeto:** `liquidacao-pix/internal/repository/transferencias.go:192-203`

```go
	slices.Sort(ordenados)
	ordenados = slices.Compact(ordenados)

	contas := make(map[int64]ContaTravada, len(ordenados))
	for _, id := range ordenados {
		var c ContaTravada
		var saldo int64
		var mac []byte
		err := t.tx.QueryRow(ctx,
			`SELECT id, saldo_centavos, tecnica, auditoria_seq, auditoria_mac
			   FROM contas WHERE id = $1 FOR UPDATE`, id,
		).Scan(&c.ID, &saldo, &c.Tecnica, &c.AuditoriaSeq, &mac)
```

**Pergunta de entrevista:** (liquidacao-pix) "Por que READ COMMITTED com trava de linha (`FOR UPDATE`) em vez de SERIALIZABLE?"

- a) Porque o Postgres 17 não oferece SERIALIZABLE.
- b) Porque SERIALIZABLE abortaria transações em conflito e exigiria repetir, sem ganho aqui. **(correta)**
- c) Porque SERIALIZABLE impede o uso de `FOR UPDATE`.

**Fonte do motivo:** `liquidacao-pix/docs/adr/0002-idempotencia-e-travas.md` (seção Decisão, itens 1-3) — "SERIALIZABLE abortaria transações em conflito e exigiria repetir, sem ganho aqui."

**Seguimento provável:** "Por que as contas são travadas uma a uma, em ordem crescente de id?"

**Como responder o seguimento:** "Evita *deadlock* entre transferências cruzadas" (MEMORIA_TECNICA.md:78). Custo da escolha: não documentado; a fonte registra a prova de mutação (sem ordenar as travas, o teste de concorrência acusa 189 deadlocks; MEMORIA_TECNICA.md, histórico de 2026-10-21, e commit ff07977).

**Onde estudar:** EN: developer-roadmap/roadmaps/sql/content/ (transactions); developer-roadmap/roadmaps/backend/content/ (acid)

## Depois 2. Idempotência

**Pré-requisitos:** 20, 25, 28

**Explicação:** Operação idempotente é a que, repetida, tem o mesmo efeito de fazer uma vez só, como apertar o botão do elevador cinco vezes. Em sistemas que podem receber o mesmo aviso duas vezes, isso evita cobrar ou gravar em dobro. No trecho, `ON CONFLICT ... DO NOTHING` impede duplicar o evento que tenha o mesmo identificador externo.

**No seu projeto:** `hub-integracoes/backend/src/app.ts:387-393`

```ts
      const inserted = await client.query<{ id: string }>(
        `INSERT INTO integration_events (tenant_id, source, external_event_id, order_id, payload)
         VALUES ($1, 'demo-store', $2, $3, $4::jsonb)
         ON CONFLICT (tenant_id, source, external_event_id) DO NOTHING
         RETURNING id`,
        [tenantId, order.eventId, order.orderId, JSON.stringify(order)],
      );
```

**Pergunta de entrevista:** (hub-integracoes) "Por que a retenção limpa o payload do evento mas mantém a identidade dele, em vez de apagar a linha?"

- a) Porque a LGPD obriga a guardar o `eventId` por cinco anos.
- b) Porque o ERP exige o `eventId` em toda consulta de auditoria.
- c) Porque apagar a linha faria a deduplicação esquecer o `eventId`, e um reenvio tardio do remetente geraria uma segunda entrega. **(correta)**

**Fonte do motivo:** `hub-integracoes/docs/decisoes.md:67-73` (ADR-009) — "apagar a linha faria a deduplicação esquecer o `eventId`, e um reenvio tardio do remetente geraria uma segunda entrega."

**Seguimento provável:** "E qual o custo dessa escolha?"

**Como responder o seguimento:** não documentado — prepare sua resposta

**Onde estudar:** Sem item específico no G-curriculo.md

## Depois 3. Concorrência (goroutines e agendadores)

**Pré-requisitos:** 8, 13, 28

**Explicação:** Concorrência é fazer várias coisas ao mesmo tempo, como um restaurante com cozinheiros em paralelo. Em Go, uma goroutine é uma tarefa leve que roda em segundo plano. No trecho, uma função fica num laço movido por um relógio (`ticker`) que dispara a cada intervalo e fecha as rodadas vencidas; ela é lançada com `go` em `backend/cmd/api/main.go:27`.

**No seu projeto:** `mesa-de-credito/backend/cmd/api/main.go:44-52`

```go
func closeExpiredRounds(ctx context.Context, repository *store.Postgres, interval time.Duration) {
	ticker := time.NewTicker(interval)
	defer ticker.Stop()
	for range ticker.C {
		if _, err := repository.CloseExpiredRounds(ctx); err != nil {
			log.Printf("closing expired rounds: %v", err)
		}
	}
}
```

**Pergunta de entrevista:** (mesa-de-credito) "Por que o isolamento é READ COMMITTED com bloqueio da linha do participante?"

- a) Porque um teste real de concorrência levou a essa escolha. **(correta)**
- b) Porque o Postgres só oferece esse nível de isolamento.
- c) Porque o jogo tem centenas de jogadores simultâneos e precisa de leitura sem bloqueio.

**Fonte do motivo:** `mesa-de-credito/docs/ROTEIRO_V1.md:160` — "um teste real de concorrência levou à escolha de `READ COMMITTED` com bloqueio da linha do participante."

**Seguimento provável:** "O que não foi testado?"

**Como responder o seguimento:** Custo não documentado; a auditoria registra que não houve teste matando o processo ou o banco (docs/AUDITORIA_FASE_1A.md:59).

**Onde estudar:** EN: developer-roadmap/roadmaps/golang/content/ (goroutines, channels)

## Depois 4. HMAC e assinatura de mensagens

**Pré-requisitos:** 4, 17, 25

**Explicação:** HMAC é um selo que prova que uma mensagem veio de quem conhece um segredo e não foi alterada, como o lacre numerado de uma embalagem. Quem recebe recalcula o selo e compara. O `timingSafeEqual` compara em tempo constante, para ninguém descobrir o selo pelo tempo que a comparação leva. No trecho, a função recusa um formato errado e só aceita se o selo recalculado for idêntico.

**No seu projeto:** `hub-integracoes/backend/src/security.ts:12-17`

```ts
export function verifySignature(rawBody: string, supplied: string | undefined, secret: string, timestamp: number): boolean {
  if (!supplied || !/^sha256=[a-f0-9]{64}$/i.test(supplied)) return false;
  const expected = Buffer.from(signPayload(rawBody, secret, timestamp), 'utf8');
  const actual = Buffer.from(supplied.toLowerCase(), 'utf8');
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}
```

**Pergunta de entrevista:** (hub-integracoes) "Por que a proteção contra replay usa o horário assinado (`<timestamp>.<corpo>`, janela de 300 s) e não um nonce por requisição?"

- a) Porque o nonce exige um banco em memória no remetente.
- b) Porque é o mesmo padrão de Stripe e Slack, conhecido por quem integra; e um nonce por requisição exigiria mais estado por pedido, quando o `eventId` já cumpre esse papel. **(correta)**
- c) Porque a janela de 300 s é exigida pela LGPD.

**Fonte do motivo:** `hub-integracoes/docs/decisoes.md:55` (ADR-007) — "é o mesmo padrão de Stripe e Slack, conhecido por quem integra"; "exigiria mais estado por pedido, e o `eventId` já cumpre esse papel"

**Seguimento provável:** "E qual o custo dessa escolha?"

**Como responder o seguimento:** "o remetente precisa de relógio sincronizado." A mudança quebrou a compatibilidade do protocolo, "aceitável porque ainda não havia remetente real."

**Onde estudar:** EN: developer-roadmap/roadmaps/backend/content/ (authentication, jwt, https)

## Depois 5. Outbox transacional e filas (SKIP LOCKED)

**Pré-requisitos:** 20, 28 e Depois 1

**Explicação:** Fila é uma fila de mensagens a serem processadas, como as senhas de um banco. Outbox é gravar no mesmo banco, junto com a mudança, a mensagem a ser enviada, e um processo separado a publica na fila depois. `SKIP LOCKED` faz cada trabalhador pegar linhas que outro ainda não pegou, sem esperar. No trecho, a consulta pega os eventos ainda não publicados.

**No seu projeto:** `hub-integracoes/backend/src/outbox-publisher.ts:12-19`

```ts
      `SELECT id, integration_event_id, event_type, payload
         FROM outbox_events
        WHERE published_at IS NULL
        ORDER BY created_at
        FOR UPDATE SKIP LOCKED
        LIMIT $1`,
      [batchSize],
    );
```

**Pergunta de entrevista:** (hub-integracoes) "Por que o pedido e a outbox são gravados na mesma transação, com um relay separado publicando no Redis Streams?"

- a) Porque o Redis não aceita gravação direta da API.
- b) Para garantir entrega exatamente uma vez.
- c) Para manter confiável a fronteira de persistência e desacoplar integrações lentas, permitindo escalar workers. **(correta)**

**Fonte do motivo:** `hub-integracoes/docs/decisoes.md:7` (ADR-001) — "manter confiável a fronteira de persistência e desacoplar integrações lentas, permitindo escalar workers."

**Seguimento provável:** "E qual o custo dessa escolha?"

**Como responder o seguimento:** "PostgreSQL e Redis não têm commit atômico conjunto; o relay pode republicar após falha entre `XADD` e atualização SQL." A entrega é at-least-once.

**Onde estudar:** Sem item específico no G-curriculo.md

## Depois 6. Encerramento limpo por sinais

**Pré-requisitos:** 8, 13

**Explicação:** Quando você fecha um programa com Ctrl+C, o sistema operacional manda um sinal. Um programa bem feito escuta o sinal e termina o que está fazendo antes de sair, como o garçom que serve o prato em andamento antes de fechar a casa. No trecho, `signal.NotifyContext` cria um contexto que é cancelado quando chega SIGINT (Ctrl+C) ou SIGTERM.

**No seu projeto:** `liquidacao-pix/internal/processo/processo.go:33-36`

```go
// ContextoComSinais é cancelado no SIGINT ou SIGTERM.
func ContextoComSinais() (context.Context, context.CancelFunc) {
	return signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)
}
```

**Pergunta de entrevista:** (liquidacao-pix) "Por que Redis Streams com grupo de consumo e não Pub/Sub?"

- a) Porque no Stream a mensagem fica guardada até o `XACK`, e o Pub/Sub não guarda mensagem. **(correta)**
- b) Porque o Pub/Sub não existe na versão 7 do Redis.
- c) Porque o Streams entrega cada mensagem exatamente uma vez.

**Fonte do motivo:** `liquidacao-pix commit c6a8a86` — "Streams em vez de Pub/Sub: a mensagem fica guardada até o XACK"

**Seguimento provável:** "E o que isso custa nas retentativas?"

**Como responder o seguimento:** "Erros permanentes ... passam pelas mesmas retentativas que os temporários antes de morrer. É mais lento" (docs/adr/0003-redis-streams-retentativas-e-orfas.md, Consequências). RabbitMQ foi recusado por ser "mais um sistema para operar".

**Onde estudar:** Sem item específico no G-curriculo.md

## Depois 7. Segurança no banco (RLS) e login PKCE

**Pré-requisitos:** 20, 25

**Explicação:** RLS (row level security) faz o próprio banco decidir quais linhas cada usuário vê, como um arquivo em que cada pessoa só consegue abrir a própria pasta. PKCE é um jeito de login em que o navegador prova que quem terminou o login é o mesmo que o começou. No trecho, `enable row level security` liga a proteção em cada tabela; as regras (políticas) vêm em outro trecho da migração.

**No seu projeto:** `diario-glicemia/supabase/migrations/20260927120000_diario.sql:184-192`

```sql
alter table public.diarios         enable row level security;
alter table public.membros         enable row level security;
alter table public.convites        enable row level security;
alter table public.dias            enable row level security;
alter table public.refeicoes       enable row level security;
alter table public.hipos           enable row level security;
alter table public.extras          enable row level security;
alter table public.sensor_dias     enable row level security;
alter table public.sensor_leituras enable row level security;
```

**Pergunta de entrevista:** (diario-glicemia) "Por que o site fala direto com o Postgres do Supabase, com segurança em Row Level Security, em vez de ter um servidor próprio?"

- a) Porque o Supabase proíbe servidores intermediários.
- b) Porque um servidor próprio seria mais uma coisa para manter e atualizar. **(correta)**
- c) Porque o Cloudflare Workers não executa código de servidor.

**Fonte do motivo:** `diario-glicemia/README.md:191` — "Um servidor próprio seria mais uma coisa para manter e atualizar."

**Seguimento provável:** "Por que Supabase e não MongoDB ou SQLite?"

**Como responder o seguimento:** Custo da escolha: não documentado. Sobre MongoDB e SQLite a fonte diz: "nenhum dos dois oferece acesso seguro direto do navegador sem uma API no meio." (README.md:191)

**Onde estudar:** EN: developer-roadmap/roadmaps/backend/content/ (authentication)

## Depois 8. Injeção de dependência (Spring)

**Pré-requisitos:** 15, 8

**Explicação:** Injeção de dependência é receber de fora o que a peça precisa, em vez de ela mesma ir buscar ou construir, como o chef que recebe os ingredientes na bancada. Em Spring, a anotação `@Component` registra a classe, e o Spring entrega ao construtor os objetos que ele pede. No trecho, o construtor pede `ProcessamentoProperties` e `ObjectMapper`.

**No seu projeto:** `atlas-cientifico/api/src/main/java/dev/atlas/documentos/ExtratorPdfIsolado.java:17-25`

```java
@Component
public class ExtratorPdfIsolado {
    private final ProcessamentoProperties properties;
    private final ObjectMapper mapper;
    private final Semaphore capacidade = new Semaphore(2);

    public ExtratorPdfIsolado(ProcessamentoProperties properties, ObjectMapper mapper) {
        this.properties = properties; this.mapper = mapper;
    }
```

**Pergunta de entrevista:** (atlas-cientifico) "Por que o PDFBox roda numa JVM filha com heap limitado e prazo de parede?"

- a) Porque o Spring Boot não carrega o PDFBox na mesma JVM.
- b) Porque a JVM filha extrai o texto mais rápido.
- c) Porque o limite de páginas não controla PDF lento ou explosão de memória dentro da API. **(correta)**

**Fonte do motivo:** `atlas-cientifico/docs/decisoes.md:53` — "O limite de páginas não controla PDF lento ou explosão de memória dentro da API"

**Seguimento provável:** "O que essa solução ainda não resolve?"

**Como responder o seguimento:** "Ainda lê o volume permitido e não é sandbox de SO; PDFs hostis exigem defesa adicional"

**Onde estudar:** EN: developer-roadmap/roadmaps/java/content/ (spring-spring-boot)

## Depois 9. Memorização (cache de resultado de função)

**Pré-requisitos:** 8, 17

**Explicação:** Memorizar é guardar o resultado de um cálculo para não refazê-lo, como anotar a conta que acabou de fazer na calculadora. Se a mesma pergunta voltar, a resposta vem do caderno. No trecho, `@lru_cache(maxsize=2048)` guarda até 2048 padrões de regex já montados; um termo repetido não é recompilado.

**No seu projeto:** `contratinho/contratinho/filtro.py:120-125`

```python
@lru_cache(maxsize=2048)
def _padrao(termo: str) -> re.Pattern[str]:
    """Regex de um termo: palavra inteira, plural tolerado, espaço flexível.

    Palavra inteira evita que 'impressão' case com 'impressora' — a razão de
    `excluir` existir seria metade perdida se a busca fosse substring solta.
```

**Pergunta de entrevista:** (atribuicao-canais) "Por que o cache do painel usa uma versão dos dados mantida por triggers e não uma assinatura por contagem ou ids?"

- a) Porque, sem AUTOINCREMENT, o SQLite reaproveita o id da última linha apagada. **(correta)**
- b) Porque triggers são mais rápidas que contar linhas.
- c) Porque o Postgres não permite contar linhas em cache.

**Fonte do motivo:** `atribuicao-canais/CONTEXTO.md:228-232` (commit b85b615) — "Descartada a assinatura por contagem/ids: sem AUTOINCREMENT o SQLite reaproveita o id da última linha apagada."

**Seguimento provável:** "E qual o custo dessa escolha?"

**Como responder o seguimento:** não documentado — prepare sua resposta

**Onde estudar:** Sem item específico no G-curriculo.md
