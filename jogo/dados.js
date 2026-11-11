window.TRILHA = {
 "paradas": [
  {
   "numero": 1,
   "nome": "Terminal: dar ordens por texto",
   "prereqs": [],
   "prereqsDepois": [],
   "explicacao": "O terminal é uma janela onde você digita ordens em vez de clicar, como mandar um recado escrito para um funcionário em vez de apontar com o dedo. Cada linha é um comando; o computador executa e responde com texto. No trecho, um arquivo de receitas (Makefile) guarda um comando chamado `checar-token`, que confere se uma variável existe e, se não existir, escreve um aviso e para (`exit 1`).",
   "origem": "fundo-eleitoral-br/Makefile:20-25",
   "projeto": "fundo-eleitoral-br",
   "linguagem": "make",
   "codigo": "checar-token:\n\t@test -n \"$$HF_TOKEN\" || { \\\n\t  echo \"HF_TOKEN ausente. O segredo do Codespaces so e injetado quando a\"; \\\n\t  echo \"maquina inicia -- pare e reabra o codespace, ou confira se o segredo\"; \\\n\t  echo \"tem acesso a este repositorio em github.com/settings/codespaces.\"; \\\n\t  exit 1; }",
   "projetoPergunta": "fundo-eleitoral-br",
   "pergunta": "Por que a publicação no Hugging Face é uma etapa do `make tudo` e não um passo manual?",
   "alternativas": [
    {
     "texto": "Porque o Hugging Face só aceita envio automatizado.",
     "correta": false
    },
    {
     "texto": "Porque, se for um passo manual e opcional, alguém roda a ingestão, fecha a aba e perde o resultado.",
     "correta": true
    },
    {
     "texto": "Porque a publicação manual deixaria o dataset mais lento para baixar.",
     "correta": false
    }
   ],
   "fonteMotivo": "`fundo-eleitoral-br/docs/decisoes.md:132` — \"Se publicar for um passo manual e opcional, mais cedo ou mais tarde alguém — provavelmente eu mesmo — vai rodar a ingestão, fechar a aba e perder o resultado.\"",
   "seguimento": "E o que essa escolha custa?",
   "respostaSeguimento": "não documentado — prepare sua resposta",
   "ondeEstudar": "PT-BR: free-programming-books/courses/free-courses-pt_BR.md L516 (Shell), L320 (Linux). EN: freeCodeCamp/curriculum/challenges/english/blocks/lecture-understanding-the-command-line-and-working-with-bash/"
  },
  {
   "numero": 2,
   "nome": "Instalar ambiente e dependências",
   "prereqs": [
    1
   ],
   "prereqsDepois": [],
   "explicacao": "Dependência é um programa de outra pessoa que o seu projeto usa, como a receita que pede \"farinha pronta\" em vez de moer o trigo. Cada linguagem tem um arquivo que lista o que precisa ser instalado, e uma ferramenta (pip, uv, npm, yarn, mvn) lê a lista e baixa tudo. No trecho, a lista está em `dependencies`, com a versão mínima de cada pacote.",
   "origem": "fundo-eleitoral-br/pyproject.toml:6-11",
   "projeto": "fundo-eleitoral-br",
   "linguagem": "toml",
   "codigo": "dependencies = [\n    \"duckdb>=1.1\",\n    \"polars>=1.0\",\n    \"pyarrow>=17\",\n    \"curl_cffi>=0.7\",\n    \"huggingface-hub>=0.25\",",
   "projetoPergunta": "fundo-eleitoral-br",
   "pergunta": "Por que você usou DuckDB lendo Parquet em vez de um Postgres?",
   "alternativas": [
    {
     "texto": "Porque o DuckDB aguenta mais usuários simultâneos que o Postgres.",
     "correta": false
    },
    {
     "texto": "Porque o Hugging Face só entrega dados para o DuckDB.",
     "correta": false
    },
    {
     "texto": "Porque um Postgres adicionaria container, migrations e credenciais para resolver um problema de concorrência de escrita que o projeto não tem.",
     "correta": true
    }
   ],
   "fonteMotivo": "`fundo-eleitoral-br/docs/decisoes.md:40` — \"Um Postgres aqui adicionaria container, migrations e credenciais para resolver um problema de concorrência de escrita que este projeto não tem.\"",
   "seguimento": "Em que situação você trocaria para um Postgres?",
   "respostaSeguimento": "Custo não documentado como custo; o ADR diz o que invalidaria a escolha: \"precisar de escrita concorrente ou de servir as consultas para uma aplicação multiusuário\".",
   "ondeEstudar": "PT-BR: free-programming-books/books/free-programming-books-pt_BR.md L417 (Python). EN: freeCodeCamp/curriculum/structure/superblocks/python-v9.json (python-installation)"
  },
  {
   "numero": 3,
   "nome": "Variáveis e constantes",
   "prereqs": [
    1,
    2
   ],
   "prereqsDepois": [],
   "explicacao": "Variável é uma caixa com etiqueta onde você guarda um valor para usar depois, como o número de telefone anotado na agenda com o nome da pessoa. Constante é uma caixa que não deve mudar; por convenção, o nome vai em maiúsculas. No trecho, `PISO_LEGAL` guarda o valor 30.0 e o resto do código usa o nome em vez de repetir o número.",
   "origem": "fundo-eleitoral-br/src/fundo_eleitoral/analise.py:23-27",
   "projeto": "fundo-eleitoral-br",
   "linguagem": "python",
   "codigo": "PISO_LEGAL = 30.0\n\n# A cota regula a distribuicao feita PELO PARTIDO: FEFC vindo de outra\n# candidatura ja foi contado no repasse original (ADR-009).\n_so_direto = f\"AND ds_origem_receita <> '{ORIGEM_REPASSE}'\"",
   "projetoPergunta": "fundo-eleitoral-br",
   "pergunta": "Por que o cálculo de concentração exclui o repasse entre candidaturas?",
   "alternativas": [
    {
     "texto": "Porque incluir o repasse sempre reduz o Gini, já que as transferências correm de quem recebeu muito para candidaturas menores.",
     "correta": true
    },
    {
     "texto": "Porque o TSE não publica esse tipo de repasse.",
     "correta": false
    },
    {
     "texto": "Porque os dados de repasse entre candidaturas não existem em 2018.",
     "correta": false
    }
   ],
   "fonteMotivo": "`fundo-eleitoral-br/docs/decisoes.md:180-183` — \"incluir o repasse sempre *reduz* o Gini, porque as transferências correm de quem recebeu muito para candidaturas menores.\"",
   "seguimento": "Há algo sobre esse resultado que você ainda não consegue explicar?",
   "respostaSeguimento": "Sim, e está registrado: \"Observação sobre 2018 … Vale investigar se reflete mudança de regra entre ciclos ou apenas o FEFC menor daquele ano — não está respondido.\" (docs/decisoes.md, ADR-009).",
   "ondeEstudar": "PT-BR: free-programming-books/books/free-programming-books-pt_BR.md L86 (Lógica de Programação para iniciantes); free-programming-books/courses/free-courses-pt_BR.md L401. EN: developer-roadmap/roadmaps/javascript/content/all-about-variables@kvActjpU4FUJdrmuFoFEe.md"
  },
  {
   "numero": 4,
   "nome": "Tipos de dado (texto, inteiro, dinheiro em centavos)",
   "prereqs": [
    3
   ],
   "prereqsDepois": [],
   "explicacao": "Todo valor tem um tipo, como a diferença entre uma palavra escrita, um número contado nos dedos e um valor com vírgula. O tipo diz o que dá para fazer com o valor: somar números, juntar textos. Dinheiro costuma ser guardado como número inteiro de centavos, porque números com vírgula acumulam erros pequenos de arredondamento. No trecho, `Money` é um inteiro de 64 bits que representa centavos.",
   "origem": "mesa-de-credito/backend/internal/finance/schedule.go:26-30",
   "projeto": "mesa-de-credito",
   "linguagem": "go",
   "codigo": "// Money stores a monetary amount as integer cents.\ntype Money int64\n\n// MonthlyRate is an exact non-negative monthly rate. A value of 0.01 means 1%.\n// Numerator and denominator are stored by value so callers cannot mutate them.",
   "projetoPergunta": "liquidacao-pix",
   "pergunta": "Por que o dinheiro é guardado como inteiro em centavos e não como número decimal?",
   "alternativas": [
    {
     "texto": "Porque o Postgres não tem tipo decimal.",
     "correta": false
    },
    {
     "texto": "Para a conservação do dinheiro ser verificável e não haver erro de arredondamento.",
     "correta": true
    },
    {
     "texto": "Porque inteiros ocupam menos espaço e deixam as consultas mais rápidas.",
     "correta": false
    }
   ],
   "fonteMotivo": "`liquidacao-pix/MEMORIA_TECNICA.md:77` — \"Conservação do dinheiro verificável; sem erro de arredondamento\"",
   "seguimento": "E qual o custo dessa escolha?",
   "respostaSeguimento": "não documentado — prepare sua resposta",
   "ondeEstudar": "PT-BR: free-programming-books/courses/free-courses-pt_BR.md L401. EN: developer-roadmap/roadmaps/javascript/content/data-types@-jbPPuEXacBR0d0CWPHgd.md; freeCodeCamp/curriculum/challenges/english/blocks/core-primitives-in-python/"
  },
  {
   "numero": 5,
   "nome": "Condicionais (se/senão) e operadores",
   "prereqs": [
    3,
    4
   ],
   "prereqsDepois": [],
   "explicacao": "Condicional é uma bifurcação: se a condição for verdadeira, o programa segue por um caminho; senão, por outro, como \"se chover, leve guarda-chuva\". Os operadores comparam (`===`, `!`, `>`) ou combinam condições. No trecho, a função recusa a ação cedo (`return`) quando o jogo já acabou ou quando o tipo de ação não está na lista permitida.",
   "origem": "thronfolge/src/simulacao.js:275-279",
   "projeto": "thronfolge",
   "linguagem": "javascript",
   "codigo": "export function validarAcao(estado, acao) {\n  const tipos = new Set([\"aguardar\", \"conversar\", \"propor_amizade\", \"difamar\",\n    \"pedir_apoio\", \"aceitar_pedido_apoio\", \"recusar_pedido_apoio\"]);\n  if (estado.encerrado) return { valida: false, motivo: \"a escolha do rei já terminou\" };\n  if (!tipos.has(acao.tipo)) return { valida: false, motivo: \"ação desconhecida\" };",
   "projetoPergunta": "thronfolge",
   "pergunta": "Por que no jogo a eleição pelos grandes é o que faz rei, e a unção não é condição?",
   "alternativas": [
    {
     "texto": "Porque a unção é difícil de simular com cinco poderes.",
     "correta": false
    },
    {
     "texto": "Porque o motor de regras não consegue representar cerimônias.",
     "correta": false
    },
    {
     "texto": "Porque a eleição é o passo que faz rei, e a unção não era obrigatória (Henrique I a recusou em 919).",
     "correta": true
    }
   ],
   "fonteMotivo": "`thronfolge/RECADOS.md:51-55` — \"a eleição é o passo que faz rei; a unção não era obrigatória (Henrique I a recusou em 919).\"",
   "seguimento": "O que essa simplificação deixa de fora?",
   "respostaSeguimento": "não documentado — prepare sua resposta",
   "ondeEstudar": "PT-BR: free-programming-books/courses/free-courses-pt_BR.md L401; L411 (Curso em Vídeo Python). EN: developer-roadmap/roadmaps/python/content/conditionals@NP1kjSk0ujU0Gx-ajNHlR.md; developer-roadmap/roadmaps/javascript/content/arithmetic-operators@0PK1NwlgkNe2Vf-We4uLH.md e comparison-operators@-v4_V4UuoZSgUk2sqOCim.md"
  },
  {
   "numero": 6,
   "nome": "Listas e dicionários (arrays e objetos)",
   "prereqs": [
    3,
    4
   ],
   "prereqsDepois": [],
   "explicacao": "Lista é uma fila numerada de itens, como a lista de compras. Dicionário (objeto) é um conjunto de pares nome-valor, como uma ficha de cadastro com campos. No trecho, `estado` é um objeto: `turno` recebe 0, `eventos` recebe uma lista vazia `[]` e `ultima_mudanca_apoio` recebe um objeto vazio `{}`. O operador `??=` só preenche o campo se ele ainda não existir.",
   "origem": "thronfolge/src/simulacao.js:9-16",
   "projeto": "thronfolge",
   "linguagem": "javascript",
   "codigo": "export function criarEstado(configuracao) {\n  const estado = copiar(configuracao);\n  estado.turno ??= 0;\n  estado.eventos ??= [];\n  estado.eleito ??= null;\n  estado.encerrado ??= null;\n  estado.ultima_mudanca_apoio ??= {};\n  estado.pedido_apoio_pendente ??= null;",
   "projetoPergunta": "thronfolge",
   "pergunta": "Por que cada personagem só pode mudar de apoio uma vez por mês?",
   "alternativas": [
    {
     "texto": "Porque um grande trocava de lado várias vezes no mesmo mês sem custo, e a IA aceitava pedidos de apoio em nome do jogador.",
     "correta": true
    },
    {
     "texto": "Para o jogo rodar mais rápido a cada turno.",
     "correta": false
    },
    {
     "texto": "Porque as fontes históricas registram uma troca de lado por mês.",
     "correta": false
    }
   ],
   "fonteMotivo": "`thronfolge commit 201ae5f` — \"um grande trocava de lado várias vezes no mesmo mês sem custo, e a IA aceitava pedidos de apoio em nome do jogador.\"",
   "seguimento": "E qual o custo dessa regra?",
   "respostaSeguimento": "não documentado — prepare sua resposta",
   "ondeEstudar": "PT-BR: free-programming-books/courses/free-courses-pt_BR.md L411. EN: developer-roadmap/roadmaps/python/content/lists@UT_SR7G-LYtzqooWrEtF1.md e dictionaries@bc9CL_HMT-R6nXO1eR-gP.md; freeCodeCamp/curriculum/challenges/english/blocks/dictionaries-and-loops/"
  },
  {
   "numero": 8,
   "nome": "Funções (e funções puras)",
   "prereqs": [
    3,
    5,
    6
   ],
   "prereqsDepois": [],
   "explicacao": "Função é uma receita com nome: recebe ingredientes (parâmetros), faz o preparo e entrega um prato (resultado). Depois é só chamar o nome. Uma função pura sempre devolve o mesmo resultado para os mesmos ingredientes e não mexe em nada fora dela. No trecho, `calcularPoder` conta quantos territórios a pessoa governa e devolve um objeto com territórios, soldados e ouro.",
   "origem": "thronfolge/src/simulacao.js:132-142",
   "projeto": "thronfolge",
   "linguagem": "javascript",
   "codigo": "export function calcularPoder(estado, pessoaId) {\n  const pessoa = personagem(estado, pessoaId);\n  const territorios = (estado.regioes ?? []).filter(\n    (regiao) => regiao.governante === pessoaId,\n  ).length;\n  return {\n    territorios,\n    soldados: pessoa.soldados,\n    ouro: pessoa.ouro,\n  };\n}",
   "projetoPergunta": "thronfolge",
   "pergunta": "Por que os recursos de 936 aparecem em faixas e não em números exatos?",
   "alternativas": [
    {
     "texto": "Porque a interface não comporta números grandes.",
     "correta": false
    },
    {
     "texto": "Para dar incerteza ao jogador sobre os recursos dos rivais.",
     "correta": false
    },
    {
     "texto": "Porque as fontes de 955 e 981 só dão escala.",
     "correta": true
    }
   ],
   "fonteMotivo": "`thronfolge/contexto.md:177-180` — \"porque as fontes de 955 e 981 só dão escala\" (é \"Proposta do Claude\" em \"Decisões em aberto\", contexto.md:172, não decisão confirmada)",
   "seguimento": "Que limitação dessas fontes você precisa reconhecer?",
   "respostaSeguimento": "\"As duas fontes são posteriores a 936: dão escala, não valores. É uma proposta do Claude registrada em 'Decisões em aberto', ainda não confirmada por mim.\" (RECADOS.md:184; contexto.md:172)",
   "ondeEstudar": "PT-BR: free-programming-books/books/free-programming-books-pt_BR.md L417 (Pense em Python). EN: developer-roadmap/roadmaps/python/content/functions-builtin-functions@-DJgS6l2qngfwurExlmmT.md; freeCodeCamp/curriculum/challenges/english/blocks/control-flow-and-functions-in-python/"
  },
  {
   "numero": 9,
   "nome": "Strings e normalização de texto",
   "prereqs": [
    4,
    8
   ],
   "prereqsDepois": [],
   "explicacao": "String é texto. Para comparar textos escritos de jeitos diferentes, \"Aquisição\" e \"aquisicao\", primeiro se padroniza: tira acento, deixa minúsculas, tira espaços sobrando, como arrumar fichas de arquivo num padrão antes de ordenar. No trecho, `NFKD` separa a letra do acento, o laço descarta os acentos e a última linha troca espaços repetidos por um só.",
   "origem": "contratinho/contratinho/filtro.py:57-59",
   "projeto": "contratinho",
   "linguagem": "python",
   "codigo": "    sem_acento = unicodedata.normalize(\"NFKD\", texto)\n    sem_acento = \"\".join(c for c in sem_acento if not unicodedata.combining(c))\n    return re.sub(r\"\\s+\", \" \", sem_acento).strip().lower()",
   "projetoPergunta": "contratinho",
   "pergunta": "Por que os perfis têm uma lista de exclusão além dos termos de busca?",
   "alternativas": [
    {
     "texto": "Porque, sem exclusão, a ferramenta devolve ruído, o usuário para de ler os avisos e ela vira enfeite.",
     "correta": true
    },
    {
     "texto": "Porque a API do PNCP exige termos de exclusão na consulta.",
     "correta": false
    },
    {
     "texto": "Para reduzir o custo de cada consulta ao PNCP.",
     "correta": false
    }
   ],
   "fonteMotivo": "`contratinho/README.md:116-120` — \"Sem exclusão a ferramenta devolve ruído, o usuário para de ler os avisos, e vira enfeite.\"",
   "seguimento": "E qual o custo dessa escolha?",
   "respostaSeguimento": "não documentado — prepare sua resposta",
   "ondeEstudar": "EN: freeCodeCamp/curriculum/structure/superblocks/javascript-v9.json (javascript-variables-and-strings); developer-roadmap/roadmaps/python/content/basic-syntax@6xRncUs3_vxVbDur567QA.md. PT-BR: free-programming-books/courses/free-courses-pt_BR.md L411"
  },
  {
   "numero": 10,
   "nome": "JSON",
   "prereqs": [
    6
   ],
   "prereqsDepois": [],
   "explicacao": "JSON é um formato de texto para guardar e trocar dados: pares nome-valor entre chaves, listas entre colchetes, como uma ficha de cadastro que qualquer linguagem consegue ler. O trecho é um arquivo JSON inteiro: o `package.json`, que descreve o projeto (nome, tipo de módulo, comandos). Aspas duplas em todos os nomes e sem vírgula depois do último item.",
   "origem": "thronfolge/package.json:1-9",
   "projeto": "thronfolge",
   "linguagem": "json",
   "codigo": "{\n  \"name\": \"thronfolge\",\n  \"private\": true,\n  \"type\": \"module\",\n  \"scripts\": {\n    \"start\": \"node servidor.js\",\n    \"test\": \"node --test\"\n  }\n}",
   "projetoPergunta": "thronfolge",
   "pergunta": "Por que a simulação fica separada da interface e é testada com `node --test`?",
   "alternativas": [
    {
     "texto": "Porque o navegador não consegue rodar a simulação.",
     "correta": false
    },
    {
     "texto": "Porque a simulação não depende da interface, e o Node, que já está disponível, a testa sem precisar instalar um motor de jogo.",
     "correta": true
    },
    {
     "texto": "Porque o framework do projeto obriga essa divisão.",
     "correta": false
    }
   ],
   "fonteMotivo": "`thronfolge/contexto.md:99-102` — o ambiente já tem Node e não tem Godot; um mapa político estático não justifica instalar um motor antes de validar o núcleo",
   "seguimento": "E qual o custo dessa escolha?",
   "respostaSeguimento": "Não documentado — prepare sua resposta.",
   "ondeEstudar": "EN: developer-roadmap/roadmaps/javascript/content/json@bFNvtHp97OzKnPJgr7WaH.md"
  },
  {
   "numero": 13,
   "nome": "Erros e exceções (try/catch)",
   "prereqs": [
    5,
    8
   ],
   "prereqsDepois": [],
   "explicacao": "Exceção é o aviso que o programa levanta quando algo dá errado, como o alarme de incêndio. `try` tenta executar; `catch` (ou `except`) diz o que fazer se o alarme tocar, para o programa não cair. No trecho, `personagem(...)` lança erro se o autor não existir; o `catch` captura o erro e devolve `valida: false` com o motivo.",
   "origem": "thronfolge/src/simulacao.js:280-284",
   "projeto": "thronfolge",
   "linguagem": "javascript",
   "codigo": "  try {\n    personagem(estado, acao.autor);\n  } catch {\n    return { valida: false, motivo: \"autor inexistente\" };\n  }",
   "projetoPergunta": "hub-integracoes",
   "pergunta": "Por que uma dependência fora do ar vira erro 503 e nunca derruba o processo?",
   "alternativas": [
    {
     "texto": "Porque o orquestrador não consegue reiniciar processos que caem.",
     "correta": false
    },
    {
     "texto": "Porque o teste de resiliência mostrou os processos morrendo quando o PostgreSQL reiniciava (evento `error` não tratado).",
     "correta": true
    },
    {
     "texto": "Porque o Fastify derruba o processo por padrão ao receber um 503.",
     "correta": false
    }
   ],
   "fonteMotivo": "`hub-integracoes/docs/decisoes.md:87` — \"o teste de resiliência mostrou os processos morrendo quando o PostgreSQL reiniciava (evento `error` não tratado).\"",
   "seguimento": "Como você garante que isso continua valendo?",
   "respostaSeguimento": "Custo não documentado como limitação; a fonte registra a condição do teste: \"o teste de resiliência falha se api ou relay reiniciarem, ou se algum pedido ficar sem resposta HTTP.\"",
   "ondeEstudar": "EN: developer-roadmap/roadmaps/python/content/error-handling@4XqSkc3Tuub-ZVXvGfMIT.md; freeCodeCamp/curriculum/structure/superblocks/python-v9.json (python-error-handling)"
  },
  {
   "numero": 15,
   "nome": "Classes, dataclasses e objetos imutáveis",
   "prereqs": [
    6,
    8
   ],
   "prereqsDepois": [],
   "explicacao": "Classe é um molde: define quais informações um tipo de coisa tem, como o formulário em branco de um cadastro. Cada objeto é um formulário preenchido. `@dataclass` gera o código chato do molde automaticamente; `frozen=True` impede alterar o objeto depois de criado. No trecho, `Licitacao` é o molde de uma contratação, com id, objeto, órgão, UF e modalidade.",
   "origem": "contratinho/contratinho/filtro.py:18-28",
   "projeto": "contratinho",
   "linguagem": "python",
   "codigo": "@dataclass(frozen=True, slots=True)\nclass Licitacao:\n    \"\"\"O que o radar precisa saber de uma contratação, independente da fonte.\n\n    Existe para que `filtro` não importe pypncp: a conversão fica em `fonte`.\n    \"\"\"\n\n    id: str\n    objeto: str\n    orgao: str\n    uf: str | None",
   "projetoPergunta": "atlas-cientifico",
   "pergunta": "Por que as revisões de medidas são append-only, com versão otimista?",
   "alternativas": [
    {
     "texto": "Porque corrigir uma leitura não pode apagar a evidência anterior, e dois revisores não devem sobrescrever um ao outro.",
     "correta": true
    },
    {
     "texto": "Porque o Postgres não permite UPDATE em tabelas com índice.",
     "correta": false
    },
    {
     "texto": "Para reduzir o espaço ocupado pelo histórico.",
     "correta": false
    }
   ],
   "fonteMotivo": "`atlas-cientifico/docs/decisoes.md:56` — \"Corrigir uma leitura não pode apagar a evidência anterior; dois revisores não devem sobrescrever um ao outro\"",
   "seguimento": "O que essa garantia não cobre?",
   "respostaSeguimento": "\"Banco impede UPDATE/DELETE; autor é declarado. Não equivale a assinatura ou revisão científica independente\"",
   "ondeEstudar": "EN: developer-roadmap/roadmaps/python/content/classes@AqwzR8dZKLQIoj_6KKZ3t.md; developer-roadmap/roadmaps/java/content/ (classes-and-objects). PT-BR: free-programming-books/books/free-programming-books-pt_BR.md L417 (Python), L258 (Java)"
  },
  {
   "numero": 17,
   "nome": "Expressões regulares",
   "prereqs": [
    9
   ],
   "prereqsDepois": [],
   "explicacao": "Expressão regular é um padrão de busca em texto, como um coringa de caça-palavras: \"qualquer dígito\", \"palavra inteira\", \"uma ou mais vezes\". No trecho, `\\b` marca fronteira de palavra: assim \"impressão\" não casa dentro de \"impressora\". O `r[...]+` aceita espaço, hífen ou barra entre as palavras do termo.",
   "origem": "contratinho/contratinho/filtro.py:131-134",
   "projeto": "contratinho",
   "linguagem": "python",
   "codigo": "    palavras = [_formas(p) for p in normalizar(termo).split()]\n    if not palavras:\n        return re.compile(r\"(?!)\")  # termo vazio nunca casa\n    return re.compile(rf\"\\b{r'[\\s\\-/]+'.join(palavras)}\\b\")",
   "projetoPergunta": "contratinho",
   "pergunta": "Por que o escopo inicial do Contratinho é só RJ e até R$ 250 mil?",
   "alternativas": [
    {
     "texto": "Porque a API do PNCP só devolve contratos do RJ.",
     "correta": false
    },
    {
     "texto": "Porque acima de R$ 250 mil a licitação exige outro tipo de cadastro.",
     "correta": false
    },
    {
     "texto": "Porque começar largo é receber cem avisos no primeiro dia e parar de ler todos eles.",
     "correta": true
    }
   ],
   "fonteMotivo": "`contratinho commit 1c84483` — \"Começar largo é receber cem avisos no primeiro dia e parar de ler todos eles\"",
   "seguimento": "E quando você amplia o escopo?",
   "respostaSeguimento": "Custo não documentado; a fonte diz que a ampliação \"está anotado no ROADMAP para ser cobrado quando a hora de ampliar chegar\".",
   "ondeEstudar": "EN: developer-roadmap/roadmaps/python/content/regular-expressions@7t6mJBsaFMWPi7o9fbhhq.md; freeCodeCamp/curriculum/structure/superblocks/javascript-v9.json (basic-regex)"
  },
  {
   "numero": 19,
   "nome": "Gerenciador de contexto (with / finally)",
   "prereqs": [
    13
   ],
   "prereqsDepois": [],
   "explicacao": "Algumas coisas precisam ser abertas e depois fechadas, como uma porta de geladeira, mesmo que algo dê errado no meio. O gerenciador de contexto garante o fechamento. No trecho, o `finally` fecha a conexão com o banco sempre, e o `except` desfaz (`rollback`) o que foi feito se houve erro; sem erro, o `commit` grava tudo.",
   "origem": "contratinho/contratinho/estado.py:30-40",
   "projeto": "contratinho",
   "linguagem": "python",
   "codigo": "    conexao = sqlite3.connect(caminho)\n    try:\n        conexao.execute(\"PRAGMA journal_mode=WAL\")\n        conexao.executescript(ESQUEMA)\n        yield conexao\n        conexao.commit()\n    except BaseException:\n        conexao.rollback()\n        raise\n    finally:\n        conexao.close()",
   "projetoPergunta": "contratinho",
   "pergunta": "Por que a marcação de \"já avisado\" é gravada depois de imprimir o aviso e não antes?",
   "alternativas": [
    {
     "texto": "Porque gravar no SQLite antes de imprimir é mais lento.",
     "correta": false
    },
    {
     "texto": "Porque repetir incomoda, mas perder o prazo custa dinheiro.",
     "correta": true
    },
    {
     "texto": "Porque a gravação precisa do texto já formatado do aviso.",
     "correta": false
    }
   ],
   "fonteMotivo": "`contratinho/README.md:126-128` — \"Repetir incomoda; perder o prazo custa dinheiro.\"",
   "seguimento": "O que acontece se o processo morrer no meio?",
   "respostaSeguimento": "\"Se o processo morrer entre imprimir e gravar, o aviso se repete na próxima rodada.\" (README.md:127)",
   "ondeEstudar": "EN: developer-roadmap/roadmaps/python/content/file-handling@Nf3kRDSl_vas6QPXG7eVa.md (uso mais comum do with). Sem item específico no G-curriculo.md para o padrão em si"
  },
  {
   "numero": 20,
   "nome": "SQL e consulta parametrizada",
   "prereqs": [
    4,
    6
   ],
   "prereqsDepois": [],
   "explicacao": "SQL é a linguagem para conversar com um banco de dados, que é uma planilha gigante organizada em tabelas. Um comando diz o que inserir, buscar ou alterar. Os pontos de interrogação `?` são lacunas preenchidas depois, com os valores enviados à parte; assim um texto malicioso nunca vira comando. No trecho, `INSERT OR IGNORE` grava o aviso e ignora se já existir.",
   "origem": "contratinho/contratinho/estado.py:65-68",
   "projeto": "contratinho",
   "linguagem": "python",
   "codigo": "    conexao.executemany(\n        \"INSERT OR IGNORE INTO visto (id, perfil, objeto, visto_em) VALUES (?, ?, ?, ?)\",\n        [(a.licitacao.id, a.perfil, a.licitacao.objeto[:500], agora) for a in achados],\n    )",
   "projetoPergunta": "contratinho",
   "pergunta": "Por que o estado da CLI é um SQLite e não um arquivo JSON?",
   "alternativas": [
    {
     "texto": "Porque o JSON não guarda datas.",
     "correta": false
    },
    {
     "texto": "Porque o Django exige SQLite para a CLI funcionar.",
     "correta": false
    },
    {
     "texto": "Porque JSON reescrito inteiro corrompe em interrupção, e o SQLite dá índice e transação sem dependência nova.",
     "correta": true
    }
   ],
   "fonteMotivo": "`contratinho/README.md:112-114` — \"JSON reescrito inteiro corrompe em interrupção; SQLite dá índice e transação sem dependência nova.\"",
   "seguimento": "E qual o custo dessa escolha?",
   "respostaSeguimento": "não documentado — prepare sua resposta",
   "ondeEstudar": "PT-BR: free-programming-books/courses/free-courses-pt_BR.md L103 (Database); free-programming-books/books/free-programming-books-pt_BR.md L113. EN: developer-roadmap/roadmaps/sql/content/basic-sql-syntax@JDDG4KfhtIlw1rkNCzUli.md; freeCodeCamp/curriculum/structure/superblocks/relational-databases-v9.json"
  },
  {
   "numero": 24,
   "nome": "Estatística básica (mediana, percentil)",
   "prereqs": [
    6,
    8
   ],
   "prereqsDepois": [],
   "explicacao": "A mediana é o valor do meio quando os números estão em ordem; ela não se deixa levar por um valor extremo, ao contrário da média. É como o salário \"típico\" de uma sala, mesmo que um colega ganhe milhões. No trecho, a função copia a lista, ordena, acha o meio e, se a quantidade for par, tira a média dos dois do meio.",
   "origem": "raio-x-patrimonial/app/lib/deputados.ts:81-88",
   "projeto": "raio-x-patrimonial",
   "linguagem": "ts",
   "codigo": "export function median(values: number[]) {\n  if (!values.length) return 0;\n  const sorted = [...values].sort((a, b) => a - b);\n  const middle = Math.floor(sorted.length / 2);\n  return sorted.length % 2\n    ? sorted[middle]\n    : (sorted[middle - 1] + sorted[middle]) / 2;\n}",
   "projetoPergunta": "raio-x-patrimonial",
   "pergunta": "Por que a síntese da comparação patrimonial usa mediana e não média?",
   "alternativas": [
    {
     "texto": "Porque a variação máxima passa de 5.000% e distorceria qualquer média.",
     "correta": true
    },
    {
     "texto": "Porque a mediana é mais simples de calcular em TypeScript.",
     "correta": false
    },
    {
     "texto": "Porque o TSE publica só medianas.",
     "correta": false
    }
   ],
   "fonteMotivo": "`raio-x-patrimonial commit d3c726d` — \"a variação máxima passa de 5.000% e distorceria qualquer média.\"",
   "seguimento": "O que a mediana não resolve?",
   "respostaSeguimento": "\"o percentual não é calculado quando a declaração de 2022 foi zero\" (commit d3c726d). Os valores são nominais (README.md:266).",
   "ondeEstudar": "Sem item específico no G-curriculo.md"
  },
  {
   "numero": 25,
   "nome": "APIs HTTP, rotas e requisições",
   "prereqs": [
    6,
    10,
    13
   ],
   "prereqsDepois": [],
   "explicacao": "API é um balcão de atendimento de um programa: você faz um pedido por um endereço (rota) e recebe uma resposta com um código numérico, como 200 (deu certo), 400 (pedido mal formado) e 401 (sem permissão). No trecho, o servidor responde 401 se o horário assinado estiver fora da tolerância e 400 se o pedido não passar na validação.",
   "origem": "hub-integracoes/backend/src/app.ts:371-382",
   "projeto": "hub-integracoes",
   "linguagem": "ts",
   "codigo": "    // Checked after the signature, so only a valid sender learns about clock skew.\n    // Inside the window, a replayed request is absorbed by the event-id dedupe.\n    if (!isFreshTimestamp(timestamp, Date.now(), config.WEBHOOK_TOLERANCE_SECONDS)) {\n      metrics.webhook('stale_timestamp');\n      return reply.code(401).send({ error: 'timestamp_out_of_tolerance', toleranceSeconds: config.WEBHOOK_TOLERANCE_SECONDS });\n    }\n\n    const parsed = orderSchema.safeParse(body.value);\n    if (!parsed.success) {\n      metrics.webhook('invalid_order');\n      return reply.code(400).send({ error: 'invalid_order', details: parsed.error.issues });\n    }",
   "projetoPergunta": "hub-integracoes",
   "pergunta": "Por que o serviço tem um `/health` separado de um `/ready`?",
   "alternativas": [
    {
     "texto": "Porque o Caddy exige duas rotas distintas de verificação.",
     "correta": false
    },
    {
     "texto": "Para não reiniciar um processo saudável só porque uma dependência transitória está indisponível.",
     "correta": true
    },
    {
     "texto": "Porque o `/ready` é mais barato e o `/health` testa o banco.",
     "correta": false
    }
   ],
   "fonteMotivo": "`hub-integracoes/docs/decisoes.md:23` — \"não reiniciar um processo saudável só porque uma dependência transitória está indisponível\"",
   "seguimento": "O que muda para quem monitora o serviço?",
   "respostaSeguimento": "Custo/limitação não documentado; a fonte registra só a consequência: \"monitoramento e orquestração devem usar `/ready` para tráfego e `/health` para liveness\".",
   "ondeEstudar": "PT-BR: free-programming-books/courses/free-courses-pt_BR.md L349 (Networking). EN: developer-roadmap/roadmaps/backend/content/how-does-the-internet-work@yCnn-NfSxIybUQ2iTuUGq.md e learn-about-apis@EwvLPSI6AlZ4TnNIJTZA4.md"
  },
  {
   "numero": 26,
   "nome": "Configuração por variável de ambiente",
   "prereqs": [
    3,
    25
   ],
   "prereqsDepois": [],
   "explicacao": "Variável de ambiente é um valor que fica fora do código, no computador que o executa, como o interruptor do prédio que o síndico regula sem mexer na fiação. Assim o mesmo programa roda em lugares diferentes. No trecho, a lista de sites permitidos vem da variável `ATRIBUICAO_ORIGENS` (CORS, a regra do navegador sobre quem pode chamar a API); o `*` (todos) é recusado de propósito.",
   "origem": "atribuicao-canais/app/main.py:116-122",
   "projeto": "atribuicao-canais",
   "linguagem": "python",
   "codigo": "ORIGENS = [o.strip() for o in os.environ.get(\"ATRIBUICAO_ORIGENS\", \"\").split(\",\") if o.strip() and o.strip() != \"*\"]\nif ORIGENS:\n    app.add_middleware(\n        CORSMiddleware,\n        allow_origins=ORIGENS,\n        allow_methods=[\"POST\", \"DELETE\"],\n        allow_headers=[\"Content-Type\"],",
   "projetoPergunta": "atribuicao-canais",
   "pergunta": "Por que o CORS só aceita as origens listadas em `ATRIBUICAO_ORIGENS` e ignora \"*\"?",
   "alternativas": [
    {
     "texto": "Porque o navegador bloqueia \"*\" quando há cookies.",
     "correta": false
    },
    {
     "texto": "Porque o Render não aceita \"*\" na configuração.",
     "correta": false
    },
    {
     "texto": "Porque, com \"*\", qualquer site poderia injetar eventos em nome dos próprios visitantes e distorcer a atribuição.",
     "correta": true
    }
   ],
   "fonteMotivo": "`atribuicao-canais commit 22632c6` — \"\"*\" é ignorado de propósito, porque qualquer site poderia injetar eventos em nome dos próprios visitantes e distorcer a atribuição.\"",
   "seguimento": "E qual o custo dessa escolha?",
   "respostaSeguimento": "não documentado — prepare sua resposta",
   "ondeEstudar": "Sem item específico no G-curriculo.md. Para CORS: developer-roadmap/roadmaps/backend/content/ (cors, https)"
  },
  {
   "numero": 27,
   "nome": "Armazenamento no navegador (localStorage)",
   "prereqs": [
    8,
    10
   ],
   "prereqsDepois": [],
   "explicacao": "O `localStorage` é uma gaveta que o navegador reserva para cada site, e o que se guarda ali continua depois de fechar a página. Só guarda texto, por isso o objeto é convertido em JSON antes (`JSON.stringify`). No trecho, o botão Salvar grava a partida na gaveta com uma chave (nome da etiqueta).",
   "origem": "thronfolge/src/interface.js:258-261",
   "projeto": "thronfolge",
   "linguagem": "javascript",
   "codigo": "  document.querySelector(\"#salvar\").addEventListener(\"click\", () => {\n    localStorage.setItem(CHAVE_SAVE, JSON.stringify({ estado, jogadorId, alvoId }));\n    informar(\"Partida salva neste navegador.\");\n  });",
   "projetoPergunta": "diario-glicemia",
   "pergunta": "Por que o service worker guarda no cache só a estrutura pública do site e não as respostas de arquivos do diário?",
   "alternativas": [
    {
     "texto": "Porque o cache do navegador não aceita respostas de API.",
     "correta": false
    },
    {
     "texto": "Porque um aparelho compartilhado guardaria fotos da criança num cache que sobrevive a \"apagar os dados do diário\".",
     "correta": true
    },
    {
     "texto": "Para o site carregar mais rápido.",
     "correta": false
    }
   ],
   "fonteMotivo": "`diario-glicemia commit 898c1be` — \"Um aparelho compartilhado guardaria fotos da criança num cache que sobrevive a \"apagar os dados do diário\".\"",
   "seguimento": "O que o usuário perde com isso?",
   "respostaSeguimento": "Não documentado para o modo Supabase; a fonte registra que a cópia em cache guarda só a estrutura pública, então o diário precisa de conexão para ler e gravar os registros.",
   "ondeEstudar": "EN: developer-roadmap/roadmaps/javascript/content/ (dom-apis); freeCodeCamp/curriculum/structure/superblocks/javascript-v9.json (dom-manipulation-and-events)"
  },
  {
   "numero": 28,
   "nome": "Funções assíncronas (async) e atualização otimista",
   "prereqs": [
    8,
    13,
    25
   ],
   "prereqsDepois": [],
   "explicacao": "Algumas tarefas demoram, como salvar na internet. Função assíncrona não trava o programa enquanto espera; `await` diz \"espere aqui o resultado\". Atualização otimista é mostrar o resultado na tela antes de a resposta chegar e desfazer se der erro, como riscar um item da lista antes de ter certeza de que a compra passou. No trecho, `apply` aplica, `save` salva e, se falhar, `rollback` desfaz.",
   "origem": "diario-glicemia/site/logic.js:42-46",
   "projeto": "diario-glicemia",
   "linguagem": "javascript",
   "codigo": "  async function optimisticCommit(apply,rollback,save){\n    apply();\n    try{await save();return true}\n    catch(error){rollback();throw error}\n  }",
   "projetoPergunta": "diario-glicemia",
   "pergunta": "Por que cada gravação envia só a linha alterada e não o dia inteiro?",
   "alternativas": [
    {
     "texto": "Para que duas pessoas registrando refeições diferentes no mesmo dia não apaguem o registro uma da outra.",
     "correta": true
    },
    {
     "texto": "Para economizar dados móveis do celular.",
     "correta": false
    },
    {
     "texto": "Porque o Supabase limita o tamanho de cada requisição.",
     "correta": false
    }
   ],
   "fonteMotivo": "`diario-glicemia/README.md:196` — \"Assim, duas pessoas registrando refeições diferentes no mesmo dia não apagam o registro uma da outra.\"",
   "seguimento": "E se duas pessoas editarem a mesma refeição ao mesmo tempo?",
   "respostaSeguimento": "\"Se duas pessoas editam *a mesma* refeição ao mesmo tempo, o site avisa do conflito; quem salvar por último, depois do aviso, vence.\" (README.md:196)",
   "ondeEstudar": "EN: developer-roadmap/roadmaps/javascript/content/ (asynchronous-javascript); freeCodeCamp/curriculum/structure/superblocks/javascript-v9.json (asynchronous-javascript). Atualização otimista: sem item específico no G-curriculo.md"
  },
  {
   "numero": 29,
   "nome": "Componentes React e servidor x cliente",
   "prereqs": [
    8,
    28
   ],
   "prereqsDepois": [],
   "explicacao": "React monta a tela a partir de peças reutilizáveis (componentes), como blocos de montar; cada peça cuida da sua parte. Parte do código roda no servidor, que prepara a página, e parte roda no navegador, que reage aos cliques. No trecho, a linha `\"use client\"` marca o componente para rodar no navegador, e os `useState`/`useEffect` importados guardam e reagem ao estado.",
   "origem": "raio-x-patrimonial/app/Dashboard.tsx:1-6",
   "projeto": "raio-x-patrimonial",
   "linguagem": "tsx",
   "codigo": "\"use client\";\n\nimport Link from \"next/link\";\nimport { useEffect, useMemo, useRef, useState } from \"react\";\n\nimport DeputyProfile from \"./DeputyProfile\";",
   "projetoPergunta": "raio-x-patrimonial",
   "pergunta": "Por que cada deputado tem uma página própria (`/deputado/<id>`), renderizada no servidor?",
   "alternativas": [
    {
     "texto": "Porque o React 19 não permite renderizar listas grandes no cliente.",
     "correta": false
    },
    {
     "texto": "Para o Google indexar cada deputado.",
     "correta": false
    },
    {
     "texto": "Porque é útil para apontar uma trajetória específica sem mandar a pessoa procurar na lista.",
     "correta": true
    }
   ],
   "fonteMotivo": "`raio-x-patrimonial/README.md:38-41` — \"útil para apontar uma trajetória específica sem mandar a pessoa procurar na lista.\"",
   "seguimento": "E qual o custo dessa escolha?",
   "respostaSeguimento": "não documentado — prepare sua resposta",
   "ondeEstudar": "EN: freeCodeCamp/curriculum/structure/superblocks/front-end-development-libraries-v9.json (react-fundamentals, react-state-hooks-and-routing)"
  }
 ],
 "apendice": [
  {
   "numero": 1,
   "nome": "Transações e travas de linha (FOR UPDATE)",
   "prereqs": [
    20,
    28
   ],
   "prereqsDepois": [],
   "explicacao": "Transação é um grupo de passos que vale como uma coisa só: ou todos acontecem, ou nenhum, como uma transferência em que o débito e o crédito não podem ficar pela metade. `FOR UPDATE` tranca a linha enquanto você trabalha nela, como uma sala de reunião com a porta trancada. No trecho, as contas são ordenadas por id e trancadas uma a uma, sempre na mesma ordem, para duas transferências não se esperarem para sempre.",
   "origem": "liquidacao-pix/internal/repository/transferencias.go:192-203",
   "projeto": "liquidacao-pix",
   "linguagem": "go",
   "codigo": "\tslices.Sort(ordenados)\n\tordenados = slices.Compact(ordenados)\n\n\tcontas := make(map[int64]ContaTravada, len(ordenados))\n\tfor _, id := range ordenados {\n\t\tvar c ContaTravada\n\t\tvar saldo int64\n\t\tvar mac []byte\n\t\terr := t.tx.QueryRow(ctx,\n\t\t\t`SELECT id, saldo_centavos, tecnica, auditoria_seq, auditoria_mac\n\t\t\t   FROM contas WHERE id = $1 FOR UPDATE`, id,\n\t\t).Scan(&c.ID, &saldo, &c.Tecnica, &c.AuditoriaSeq, &mac)",
   "projetoPergunta": "liquidacao-pix",
   "pergunta": "Por que READ COMMITTED com trava de linha (`FOR UPDATE`) em vez de SERIALIZABLE?",
   "alternativas": [
    {
     "texto": "Porque o Postgres 17 não oferece SERIALIZABLE.",
     "correta": false
    },
    {
     "texto": "Porque SERIALIZABLE abortaria transações em conflito e exigiria repetir, sem ganho aqui.",
     "correta": true
    },
    {
     "texto": "Porque SERIALIZABLE impede o uso de `FOR UPDATE`.",
     "correta": false
    }
   ],
   "fonteMotivo": "`liquidacao-pix/docs/adr/0002-idempotencia-e-travas.md` (seção Decisão, itens 1-3) — \"SERIALIZABLE abortaria transações em conflito e exigiria repetir, sem ganho aqui.\"",
   "seguimento": "Por que as contas são travadas uma a uma, em ordem crescente de id?",
   "respostaSeguimento": "\"Evita *deadlock* entre transferências cruzadas\" (MEMORIA_TECNICA.md:78). Custo da escolha: não documentado; a fonte registra a prova de mutação (sem ordenar as travas, o teste de concorrência acusa 189 deadlocks; MEMORIA_TECNICA.md, histórico de 2026-10-21, e commit ff07977).",
   "ondeEstudar": "EN: developer-roadmap/roadmaps/sql/content/ (transactions); developer-roadmap/roadmaps/backend/content/ (acid)"
  },
  {
   "numero": 2,
   "nome": "Idempotência",
   "prereqs": [
    20,
    25,
    28
   ],
   "prereqsDepois": [],
   "explicacao": "Operação idempotente é a que, repetida, tem o mesmo efeito de fazer uma vez só, como apertar o botão do elevador cinco vezes. Em sistemas que podem receber o mesmo aviso duas vezes, isso evita cobrar ou gravar em dobro. No trecho, `ON CONFLICT ... DO NOTHING` impede duplicar o evento que tenha o mesmo identificador externo.",
   "origem": "hub-integracoes/backend/src/app.ts:387-393",
   "projeto": "hub-integracoes",
   "linguagem": "ts",
   "codigo": "      const inserted = await client.query<{ id: string }>(\n        `INSERT INTO integration_events (tenant_id, source, external_event_id, order_id, payload)\n         VALUES ($1, 'demo-store', $2, $3, $4::jsonb)\n         ON CONFLICT (tenant_id, source, external_event_id) DO NOTHING\n         RETURNING id`,\n        [tenantId, order.eventId, order.orderId, JSON.stringify(order)],\n      );",
   "projetoPergunta": "hub-integracoes",
   "pergunta": "Por que a retenção limpa o payload do evento mas mantém a identidade dele, em vez de apagar a linha?",
   "alternativas": [
    {
     "texto": "Porque a LGPD obriga a guardar o `eventId` por cinco anos.",
     "correta": false
    },
    {
     "texto": "Porque o ERP exige o `eventId` em toda consulta de auditoria.",
     "correta": false
    },
    {
     "texto": "Porque apagar a linha faria a deduplicação esquecer o `eventId`, e um reenvio tardio do remetente geraria uma segunda entrega.",
     "correta": true
    }
   ],
   "fonteMotivo": "`hub-integracoes/docs/decisoes.md:67-73` (ADR-009) — \"apagar a linha faria a deduplicação esquecer o `eventId`, e um reenvio tardio do remetente geraria uma segunda entrega.\"",
   "seguimento": "E qual o custo dessa escolha?",
   "respostaSeguimento": "não documentado — prepare sua resposta",
   "ondeEstudar": "Sem item específico no G-curriculo.md"
  },
  {
   "numero": 3,
   "nome": "Concorrência (goroutines e agendadores)",
   "prereqs": [
    8,
    13,
    28
   ],
   "prereqsDepois": [],
   "explicacao": "Concorrência é fazer várias coisas ao mesmo tempo, como um restaurante com cozinheiros em paralelo. Em Go, uma goroutine é uma tarefa leve que roda em segundo plano. No trecho, uma função fica num laço movido por um relógio (`ticker`) que dispara a cada intervalo e fecha as rodadas vencidas; ela é lançada com `go` em `backend/cmd/api/main.go:27`.",
   "origem": "mesa-de-credito/backend/cmd/api/main.go:44-52",
   "projeto": "mesa-de-credito",
   "linguagem": "go",
   "codigo": "func closeExpiredRounds(ctx context.Context, repository *store.Postgres, interval time.Duration) {\n\tticker := time.NewTicker(interval)\n\tdefer ticker.Stop()\n\tfor range ticker.C {\n\t\tif _, err := repository.CloseExpiredRounds(ctx); err != nil {\n\t\t\tlog.Printf(\"closing expired rounds: %v\", err)\n\t\t}\n\t}\n}",
   "projetoPergunta": "mesa-de-credito",
   "pergunta": "Por que o isolamento é READ COMMITTED com bloqueio da linha do participante?",
   "alternativas": [
    {
     "texto": "Porque um teste real de concorrência levou a essa escolha.",
     "correta": true
    },
    {
     "texto": "Porque o Postgres só oferece esse nível de isolamento.",
     "correta": false
    },
    {
     "texto": "Porque o jogo tem centenas de jogadores simultâneos e precisa de leitura sem bloqueio.",
     "correta": false
    }
   ],
   "fonteMotivo": "`mesa-de-credito/docs/ROTEIRO_V1.md:160` — \"um teste real de concorrência levou à escolha de `READ COMMITTED` com bloqueio da linha do participante.\"",
   "seguimento": "O que não foi testado?",
   "respostaSeguimento": "Custo não documentado; a auditoria registra que não houve teste matando o processo ou o banco (docs/AUDITORIA_FASE_1A.md:59).",
   "ondeEstudar": "EN: developer-roadmap/roadmaps/golang/content/ (goroutines, channels)"
  },
  {
   "numero": 4,
   "nome": "HMAC e assinatura de mensagens",
   "prereqs": [
    4,
    17,
    25
   ],
   "prereqsDepois": [],
   "explicacao": "HMAC é um selo que prova que uma mensagem veio de quem conhece um segredo e não foi alterada, como o lacre numerado de uma embalagem. Quem recebe recalcula o selo e compara. O `timingSafeEqual` compara em tempo constante, para ninguém descobrir o selo pelo tempo que a comparação leva. No trecho, a função recusa um formato errado e só aceita se o selo recalculado for idêntico.",
   "origem": "hub-integracoes/backend/src/security.ts:12-17",
   "projeto": "hub-integracoes",
   "linguagem": "ts",
   "codigo": "export function verifySignature(rawBody: string, supplied: string | undefined, secret: string, timestamp: number): boolean {\n  if (!supplied || !/^sha256=[a-f0-9]{64}$/i.test(supplied)) return false;\n  const expected = Buffer.from(signPayload(rawBody, secret, timestamp), 'utf8');\n  const actual = Buffer.from(supplied.toLowerCase(), 'utf8');\n  return actual.length === expected.length && timingSafeEqual(actual, expected);\n}",
   "projetoPergunta": "hub-integracoes",
   "pergunta": "Por que a proteção contra replay usa o horário assinado (`<timestamp>.<corpo>`, janela de 300 s) e não um nonce por requisição?",
   "alternativas": [
    {
     "texto": "Porque o nonce exige um banco em memória no remetente.",
     "correta": false
    },
    {
     "texto": "Porque é o mesmo padrão de Stripe e Slack, conhecido por quem integra; e um nonce por requisição exigiria mais estado por pedido, quando o `eventId` já cumpre esse papel.",
     "correta": true
    },
    {
     "texto": "Porque a janela de 300 s é exigida pela LGPD.",
     "correta": false
    }
   ],
   "fonteMotivo": "`hub-integracoes/docs/decisoes.md:55` (ADR-007) — \"é o mesmo padrão de Stripe e Slack, conhecido por quem integra\"; \"exigiria mais estado por pedido, e o `eventId` já cumpre esse papel\"",
   "seguimento": "E qual o custo dessa escolha?",
   "respostaSeguimento": "\"o remetente precisa de relógio sincronizado.\" A mudança quebrou a compatibilidade do protocolo, \"aceitável porque ainda não havia remetente real.\"",
   "ondeEstudar": "EN: developer-roadmap/roadmaps/backend/content/ (authentication, jwt, https)"
  },
  {
   "numero": 5,
   "nome": "Outbox transacional e filas (SKIP LOCKED)",
   "prereqs": [
    20,
    28
   ],
   "prereqsDepois": [
    1
   ],
   "explicacao": "Fila é uma fila de mensagens a serem processadas, como as senhas de um banco. Outbox é gravar no mesmo banco, junto com a mudança, a mensagem a ser enviada, e um processo separado a publica na fila depois. `SKIP LOCKED` faz cada trabalhador pegar linhas que outro ainda não pegou, sem esperar. No trecho, a consulta pega os eventos ainda não publicados.",
   "origem": "hub-integracoes/backend/src/outbox-publisher.ts:12-19",
   "projeto": "hub-integracoes",
   "linguagem": "ts",
   "codigo": "      `SELECT id, integration_event_id, event_type, payload\n         FROM outbox_events\n        WHERE published_at IS NULL\n        ORDER BY created_at\n        FOR UPDATE SKIP LOCKED\n        LIMIT $1`,\n      [batchSize],\n    );",
   "projetoPergunta": "hub-integracoes",
   "pergunta": "Por que o pedido e a outbox são gravados na mesma transação, com um relay separado publicando no Redis Streams?",
   "alternativas": [
    {
     "texto": "Porque o Redis não aceita gravação direta da API.",
     "correta": false
    },
    {
     "texto": "Para garantir entrega exatamente uma vez.",
     "correta": false
    },
    {
     "texto": "Para manter confiável a fronteira de persistência e desacoplar integrações lentas, permitindo escalar workers.",
     "correta": true
    }
   ],
   "fonteMotivo": "`hub-integracoes/docs/decisoes.md:7` (ADR-001) — \"manter confiável a fronteira de persistência e desacoplar integrações lentas, permitindo escalar workers.\"",
   "seguimento": "E qual o custo dessa escolha?",
   "respostaSeguimento": "\"PostgreSQL e Redis não têm commit atômico conjunto; o relay pode republicar após falha entre `XADD` e atualização SQL.\" A entrega é at-least-once.",
   "ondeEstudar": "Sem item específico no G-curriculo.md"
  },
  {
   "numero": 6,
   "nome": "Encerramento limpo por sinais",
   "prereqs": [
    8,
    13
   ],
   "prereqsDepois": [],
   "explicacao": "Quando você fecha um programa com Ctrl+C, o sistema operacional manda um sinal. Um programa bem feito escuta o sinal e termina o que está fazendo antes de sair, como o garçom que serve o prato em andamento antes de fechar a casa. No trecho, `signal.NotifyContext` cria um contexto que é cancelado quando chega SIGINT (Ctrl+C) ou SIGTERM.",
   "origem": "liquidacao-pix/internal/processo/processo.go:33-36",
   "projeto": "liquidacao-pix",
   "linguagem": "go",
   "codigo": "// ContextoComSinais é cancelado no SIGINT ou SIGTERM.\nfunc ContextoComSinais() (context.Context, context.CancelFunc) {\n\treturn signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)\n}",
   "projetoPergunta": "liquidacao-pix",
   "pergunta": "Por que Redis Streams com grupo de consumo e não Pub/Sub?",
   "alternativas": [
    {
     "texto": "Porque no Stream a mensagem fica guardada até o `XACK`, e o Pub/Sub não guarda mensagem.",
     "correta": true
    },
    {
     "texto": "Porque o Pub/Sub não existe na versão 7 do Redis.",
     "correta": false
    },
    {
     "texto": "Porque o Streams entrega cada mensagem exatamente uma vez.",
     "correta": false
    }
   ],
   "fonteMotivo": "`liquidacao-pix commit c6a8a86` — \"Streams em vez de Pub/Sub: a mensagem fica guardada até o XACK\"",
   "seguimento": "E o que isso custa nas retentativas?",
   "respostaSeguimento": "\"Erros permanentes ... passam pelas mesmas retentativas que os temporários antes de morrer. É mais lento\" (docs/adr/0003-redis-streams-retentativas-e-orfas.md, Consequências). RabbitMQ foi recusado por ser \"mais um sistema para operar\".",
   "ondeEstudar": "Sem item específico no G-curriculo.md"
  },
  {
   "numero": 7,
   "nome": "Segurança no banco (RLS) e login PKCE",
   "prereqs": [
    20,
    25
   ],
   "prereqsDepois": [],
   "explicacao": "RLS (row level security) faz o próprio banco decidir quais linhas cada usuário vê, como um arquivo em que cada pessoa só consegue abrir a própria pasta. PKCE é um jeito de login em que o navegador prova que quem terminou o login é o mesmo que o começou. No trecho, `enable row level security` liga a proteção em cada tabela; as regras (políticas) vêm em outro trecho da migração.",
   "origem": "diario-glicemia/supabase/migrations/20260927120000_diario.sql:184-192",
   "projeto": "diario-glicemia",
   "linguagem": "sql",
   "codigo": "alter table public.diarios         enable row level security;\nalter table public.membros         enable row level security;\nalter table public.convites        enable row level security;\nalter table public.dias            enable row level security;\nalter table public.refeicoes       enable row level security;\nalter table public.hipos           enable row level security;\nalter table public.extras          enable row level security;\nalter table public.sensor_dias     enable row level security;\nalter table public.sensor_leituras enable row level security;",
   "projetoPergunta": "diario-glicemia",
   "pergunta": "Por que o site fala direto com o Postgres do Supabase, com segurança em Row Level Security, em vez de ter um servidor próprio?",
   "alternativas": [
    {
     "texto": "Porque o Supabase proíbe servidores intermediários.",
     "correta": false
    },
    {
     "texto": "Porque um servidor próprio seria mais uma coisa para manter e atualizar.",
     "correta": true
    },
    {
     "texto": "Porque o Cloudflare Workers não executa código de servidor.",
     "correta": false
    }
   ],
   "fonteMotivo": "`diario-glicemia/README.md:191` — \"Um servidor próprio seria mais uma coisa para manter e atualizar.\"",
   "seguimento": "Por que Supabase e não MongoDB ou SQLite?",
   "respostaSeguimento": "Custo da escolha: não documentado. Sobre MongoDB e SQLite a fonte diz: \"nenhum dos dois oferece acesso seguro direto do navegador sem uma API no meio.\" (README.md:191)",
   "ondeEstudar": "EN: developer-roadmap/roadmaps/backend/content/ (authentication)"
  },
  {
   "numero": 8,
   "nome": "Injeção de dependência (Spring)",
   "prereqs": [
    15,
    8
   ],
   "prereqsDepois": [],
   "explicacao": "Injeção de dependência é receber de fora o que a peça precisa, em vez de ela mesma ir buscar ou construir, como o chef que recebe os ingredientes na bancada. Em Spring, a anotação `@Component` registra a classe, e o Spring entrega ao construtor os objetos que ele pede. No trecho, o construtor pede `ProcessamentoProperties` e `ObjectMapper`.",
   "origem": "atlas-cientifico/api/src/main/java/dev/atlas/documentos/ExtratorPdfIsolado.java:17-25",
   "projeto": "atlas-cientifico",
   "linguagem": "java",
   "codigo": "@Component\npublic class ExtratorPdfIsolado {\n    private final ProcessamentoProperties properties;\n    private final ObjectMapper mapper;\n    private final Semaphore capacidade = new Semaphore(2);\n\n    public ExtratorPdfIsolado(ProcessamentoProperties properties, ObjectMapper mapper) {\n        this.properties = properties; this.mapper = mapper;\n    }",
   "projetoPergunta": "atlas-cientifico",
   "pergunta": "Por que o PDFBox roda numa JVM filha com heap limitado e prazo de parede?",
   "alternativas": [
    {
     "texto": "Porque o Spring Boot não carrega o PDFBox na mesma JVM.",
     "correta": false
    },
    {
     "texto": "Porque a JVM filha extrai o texto mais rápido.",
     "correta": false
    },
    {
     "texto": "Porque o limite de páginas não controla PDF lento ou explosão de memória dentro da API.",
     "correta": true
    }
   ],
   "fonteMotivo": "`atlas-cientifico/docs/decisoes.md:53` — \"O limite de páginas não controla PDF lento ou explosão de memória dentro da API\"",
   "seguimento": "O que essa solução ainda não resolve?",
   "respostaSeguimento": "\"Ainda lê o volume permitido e não é sandbox de SO; PDFs hostis exigem defesa adicional\"",
   "ondeEstudar": "EN: developer-roadmap/roadmaps/java/content/ (spring-spring-boot)"
  },
  {
   "numero": 9,
   "nome": "Memorização (cache de resultado de função)",
   "prereqs": [
    8,
    17
   ],
   "prereqsDepois": [],
   "explicacao": "Memorizar é guardar o resultado de um cálculo para não refazê-lo, como anotar a conta que acabou de fazer na calculadora. Se a mesma pergunta voltar, a resposta vem do caderno. No trecho, `@lru_cache(maxsize=2048)` guarda até 2048 padrões de regex já montados; um termo repetido não é recompilado.",
   "origem": "contratinho/contratinho/filtro.py:120-125",
   "projeto": "contratinho",
   "linguagem": "python",
   "codigo": "@lru_cache(maxsize=2048)\ndef _padrao(termo: str) -> re.Pattern[str]:\n    \"\"\"Regex de um termo: palavra inteira, plural tolerado, espaço flexível.\n\n    Palavra inteira evita que 'impressão' case com 'impressora' — a razão de\n    `excluir` existir seria metade perdida se a busca fosse substring solta.",
   "projetoPergunta": "atribuicao-canais",
   "pergunta": "Por que o cache do painel usa uma versão dos dados mantida por triggers e não uma assinatura por contagem ou ids?",
   "alternativas": [
    {
     "texto": "Porque, sem AUTOINCREMENT, o SQLite reaproveita o id da última linha apagada.",
     "correta": true
    },
    {
     "texto": "Porque triggers são mais rápidas que contar linhas.",
     "correta": false
    },
    {
     "texto": "Porque o Postgres não permite contar linhas em cache.",
     "correta": false
    }
   ],
   "fonteMotivo": "`atribuicao-canais/CONTEXTO.md:228-232` (commit b85b615) — \"Descartada a assinatura por contagem/ids: sem AUTOINCREMENT o SQLite reaproveita o id da última linha apagada.\"",
   "seguimento": "E qual o custo dessa escolha?",
   "respostaSeguimento": "não documentado — prepare sua resposta",
   "ondeEstudar": "Sem item específico no G-curriculo.md"
  }
 ],
 "entrevistas": [
  {
   "projeto": "atlas-cientifico",
   "aviso": "",
   "pitch": "O problema: comparar estudos científicos e conferir, para cada valor, a página e o trecho de origem, preservando valor e unidade originais (README.md:3, :13). Eu construí, com implementação feita pelo Codex e revisão do Claude (docs/revisao-cruzada.md:186; docs/handoff-codex.md) e parte das decisões delegada (decisoes.md:5, :47), uma API em Java/Spring com PostgreSQL, em que a fila é durável no próprio banco, o PDF é lido em processo isolado e as revisões de medidas são append-only. O que o projeto promete e o que não promete está escrito nas decisões, junto com cada limite.",
   "decisoes": [
    {
     "pergunta": "Por que fila no PostgreSQL e não Kafka?",
     "resposta": "Inserir comando e evento na mesma transação elimina a janela de gravação/publicação, e o UPDATE condicional da reserva, com token, permite consumidores concorrentes sem outro serviço. Kafka era o desenho-alvo inicial, mas a nota diz que não há necessidade demonstrada dele.",
     "fonte": "atlas-cientifico/docs/decisoes.md:51; commit d562fde; docs/especificacao.md:77 — \"Inserir comando e evento na mesma transação elimina a janela de gravação/publicação; o UPDATE condicional da reserva (com token) permite consumidores concorrentes sem outro serviço\"",
     "custo": "\"Não promete exatamente uma vez nem substitui medição de escala\""
    },
    {
     "pergunta": "Por que o PDFBox roda numa JVM filha?",
     "resposta": "Porque o limite de páginas não controla PDF lento ou explosão de memória dentro da API. A JVM filha tem heap limitado, prazo de parede e o processo morre ao estourar.",
     "fonte": "atlas-cientifico/docs/decisoes.md:53; commit 82fd90d — \"O limite de páginas não controla PDF lento ou explosão de memória dentro da API\"",
     "custo": "\"Ainda lê o volume permitido e não é sandbox de SO; PDFs hostis exigem defesa adicional\""
    },
    {
     "pergunta": "Por que uma chave compartilhada na API antes de existirem contas de usuário?",
     "resposta": "Porque a chave é o menor controle que impede uma instância exposta de ficar aberta. Contas e dono por documento ficaram adiados. A decisão foi tomada pelo revisor, por delegação do autor (docs/decisoes.md:5).",
     "fonte": "atlas-cientifico/docs/decisoes.md:10 (e :24); commit 38731f2 — \"a chave é o menor controle que impede uma instância exposta de ficar aberta\"",
     "custo": "\"Não é autenticação de usuários. Quem tem a chave vê tudo, e o upload duplicado ainda revela que o arquivo já existia.\""
    },
    {
     "pergunta": "Por que o catálogo não funde obras silenciosamente?",
     "resposta": "Porque DOI e OpenAlex ID podem discordar, e título de fonte não é identidade suficiente. O catálogo guarda snapshots de metadados.",
     "fonte": "atlas-cientifico/docs/decisoes.md:54; commit f4d7a11 — \"DOI e OpenAlex ID podem discordar; título de fonte não é identidade suficiente\"",
     "custo": "\"Segunda fonte foi simulada no teste, não integrada\""
    },
    {
     "pergunta": "Por que revisões append-only com versão otimista?",
     "resposta": "Porque corrigir uma leitura não pode apagar a evidência anterior, e dois revisores não devem sobrescrever um ao outro.",
     "fonte": "atlas-cientifico/docs/decisoes.md:56; commit 4a6b2e1 — \"Corrigir uma leitura não pode apagar a evidência anterior; dois revisores não devem sobrescrever um ao outro\"",
     "custo": "\"Banco impede UPDATE/DELETE; autor é declarado. Não equivale a assinatura ou revisão científica independente\""
    },
    {
     "pergunta": "Por que o registro de medida é idempotente e o estado entra na chave?",
     "resposta": "Para que um registro não sobrescreva a afirmação de outro. Antes, reenviar a mesma medida criava duas linhas. A decisão está na tabela \"Tomadas em 2026-10-24 (revisor, por delegação do autor)\" (decisoes.md:5, :11).",
     "fonte": "atlas-cientifico/docs/decisoes.md:11; commit b11f1e8 — \"O estado entra na chave para um registro não sobrescrever a afirmação de outro.\"",
     "custo": "\"A listagem devolve uma linha por evidência.\""
    },
    {
     "pergunta": "Por que Argon2id e sessão opaca, e não JWT?",
     "resposta": "Porque JWT dispensa o banco, mas não pode ser revogado antes de expirar. Uso `spring-security-crypto`, sem o Spring Security completo.",
     "fonte": "atlas-cientifico/docs/contas-e-hospedagem.md:15; commit 26cd28f — \"JWT dispensa o banco mas não pode ser revogado antes de expirar\"",
     "custo": "a sessão opaca \"exige uma consulta por requisição\" (:15); Argon2id com \"Custo não calibrado sob carga\" (:28)."
    },
    {
     "pergunta": "Por que a interface é HTML/JS puro e não React?",
     "resposta": "Porque os fluxos solicitados foram demonstrados sem introduzir build/frontend novo. React/TS estava previsto na especificação para o grafo e a matriz navegáveis.",
     "fonte": "atlas-cientifico/docs/decisoes.md:59 — \"Os fluxos solicitados foram demonstrados sem introduzir build/frontend novo\"",
     "custo": "\"Não chamar o protótipo de frontend final; revisar a decisão se estado/complexidade exigir\""
    },
    {
     "pergunta": "Por que não integrar o Sci-Hub?",
     "resposta": "Porque não há API documentada nem base de permissão que eu tenha verificado, e há decisões judiciais contra o serviço. Só reavalio se surgir base legal documentada.",
     "fonte": "atlas-cientifico/docs/especificacao.md:44 — \"Não há API documentada nem base de permissão que eu tenha verificado, e há decisões judiciais contra o serviço.\"",
     "custo": "não documentado. Condição de revisão: \"Reavaliar apenas se surgir base legal documentada.\""
    }
   ],
   "semMotivo": [
    "Java 21 e Spring Boot como stack — README.md:3.",
    "PostgreSQL 18 em Docker — README.md:44.",
    "Testcontainers para testes de integração — README.md:28.",
    "Playwright com Chromium para teste de interface — README.md:29.",
    "Migrações Flyway V1 a V20 — api/src/main/resources/db/migration/.",
    "Orçamento zero (sem AWS, serviços ou modelos pagos) — README.md:9; docs/decisoes.md:47.",
    "Sem Kubernetes — docs/especificacao.md:84.",
    "OpenTelemetry com Jaeger como opt-in local — docs/operacao.md:51 (desligada por padrão); o motivo está em docs/decisoes.md:60 (\"Atender observabilidade sem enviar dados para fornecedor nem depender de orçamento\"); a escolha da ferramenta não tem motivo escrito."
   ],
   "dificeis": [
    {
     "pergunta": "Onde isso quebra em escala?",
     "resposta": "Documentado: a fila no Postgres \"não promete exatamente uma vez nem substitui medição de escala\" (decisoes.md:51), e o Argon2id tem \"custo não calibrado sob carga\" (contas-e-hospedagem.md:28)."
    },
    {
     "pergunta": "O que o sistema não garante?",
     "resposta": "Documentado: a chave compartilhada não é autenticação de usuários; o PDFBox isolado não é sandbox de SO; as revisões não equivalem a revisão científica independente (decisoes.md:10, :53, :56)."
    },
    {
     "pergunta": "O que você faria diferente?",
     "resposta": "Documentado em parte: revisar a interface se estado/complexidade exigir (decisoes.md:59) e reavaliar o Kafka só com necessidade demonstrada. O resto: prepare sua resposta."
    },
    {
     "pergunta": "Como você testou?",
     "resposta": "Os relatórios citam Testcontainers e Playwright (README.md:28-29), sem motivo escrito. Cobertura e resultados: prepare sua resposta."
    },
    {
     "pergunta": "O que foi seu e o que foi de ferramenta ou IA?",
     "resposta": "Documentado: o Codex implementou (ex.: \"Cinco commits do Codex (V16, Argon2id e sessões, …)\", revisao-cruzada.md:186). O Claude revisou e fez os pushs (handoff-codex.md:3; decisoes.md:63). Decisões em decisoes.md:5-18 foram do revisor, por delegação; as de :49-61 vieram depois de o autor autorizar \"tomar decisões com boas práticas\" (:47). A sua parte: prepare sua resposta."
    }
   ]
  },
  {
   "projeto": "atribuicao-canais",
   "aviso": "",
   "pitch": "O problema: saber de onde vêm os clientes de um site e qual canal recebe o crédito por cada conversão, inclusive quando a pessoa começa no celular e compra no computador, respeitando a LGPD (CONTEXTO.md:9-11). O uso declarado é portfólio, sem dados reais de ninguém (CONTEXTO.md:13). Eu construí uma API em FastAPI que registra eventos, junta aparelhos só com identificação própria (login ou formulário), calcula modelos de atribuição (incluindo Markov de 1ª e 2ª ordem) e mede efeito causal com grupo de controle.",
   "decisoes": [
    {
     "pergunta": "Como você junta os aparelhos da mesma pessoa?",
     "resposta": "Só por identificação própria, login ou formulário. Sem isso não há junção confiável entre aparelhos, e o que promete isso usa dados de terceiros ou fingerprinting, que a LGPD e os navegadores combatem. Descartei o union-find ligando tudo que se toca.",
     "fonte": "atribuicao-canais/CONTEXTO.md:99-101; commit f5a59b6 — \"Sem login ou formulário, não há junção confiável entre aparelhos. O que promete isso usa dados de terceiros (Google/Meta) ou fingerprinting, que a LGPD e os navegadores combatem.\"",
     "custo": "\"O custo desse erro é um toque perdido, em vez de duas jornadas corrompidas.\" (commit f5a59b6). No computador compartilhado, o union-find funde duas pessoas numa só."
    },
    {
     "pergunta": "Por que Markov de 1ª e 2ª ordem?",
     "resposta": "Porque a 1ª ordem não lembra o canal anterior, e a 2ª lembra, ao custo de estimar ~74 estados em vez de 9 com o mesmo volume de jornadas. Mostro as duas no painel.",
     "fonte": "atribuicao-canais/CONTEXTO.md:102-104; commit ab9600c — \"a 2ª lembra, ao custo de estimar ~74 estados em vez de 9 com o mesmo volume de jornadas.\"",
     "custo": "\"com os dados fictícios são 74 estados em vez de 9, cada um estimado com menos jornadas.\" (commit ab9600c)"
    },
    {
     "pergunta": "Por que não usar Shapley?",
     "resposta": "Porque, com a função de valor usual, ele se reduz a dividir cada conversão igualmente entre os canais distintos da jornada. Depois o Shapley voltou só como referência do gerador de dados.",
     "fonte": "atribuicao-canais/CONTEXTO.md:105-107; commit ab9600c; commit 89352ed — \"Shapley foi descartado: com a função de valor usual [...] ele se reduz a dividir cada conversão igualmente entre os canais distintos da jornada.\"",
     "custo": "não documentado."
    },
    {
     "pergunta": "Atribuição não é a mesma coisa que efeito causal?",
     "resposta": "Não: os modelos dividem as compras entre os canais do caminho, mas nenhum sabe o que teria acontecido sem o canal. Por isso separo o crédito por modelo do efeito causal e meço o efeito com grupo de controle (teste de incrementalidade, ghost ads).",
     "fonte": "atribuicao-canais commit c81d0ff; CONTEXTO.md:108-113 — \"Os modelos de atribuição dividem as compras entre os canais do caminho, mas nenhum sabe o que teria acontecido sem o canal.\"",
     "custo": "\"Com as 2.000 pessoas padrão, nenhum dos dois testes distingue o efeito de zero\" (commit c81d0ff). Com 20.000 pessoas, a medida de Social pago fica abaixo do real por diluição (CONTEXTO.md:114-118)."
    },
    {
     "pergunta": "Como você trata o consentimento?",
     "resposta": "Separado por finalidade (medição e junção entre aparelhos), com caixas desmarcadas. A versão anterior tinha um \"sim\" único, e a LGPD considera nula a autorização genérica (art. 8º, §4º).",
     "fonte": "atribuicao-canais commit c3e4898; README.md:160-161 — \"A LGPD considera nula a autorização genérica (art. 8º, §4º); cada finalidade precisa de um sim próprio.\"",
     "custo": "não documentado."
    },
    {
     "pergunta": "Por que HMAC-SHA256 para pseudonimizar e-mail e não hash puro?",
     "resposta": "Porque e-mail tem pouca entropia.",
     "fonte": "atribuicao-canais/README.md:166-167; CONTEXTO.md:291-292 — \"HMAC-SHA256 com chave em vez de hash puro, porque e-mail tem pouca entropia.\"",
     "custo": "não documentado (a chave fica fora do repositório, sorteada pelo Render: commit 517aa9f)."
    },
    {
     "pergunta": "Por que o CORS só aceita origens listadas?",
     "resposta": "Porque \"*\" é ignorado de propósito: qualquer site poderia injetar eventos em nome dos próprios visitantes e distorcer a atribuição. O cabeçalho `Authorization` também não é liberado.",
     "fonte": "atribuicao-canais commit 22632c6; CONTEXTO.md:223-226 — \"\\\"*\\\" é ignorado de propósito, porque qualquer site poderia injetar eventos em nome dos próprios visitantes e distorcer a atribuição.\"",
     "custo": "não documentado."
    },
    {
     "pergunta": "Por que limite de requisições por IP?",
     "resposta": "Porque, sem limite, qualquer um inventava `anon_ids` e enchia o banco de eventos falsos, distorcendo a atribuição, ou repetia pedidos de código de exclusão sem parar.",
     "fonte": "atribuicao-canais commit 744cff0; CONTEXTO.md:234-237 — \"Sem limite, qualquer um inventava anon_ids e enchia o banco de eventos falsos, distorcendo a atribuição\"",
     "custo": "\"Limite conhecido: o contador é por processo. Com várias instâncias, ele vai para o Redis ou para o proxy.\" (commit 744cff0)"
    },
    {
     "pergunta": "Por que o bootstrap reamostra pessoas e não jornadas?",
     "resposta": "Porque as jornadas de uma mesma pessoa não são independentes. O intervalo de 95% do crédito sai desse bootstrap.",
     "fonte": "atribuicao-canais commit 0b063b9; README.md:152-153 — \"A reamostragem é por pessoa, não por jornada, porque as jornadas de uma mesma pessoa não são independentes.\"",
     "custo": "\"Custo: ~3 s com 100 réplicas\" (commit 0b063b9)."
    },
    {
     "pergunta": "Como funciona o cache do painel?",
     "resposta": "A versão dos dados é mantida por triggers. Descartei a assinatura por contagem ou ids porque, sem AUTOINCREMENT, o SQLite reaproveita o id da última linha apagada.",
     "fonte": "atribuicao-canais/CONTEXTO.md:228-232 (commit b85b615) — \"Descartada a assinatura por contagem/ids: sem AUTOINCREMENT o SQLite reaproveita o id da última linha apagada.\"",
     "custo": "não documentado."
    },
    {
     "pergunta": "Por que retenção de 13 meses?",
     "resposta": "Porque 13 meses é referência da CNIL, e a LGPD não fixa prazo.",
     "fonte": "atribuicao-canais/CONTEXTO.md:294 — \"referência da CNIL; a LGPD não fixa prazo\"",
     "custo": "não documentado."
    }
   ],
   "semMotivo": [
    "Migração para PostgreSQL como banco principal — CONTEXTO.md:126; commit 3964f10 (corpo vazio).",
    "FastAPI como framework da API — CONTEXTO.md:284.",
    "Render como destino da publicação (Railway aparece como alternativa, sem motivo da escolha) — CONTEXTO.md:83; render.yaml."
   ],
   "dificeis": [
    {
     "pergunta": "Seus dados são reais? O resultado vale para um negócio?",
     "resposta": "Documentado: o uso é de portfólio, com dados fictícios e sem dados reais de ninguém (CONTEXTO.md:13). Com as 2.000 pessoas padrão, nenhum dos dois testes de incrementalidade distingue o efeito de zero (commit c81d0ff)."
    },
    {
     "pergunta": "Onde isso quebra em escala?",
     "resposta": "Documentado: o limite de requisições é por processo e, com várias instâncias, precisa ir para o Redis ou para o proxy (commit 744cff0). O bootstrap custa ~3 s com 100 réplicas (commit 0b063b9)."
    },
    {
     "pergunta": "O que você faria diferente?",
     "resposta": "Documentado em parte: com 20.000 pessoas, a medida de Social pago fica abaixo do real por diluição (CONTEXTO.md:114-118). O resto: prepare sua resposta."
    },
    {
     "pergunta": "Como você testou?",
     "resposta": "Há menção a teste que registra a limitação da 1ª ordem (commit ab9600c). Estratégia completa: prepare sua resposta."
    },
    {
     "pergunta": "O que foi seu e o que foi de ferramenta ou IA?",
     "resposta": "Não documentado nos relatórios — prepare sua resposta."
    }
   ]
  },
  {
   "projeto": "contratinho",
   "aviso": "",
   "pitch": "O problema: quem vende para o governo precisa abrir o portal do PNCP todo dia, e quem esquece de olhar perde o prazo (README.md:6-8). O Contratinho faz a varredura, filtra pelo perfil e avisa só o que é novo. Eu construí uma CLI e uma versão web em Django (monólito modular com HTML no servidor) e guardo em SQLite o que já foi avisado.",
   "decisoes": [
    {
     "pergunta": "Por que um monólito Django e não microserviços?",
     "resposta": "Porque o Django oferece autenticação, sessões, CSRF, ORM e migrações integrados, e não há evidência para microserviços agora. O status do ADR 001 é \"aceito para o MVP\".",
     "fonte": "contratinho/docs/ARQUITETURA.md:5-7 e :17 — \"Django oferece autenticação, sessões, CSRF, ORM e migrações integrados.\"",
     "custo": "não documentado. A fonte afirma só que PostgreSQL é o banco de produção previsto (ARQUITETURA.md:8)."
    },
    {
     "pergunta": "Por que duas fontes do PNCP, uma na CLI e outra na web?",
     "resposta": "Porque a rota documentada não sustentou o produto sozinha. A CLI usa a API de consulta versionada (via `pypncp`) e a web usa a busca do próprio portal; a API não respondeu durante a validação de 22/09/2026.",
     "fonte": "contratinho/README.md:104-110; docs/ARQUITETURA.md:23-26 — \"a rota documentada não sustentou o produto sozinha\"",
     "custo": "\"A rota de busca não possui contrato público versionado, portanto deve ser monitorada.\" (ARQUITETURA.md:25-26). O README chama a duplicação de \"consciente\"."
    },
    {
     "pergunta": "Por que SQLite para o estado da CLI?",
     "resposta": "Porque JSON reescrito inteiro corrompe em interrupção, e o SQLite dá índice e transação sem dependência nova.",
     "fonte": "contratinho/README.md:112-114; commit 6a1bcf8 — \"JSON reescrito inteiro corrompe em interrupção; SQLite dá índice e transação sem dependência nova.\"",
     "custo": "não documentado."
    },
    {
     "pergunta": "Por que a marcação de \"já avisado\" é gravada depois de imprimir?",
     "resposta": "Porque repetir incomoda, mas perder o prazo custa dinheiro.",
     "fonte": "contratinho/README.md:126-128; commit 6a1bcf8 — \"Repetir incomoda; perder o prazo custa dinheiro.\"",
     "custo": "\"Se o processo morrer entre imprimir e gravar, o aviso se repete na próxima rodada.\" (README.md:127)"
    },
    {
     "pergunta": "Por que os perfis têm lista de exclusão?",
     "resposta": "Porque, sem exclusão, a ferramenta devolve ruído, o usuário para de ler os avisos e ela vira enfeite.",
     "fonte": "contratinho/README.md:116-120 — \"Sem exclusão a ferramenta devolve ruído, o usuário para de ler os avisos, e vira enfeite.\"",
     "custo": "não documentado."
    },
    {
     "pergunta": "Por que o escopo inicial é só RJ e até R$ 250 mil?",
     "resposta": "Porque começar largo é receber cem avisos no primeiro dia e parar de ler todos eles. A ampliação está anotada no ROADMAP.",
     "fonte": "contratinho commit 1c84483 — \"Começar largo é receber cem avisos no primeiro dia e parar de ler todos eles\"",
     "custo": "não documentado; a ampliação \"está anotado no ROADMAP para ser cobrado quando a hora de ampliar chegar\"."
    },
    {
     "pergunta": "Por que consultar os anexos e datas do edital só no primeiro clique do detalhe?",
     "resposta": "Porque o primeiro clique é o momento em que o usuário decide e a consulta se paga. A consulta tem uma tentativa e sem retentativa, e é gravada mesmo no fracasso, para que um PNCP instável não vire uma consulta por clique.",
     "fonte": "contratinho/docs/WEB.md:79-80 e :83-88 — \"o momento em que o usuário decide e a consulta se paga\"",
     "custo": "\"Não verificado contra a API real.\" (WEB.md:91-92). A chamada ocorre dentro da requisição web, com timeout de oito segundos."
    },
    {
     "pergunta": "Por que aviso por e-mail e não só o site?",
     "resposta": "Porque um site que exige lembrar de entrar não resolve o problema que abriu o projeto. WhatsApp fica fora até haver usuário validado.",
     "fonte": "contratinho/docs/PRODUTO.md:38-41; README.md:8 — \"um site que exige lembrar de entrar não resolve o problema que abriu o projeto\"",
     "custo": "WhatsApp \"com custo e burocracia de API que só se pagam depois\" (PRODUTO.md:40-41). O envio existe: `send_alerts` (contratinho/web/management/commands/send_alerts.py), commit 7fdd33d, docs/WEB.md:99-123, PRODUTO.md:38-39. A frase de docs/WEB.md:176 (\"Alertas por e-mail ainda não são enviados\") ficou desatualizada: veio do commit 7494fbd (22/09/2026 22:18), anterior ao 7fdd33d (23/09/2026 00:37). Sem `CONTRATINHO_SMTP_HOST`, a mensagem sai no terminal."
    }
   ],
   "semMotivo": [
    "Painel administrativo próprio no lugar do admin padrão do Django — commit a66a7d5.",
    "Ruff e pytest no CI — .github/workflows/ci.yml."
   ],
   "dificeis": [
    {
     "pergunta": "O que está sem verificar?",
     "resposta": "Documentado: a consulta de detalhe \"não verificada contra a API real\" (WEB.md:91-92) e a rota de busca da web, sem contrato público versionado, que deve ser monitorada (ARQUITETURA.md:25-26)."
    },
    {
     "pergunta": "O que acontece se o processo cair no meio de uma rodada?",
     "resposta": "Documentado: o aviso se repete na próxima rodada (README.md:127), escolha feita porque perder o prazo custa mais do que repetir."
    },
    {
     "pergunta": "Como você testou?",
     "resposta": "Os relatórios citam Ruff e pytest no CI, sem texto explicativo. Cobertura e resultados: prepare sua resposta."
    },
    {
     "pergunta": "O que você faria diferente?",
     "resposta": "Documentado em parte: ampliar o escopo do RJ/R$ 250 mil (ROADMAP) e alinhar a documentação sobre o envio de e-mail. O resto: prepare sua resposta."
    },
    {
     "pergunta": "O que foi seu e o que foi de ferramenta ou IA?",
     "resposta": "Não documentado nos relatórios — prepare sua resposta."
    }
   ]
  },
  {
   "projeto": "diario-glicemia",
   "aviso": "",
   "pitch": "O problema: registrar glicemia, refeições, insulina e hipoglicemias pelo celular, com vários cuidadores no mesmo diário, e levar histórico organizado às consultas médicas, sem sugerir tratamento (README.md:5, :12). Eu construí um site estático que fala direto com um Postgres (Supabase) da própria família, com a segurança nas regras de Row Level Security, funcionamento como PWA e importação do sensor por CSV.",
   "decisoes": [
    {
     "pergunta": "Por que o site não sugere metas nem doses?",
     "resposta": "Porque metas de glicemia, doses e decisões de tratamento seguem sempre as orientações da equipe médica responsável. O site registra e resume.",
     "fonte": "diario-glicemia/README.md:12, :190 — \"Metas de glicemia, doses e decisões de tratamento seguem sempre as orientações da equipe médica responsável.\"",
     "custo": "\"Os dois primeiros dependem de metas que só a equipe médica define.\" Por isso não há faixa-alvo nem TIR (README.md:198)."
    },
    {
     "pergunta": "Por que falar direto com o Supabase, sem servidor próprio?",
     "resposta": "Porque um servidor próprio seria mais uma coisa para manter e atualizar. MongoDB e SQLite foram descartados porque nenhum dos dois oferece acesso seguro direto do navegador sem uma API no meio. A segurança fica nas regras de Row Level Security.",
     "fonte": "diario-glicemia/README.md:191 — \"Um servidor próprio seria mais uma coisa para manter e atualizar.\"",
     "custo": "não documentado."
    },
    {
     "pergunta": "Por que sair do Artifact do Claude e usar um Supabase da família?",
     "resposta": "Para que os dados de saúde da criança fiquem num projeto da própria família, com login e regras de acesso próprias, sem depender de uma conta de terceiros.",
     "fonte": "diario-glicemia/README.md:86; commit 81da7ed — \"para que os dados de saúde da criança fiquem num projeto da própria família, com login e regras de acesso próprias, sem depender de uma conta de terceiros.\"",
     "custo": "não documentado. O README descreve a cópia de segurança como forma de trazer o histórico antigo (README.md:113)."
    },
    {
     "pergunta": "Por que tabelas separadas, mas o site ainda vê \"um dia\" como um objeto?",
     "resposta": "Porque, com o formato do dia preservado, a troca de banco mexeu só em `site/supabase.js` e no início do `index.html`. Gravar e ler passa pelas funções `gravar_dia` e `ler_dias`.",
     "fonte": "diario-glicemia/README.md:192; commit 5726312 — \"com ele, a troca de banco mexeu só em `site/supabase.js` e no início do `index.html`.\"",
     "custo": "não documentado."
    },
    {
     "pergunta": "Por que não há fotos dos pratos?",
     "resposta": "Porque exigiam compressão, envio, limpeza das imagens órfãs e cópia em base64, e seriam a parte mais trabalhosa de levar o diário para outro banco. O texto de \"O que comeu\" e as etiquetas já cumprem o papel.",
     "fonte": "diario-glicemia/README.md:193; commits fbf1920 e c382015 — \"exigia compressão, envio, limpeza das imagens órfãs e cópia em base64, e seria a parte mais trabalhosa de levar o diário para outro banco\"",
     "custo": "não documentado."
    },
    {
     "pergunta": "Por que o sensor é guardado como três listas paralelas?",
     "resposta": "Porque o banco não guarda listas dentro de listas. São listas de minuto, valor e tipo, por dia.",
     "fonte": "diario-glicemia/README.md:147 — \"porque o banco não guarda listas dentro de listas.\"",
     "custo": "não documentado."
    },
    {
     "pergunta": "Por que cada gravação envia só a linha alterada?",
     "resposta": "Para que duas pessoas registrando refeições diferentes no mesmo dia não apaguem o registro uma da outra.",
     "fonte": "diario-glicemia/README.md:196 — \"Assim, duas pessoas registrando refeições diferentes no mesmo dia não apagam o registro uma da outra.\"",
     "custo": "\"Se duas pessoas editam *a mesma* refeição ao mesmo tempo, o site avisa do conflito; quem salvar por último, depois do aviso, vence.\" (README.md:196)"
    },
    {
     "pergunta": "Por que importar o sensor por CSV e não por integração?",
     "resposta": "Porque o LibreView não tem uma API aberta para famílias, e o CSV é a exportação oficial. O leitor localiza as colunas pela posição, não pelo nome, para não depender da tradução.",
     "fonte": "diario-glicemia/README.md:200 — \"O LibreView não tem uma API aberta para famílias, e o CSV é a exportação oficial.\"",
     "custo": "não documentado."
    },
    {
     "pergunta": "Por que só o dono pode apagar todos os dados?",
     "resposta": "Porque um toque errado de um cuidador eventual não pode ter esse alcance. Cuidadores com edição veem a opção bloqueada.",
     "fonte": "diario-glicemia commit 6249510 — \"Um toque errado de um cuidador eventual não pode ter esse alcance.\"",
     "custo": "não documentado. (O commit 6249510 foi feito no modo compartilhado do Claude, com `user.isOwner()`; no Supabase o papel de dono está em README.md:100.)"
    },
    {
     "pergunta": "O que o cache offline guarda?",
     "resposta": "Só a estrutura pública do site, e não as respostas de arquivos (as fotos dos pratos, `/_blob/...`), porque um aparelho compartilhado guardaria fotos da criança num cache que sobrevive a \"apagar os dados do diário\".",
     "fonte": "diario-glicemia commit 898c1be — \"Um aparelho compartilhado guardaria fotos da criança num cache que sobrevive a 'apagar os dados do diário'.\"",
     "custo": "não documentado para o modo Supabase; o commit 898c1be diz: \"A navegação tenta a rede primeiro e só usa o cache sem internet.\""
    }
   ],
   "semMotivo": [
    "Hospedagem no Cloudflare Workers, com deploy a cada push na main — commits 61ca929 e 455245b (o README cita Pages e Netlify como alternativas, README.md:112).",
    "Biblioteca jsPDF para gerar o PDF — README.md:67.",
    "Playwright para os testes de navegador — commit 7ffd6ac (o motivo de ter testes de navegador está escrito; a ferramenta, não).",
    "Planilha gerada com openpyxl em Python — README.md:167.",
    "Repositório que passou de privado para público — commit 707fe42."
   ],
   "dificeis": [
    {
     "pergunta": "Como você protege dados de saúde de uma criança?",
     "resposta": "Documentado: projeto Supabase da própria família, com login e regras de acesso próprias (README.md:86), segurança por Row Level Security (README.md:191), só o dono apaga tudo (commit 6249510) e cache offline sem as respostas de arquivos do diário (commit 898c1be). Em `site/config.js` vão só a URL e a chave pública; \"Nunca use a chave `service_role` ou `secret`\" (README.md:111)."
    },
    {
     "pergunta": "O que acontece com edição simultânea?",
     "resposta": "Documentado: o site avisa do conflito e quem salvar por último, depois do aviso, vence (README.md:196)."
    },
    {
     "pergunta": "O que o app não faz?",
     "resposta": "Documentado: não sugere metas, doses nem tratamento (README.md:12), e não calcula faixa-alvo nem TIR (README.md:198)."
    },
    {
     "pergunta": "Como você testou?",
     "resposta": "Documentado: 39 testes pgTAP das regras de acesso em `supabase/tests/acesso.test.sql` (commits 5726312 e 707fe42; README.md:191); testes de logic.js e do modo compartilhado com banco simulado, cobrindo conflito entre aparelhos, restauração e \"apagar tudo\" (commit 81da7ed); testes de navegador com Playwright (commit 7ffd6ac); plano de validação em VALIDACAO.md (README.md:3). Cobertura: prepare sua resposta."
    },
    {
     "pergunta": "O que foi seu e o que foi de ferramenta ou IA?",
     "resposta": "Documentado só que a primeira versão ficou num Artifact do Claude (README.md:86). A divisão do trabalho: prepare sua resposta."
    }
   ]
  },
  {
   "projeto": "fundo-eleitoral-br",
   "aviso": "",
   "pitch": "O problema: como os partidos brasileiros alocam o FEFC e o Fundo Partidário, em 2018, 2022 e 2026, a partir dos dados abertos do TSE. A pergunta central é onde cada partido aplicou o dinheiro, não quanto gastou (README.md:3-9). Eu construí um pipeline que baixa e converte os dados do TSE para Parquet, publica o dataset no Hugging Face e analisa com DuckDB, medindo concentração com Gini, cobertura, HHI e top 10%.",
   "decisoes": [
    {
     "pergunta": "Por que separar a ingestão da análise?",
     "resposta": "Porque juntar as duas coisas significa baixar gigabytes de novo a cada restart de ambiente efêmero (o Codespaces hiberna e é descartado após 30 dias parado). A análise lê só Parquet.",
     "fonte": "fundo-eleitoral-br/docs/decisoes.md:6 (ADR-001), \"Por quê\" na linha 16 — \"Juntar as duas coisas significa re-baixar gigabytes a cada restart de ambiente efêmero (Codespaces hiberna e é descartado após 30 dias parado).\"",
     "custo": "não documentado como custo; o ADR diz o que o invalidaria: \"o TSE passar a oferecer uma API incremental\"."
    },
    {
     "pergunta": "Por que os dados não ficam no repositório?",
     "resposta": "Porque o Git versiona mal arquivo binário grande: cada nova publicação do TSE duplicaria o histórico permanentemente. Os dados vão para um dataset no Hugging Face.",
     "fonte": "fundo-eleitoral-br/docs/decisoes.md:23 (ADR-002), \"Por quê\" na linha 30 — \"Git versiona mal arquivo binário grande: cada nova publicação do TSE duplicaria o histórico permanentemente.\"",
     "custo": "não documentado."
    },
    {
     "pergunta": "Por que o Hugging Face é o host dos dados?",
     "resposta": "Porque o Hugging Face versiona dataset com git-lfs, que é a ferramenta certa para isso, e de quebra torna a análise reproduzível por terceiros sem precisar refazer a ingestão.",
     "fonte": "fundo-eleitoral-br/docs/decisoes.md:31-33 (ADR-002) — \"O Hugging Face versiona dataset com git-lfs, que é a ferramenta certa para isso, e de quebra torna a análise reproduzível por terceiros sem precisar refazer a ingestão.\"",
     "custo": "não documentado."
    },
    {
     "pergunta": "Por que DuckDB e não Postgres?",
     "resposta": "Porque um Postgres adicionaria container, migrations e credenciais para resolver um problema de concorrência de escrita que o projeto não tem.",
     "fonte": "fundo-eleitoral-br/docs/decisoes.md:35 (ADR-003), \"Por quê\" na linha 40 — \"Um Postgres aqui adicionaria container, migrations e credenciais para resolver um problema de concorrência de escrita que este projeto não tem.\"",
     "custo": "não documentado como custo; invalidaria: \"precisar de escrita concorrente ou de servir as consultas para uma aplicação multiusuário\"."
    },
    {
     "pergunta": "Por que `curl_cffi` com `impersonate=\"chrome\"` para baixar do TSE?",
     "resposta": "Porque `httpx` e `curl` recebem 403 em todo o domínio: a classificação é feita pela impressão digital do TLS, não pelo cabeçalho, então trocar o User-Agent não resolve. O ADR declara que não há contorno de autenticação ou paywall.",
     "fonte": "fundo-eleitoral-br/docs/decisoes.md:58 (ADR-005), \"Por quê\" na linha 69 — \"A classificação é feita pela impressão digital do TLS, não pelo cabeçalho — por isso trocar o User-Agent não resolve.\"",
     "custo": "não documentado."
    },
    {
     "pergunta": "Por que ler só os arquivos `_BRASIL` de cada tabela?",
     "resposta": "Porque concatenar os arquivos de UF descartaria 58% das linhas de receita, incluindo a disputa presidencial inteira. UFs mais `_BRASIL` duplicaria.",
     "fonte": "fundo-eleitoral-br/docs/decisoes.md:82 (ADR-006), linha 102 — \"Concatenar as UFs descartaria 58% das linhas de receita, incluindo a disputa presidencial inteira.\"",
     "custo": "não documentado."
    },
    {
     "pergunta": "Por que a publicação no Hugging Face é parte do pipeline?",
     "resposta": "Porque, se publicar for um passo manual e opcional, mais cedo ou mais tarde alguém — provavelmente eu mesmo — vai rodar a ingestão, fechar a aba e perder o resultado.",
     "fonte": "fundo-eleitoral-br/docs/decisoes.md:120 (ADR-007), \"Por quê\" na linha 132 — \"Se publicar for um passo manual e opcional, mais cedo ou mais tarde alguém — provavelmente eu mesmo — vai rodar a ingestão, fechar a aba e perder o resultado.\"",
     "custo": "não documentado."
    },
    {
     "pergunta": "Por que o repasse entre candidaturas fica fora da concentração?",
     "resposta": "Porque incluir o repasse sempre reduz o Gini, já que as transferências correm de quem recebeu muito para candidaturas menores. Há uma flag, `incluir_repasse_entre_candidatos=True`, para o comportamento antigo.",
     "fonte": "fundo-eleitoral-br/docs/decisoes.md:162 (ADR-009), docs/decisoes.md:180-186 — \"incluir o repasse sempre *reduz* o Gini, porque as transferências correm de quem recebeu muito para candidaturas menores.\"",
     "custo": "não documentado (a fonte deixa em aberto a observação sobre 2018, decisoes.md:191-193)."
    },
    {
     "pergunta": "Por que medir a prioridade geográfica também por cadeira?",
     "resposta": "Porque atribuir isso a escolha partidária é confundir desenho institucional com decisão.",
     "fonte": "fundo-eleitoral-br/docs/decisoes.md:297 (ADR-012); README.md, \"Achado: a 'prioridade' dos estados pequenos\" — \"Atribuir isso a escolha partidária é confundir desenho institucional com decisão.\"",
     "custo": "\"a redistribuição de cadeiras de 2023 alterou a bancada de vários estados\"; por isso, em 2026, o índice usa cadeiras do ciclo anterior, com aviso no relatório (ADR-012)."
    },
    {
     "pergunta": "O que acontece quando uma fonte falha no meio do lote?",
     "resposta": "Um item do lote pode falhar sem derrubar o lote; nenhuma falha pode sumir do código de saída; e um artefato só conta como pronto se estiver íntegro.",
     "fonte": "fundo-eleitoral-br/docs/decisoes.md:386 (ADR-014) — \"Um item do lote pode falhar sem derrubar o lote; nenhuma falha pode sumir do código de saída; e um artefato só conta como pronto se estiver íntegro.\"",
     "custo": "não documentado; o ADR diz o que o invalidaria: tabela intermitente legítima do TSE."
    },
    {
     "pergunta": "Por que a exportação do painel é determinística?",
     "resposta": "Para que duas execuções seguidas produzam conteúdo idêntico. A ordenação anterior por (partido, UF, cargo) deixava o empate ao acaso do DuckDB. A exportação é etapa do pipeline, depois da publicação.",
     "fonte": "fundo-eleitoral-br/docs/decisoes.md:550 (ADR-018) — \"Duas execuções seguidas produzem conteúdo idêntico.\"",
     "custo": "não documentado. Para o risco de fotografia velha, a fonte descreve a guarda `tests/test_painel_atualizado.py`."
    },
    {
     "pergunta": "Por que o Gini nunca é lido sozinho?",
     "resposta": "Porque nenhuma métrica deve ser lida isoladamente: a cobertura separa exclusão de concentração entre recebedores, o Gini resume a desigualdade, HHI e número efetivo dão mais peso aos maiores repasses, e o top 10% é a medida mais fácil de comunicar.",
     "fonte": "fundo-eleitoral-br/docs/concentracao.md:37-40 — \"Nenhuma métrica deve ser lida isoladamente.\"",
     "custo": "não documentado."
    }
   ],
   "semMotivo": [
    "Dashboard em pnpm com TypeScript (pasta `dashboard/`) — README.md, seção \"Rodando / Dashboard\"."
   ],
   "dificeis": [
    {
     "pergunta": "O que você ainda não consegue explicar nos resultados?",
     "resposta": "Documentado: o comportamento de 2018 na concentração — \"Vale investigar se reflete mudança de regra entre ciclos ou apenas o FEFC menor daquele ano — não está respondido.\" (ADR-009)."
    },
    {
     "pergunta": "Quando essas escolhas deixariam de servir?",
     "resposta": "Documentado: DuckDB, se precisar de escrita concorrente ou multiusuário (ADR-003); ingestão separada, se o TSE oferecer API incremental (ADR-001); lote tolerante a falha, se houver tabela intermitente legítima (ADR-014)."
    },
    {
     "pergunta": "Como você garante que o resultado é reproduzível?",
     "resposta": "Documentado: exportação determinística (ADR-018) e guarda `tests/test_painel_atualizado.py` contra fotografia velha. Outros testes: prepare sua resposta."
    },
    {
     "pergunta": "Seus resultados provam que o partido decidiu isso?",
     "resposta": "Documentado: não, a prioridade geográfica é medida também por cadeira para não confundir desenho institucional com decisão partidária (ADR-012)."
    },
    {
     "pergunta": "O que foi seu e o que foi de ferramenta ou IA?",
     "resposta": "Não documentado nos relatórios — prepare sua resposta."
    }
   ]
  },
  {
   "projeto": "hub-integracoes",
   "aviso": "",
   "pitch": "O problema: receber pedidos de várias lojas por webhook assinado, validar, persistir com idempotência e entregar de forma assíncrona e confiável a um ERP, sem perder pedido nem gerar entrega duplicada no ERP (README.md:3; docs/decisoes.md, ADR-001). Eu construí uma API em Node/TypeScript que grava o pedido e a outbox na mesma transação SQL; um relay independente publica no Redis Streams e workers em consumer group fazem a entrega. O ERP é simulado, para desenvolver e demonstrar sem contas, credenciais ou custos de terceiros.",
   "decisoes": [
    {
     "pergunta": "Por que pedido e outbox na mesma transação, com relay separado e Redis Streams?",
     "resposta": "Para manter confiável a fronteira de persistência e desacoplar integrações lentas, permitindo escalar workers.",
     "fonte": "hub-integracoes/docs/decisoes.md:3-8 (ADR-001, Motivo na linha 7) — \"manter confiável a fronteira de persistência e desacoplar integrações lentas, permitindo escalar workers.\"",
     "custo": "\"PostgreSQL e Redis não têm commit atômico conjunto; o relay pode republicar após falha entre `XADD` e atualização SQL.\" A entrega é at-least-once."
    },
    {
     "pergunta": "Por que o ERP é simulado?",
     "resposta": "Para desenvolver e demonstrar sem contas, credenciais, dados reais ou custos de terceiros. Uso uma tabela local com unique key, antes de qualquer integração externa.",
     "fonte": "hub-integracoes/docs/decisoes.md:27-33 (ADR-002, Motivo na linha 31) — \"desenvolver e demonstrar sem contas, credenciais, dados reais ou custos de terceiros.\"",
     "custo": "\"os resultados mostram o pipeline e não certificam compatibilidade com ERP real.\""
    },
    {
     "pergunta": "Por que o redrive também passa pela outbox?",
     "resposta": "Para evitar a janela em que o Redis publicou e o SQL deu rollback, o que deixaria o worker processar uma ação não confirmada no banco. O redrive entra na outbox na mesma transação do dead letter.",
     "fonte": "hub-integracoes/docs/decisoes.md:11-17 (ADR-004, Motivo na linha 15) — \"evitar a janela Redis-publicou/SQL-rollback que deixaria o worker processar uma ação não confirmada no banco.\"",
     "custo": "\"o redrive é assíncrono e responde `202` após a transação local.\""
    },
    {
     "pergunta": "Por que `/health` separado de `/ready`?",
     "resposta": "Para não reiniciar um processo saudável só porque uma dependência transitória está indisponível. O `/ready` testa PostgreSQL e Redis; o `/health` é liveness.",
     "fonte": "hub-integracoes/docs/decisoes.md:19-25 (ADR-005, Motivo na linha 23) — \"não reiniciar um processo saudável só porque uma dependência transitória está indisponível\"",
     "custo": "não documentado como limitação; a consequência registrada é que \"monitoramento e orquestração devem usar `/ready` para tráfego e `/health` para liveness\"."
    },
    {
     "pergunta": "Como você guarda as chaves das lojas?",
     "resposta": "As chaves HMAC das lojas ficam cifradas com AES-256-GCM sob `TENANT_SECRETS_KEY`, porque o HMAC exige o segredo em claro na verificação e, portanto, ele não pode ser hash. Os tokens administrativos ficam guardados como SHA-256.",
     "fonte": "hub-integracoes/docs/decisoes.md:43-49 (ADR-006, Motivo na linha 47) — \"o HMAC exige o segredo em claro na verificação, então ele não pode ser hash.\"",
     "custo": "\"`TENANT_SECRETS_KEY` vira o segredo mais crítico do sistema.\" Fica fora do banco e do backup, com cópia própria."
    },
    {
     "pergunta": "Como você protege contra replay do webhook?",
     "resposta": "Assino `<timestamp>.<corpo>` e aceito uma janela de 300 s; dentro dela, deduplico por `eventId`. É o mesmo padrão de Stripe e Slack, conhecido por quem integra. Não guardo nonce por requisição porque isso exigiria mais estado por pedido, e o `eventId` já cumpre esse papel.",
     "fonte": "hub-integracoes/docs/decisoes.md:51-57 (ADR-007, Motivo na linha 55) — \"é o mesmo padrão de Stripe e Slack, conhecido por quem integra\"; \"Um nonce guardado por requisição exigiria mais estado por pedido, e o `eventId` já cumpre esse papel.\"",
     "custo": "\"o remetente precisa de relógio sincronizado.\" A mudança quebrou a compatibilidade do protocolo, \"aceitável porque ainda não havia remetente real.\""
    },
    {
     "pergunta": "Por que `XTRIM MINID` e não `MAXLEN` no stream?",
     "resposta": "Porque `MAXLEN` apaga por contagem, inclusive mensagens pendentes ou ainda não lidas, e um worker parado perderia pedidos. Uso `XTRIM MINID` com piso seguro.",
     "fonte": "hub-integracoes/docs/decisoes.md:59-65 (ADR-008, Motivo na linha 63) — \"`MAXLEN` apaga por contagem, inclusive mensagens pendentes ou ainda não lidas. Um worker parado perderia pedidos.\"",
     "custo": "\"com o worker parado, o stream cresce até ele voltar ... exige monitorar a memória do Redis.\""
    },
    {
     "pergunta": "Por que falha de dependência vira 503 e nunca derruba o processo?",
     "resposta": "Porque o teste de resiliência mostrou os processos morrendo quando o PostgreSQL reiniciava, por um evento `error` não tratado. Hoje há listener de `error` em todo pool `pg`, espera na partida e handler global.",
     "fonte": "hub-integracoes/docs/decisoes.md:83-89 (ADR-011, Motivo na linha 87) — \"o teste de resiliência mostrou os processos morrendo quando o PostgreSQL reiniciava (evento `error` não tratado).\"",
     "custo": "não documentado como limitação; a condição do teste é que ele \"falha se api ou relay reiniciarem, ou se algum pedido ficar sem resposta HTTP.\""
    },
    {
     "pergunta": "Como você troca a chave mestra sem parar o serviço?",
     "resposta": "Mantenho `TENANT_SECRETS_KEY` (atual) e `TENANT_SECRETS_KEY_PREVIOUS`, e a decifragem tenta em ordem. No AES-GCM a chave errada falha na autenticação, então tentar em ordem é seguro e dispensa gravar um identificador de chave no formato.",
     "fonte": "hub-integracoes/docs/decisoes.md:91-97 (ADR-012, Motivo na linha 95) — \"no AES-GCM, a chave errada falha na autenticação, então tentar em ordem é seguro e dispensa gravar um identificador de chave no formato.\"",
     "custo": "\"durante a troca, a leitura de uma linha antiga custa uma decifragem a mais.\" Linha que nenhuma chave abre é ignorada com aviso."
    },
    {
     "pergunta": "Por que o ledger de tokens não guarda conteúdo?",
     "resposta": "Para medir consumo de tokens mantendo minimização de dados.",
     "fonte": "hub-integracoes/docs/decisoes.md:35-41 (ADR-003) — \"medir consumo de tokens mantendo minimização de dados.\"",
     "custo": "não documentado."
    },
    {
     "pergunta": "Por que a retenção limpa o payload mas mantém a identidade do evento?",
     "resposta": "Porque apagar a linha faria a deduplicação esquecer o `eventId`, e um reenvio tardio do remetente geraria uma segunda entrega.",
     "fonte": "hub-integracoes/docs/decisoes.md:67-73 (ADR-009) — \"apagar a linha faria a deduplicação esquecer o `eventId`, e um reenvio tardio do remetente geraria uma segunda entrega.\"",
     "custo": "não documentado."
    },
    {
     "pergunta": "Por que produção num único host com Caddy e Docker secrets?",
     "resposta": "Porque a configuração não depende de provedor, e a convenção `*_FILE` funciona igual com Docker secrets, Kubernetes ou agentes de gerenciadores de segredos.",
     "fonte": "hub-integracoes/docs/decisoes.md:75-81 (ADR-010) — \"a configuração não depende de provedor, e a convenção `*_FILE` funciona igual com Docker secrets, Kubernetes ou agentes de gerenciadores de segredos.\"",
     "custo": "sem alta disponibilidade."
    },
    {
     "pergunta": "Por que Node 24 LTS e não Node 22?",
     "resposta": "Node 20 chegou ao fim de vida em 30/04/2026; o Node 22 sai de suporte em abril de 2027, e o 24 roda o mesmo código sem nenhuma mudança.",
     "fonte": "hub-integracoes commit e7ea8ea — \"sai de suporte em abril de 2027, e o 24 roda o mesmo código sem nenhuma mudança.\"",
     "custo": "não documentado."
    },
    {
     "pergunta": "Por que você não aplicou a atualização do Redis 8 sugerida pelo Dependabot?",
     "resposta": "Porque o Redis 8 muda de licença.",
     "fonte": "hub-integracoes/roteiro.md:44 — \"o Redis 8 muda de licença.\"",
     "custo": "não documentado."
    }
   ],
   "semMotivo": [
    "TypeScript, Fastify e Zod como base da API — context.md:11.",
    "Yarn como gerenciador de pacotes — README.md:11.",
    "Dashboard em página única, sem CDN e com CSP por nonce — README.md:162; docs/modelo-de-ameacas.md.",
    "`XAUTOCLAIM` para recuperar mensagens pendentes do worker — README.md:71. Atenção: o `liquidacao-pix` rejeita `XAUTOCLAIM` (docs/adr/0003, :38-39); o entrevistador pode cruzar os dois projetos.",
    "Redis 7.4 e Postgres 17 como versões fixas — context.md:11. (Imagens fixadas por digest têm motivo no commit 0421cd7.)",
    "Não fazer deploy num servidor real — roteiro.md:31: só \"por decisão\" e \"os itens que dependem de infraestrutura paga ou de operação contínua ficam fora do escopo\"."
   ],
   "dificeis": [
    {
     "pergunta": "O que isso garante e o que não garante?",
     "resposta": "Documentado: a entrega é at-least-once, porque PostgreSQL e Redis não têm commit atômico conjunto (ADR-001), e os resultados \"não certificam compatibilidade com ERP real\" (ADR-002)."
    },
    {
     "pergunta": "Como você testou resiliência?",
     "resposta": "Documentado em parte: houve um teste de resiliência que reiniciava o PostgreSQL e mostrou os processos morrendo (ADR-011); ele falha se api ou relay reiniciarem ou se algum pedido ficar sem resposta HTTP. O resto: prepare sua resposta."
    },
    {
     "pergunta": "Onde quebra em escala?",
     "resposta": "Documentado: sem alta disponibilidade (ADR-010) e, com o worker parado, o stream cresce até ele voltar (ADR-008). Medição de carga: prepare sua resposta."
    },
    {
     "pergunta": "Por que você rejeita `XAUTOCLAIM` num projeto e usa no outro?",
     "resposta": "Não documentado para o hub — prepare sua resposta (o motivo do `liquidacao-pix` está no ADR 0003)."
    },
    {
     "pergunta": "O que foi seu e o que foi de ferramenta ou IA?",
     "resposta": "Não documentado nos relatórios — prepare sua resposta."
    }
   ]
  },
  {
   "projeto": "liquidacao-pix",
   "aviso": "",
   "pitch": "O problema: um motor que recebe pedidos de transferência instantânea no formato do PIX precisa aceitar o pedido em poucos milissegundos, liquidar de forma assíncrona e provar que nenhum pedido aceito se perde, nenhum é liquidado duas vezes e o dinheiro é conservado (docs/especificacao.md:3-8, :11-19). Eu construí a API, o relay, o worker e o conciliador em Go, com implementação e revisão cruzada entre agentes de IA (Claude e Codex), conforme docs/colaboracao-claude-codex.md. O Postgres é a fonte da verdade e o `202` só sai depois do commit da transferência e da outbox na mesma transação; o relay copia a outbox para o Redis Streams, e o worker absorve duplicidade por idempotência.",
   "decisoes": [
    {
     "pergunta": "Por que Go?",
     "resposta": "Go foi o pedido original do projeto; a memória técnica registra também a concorrência leve, com goroutines, e os binários estáticos.",
     "fonte": "liquidacao-pix/MEMORIA_TECNICA.md:72 — \"Pedido original; concorrência leve (goroutines) e binários estáticos\"",
     "custo": "não documentado."
    },
    {
     "pergunta": "Por que o `202` só sai depois do commit no Postgres, com outbox, em vez de publicar direto na fila?",
     "resposta": "Porque, se a fila cair entre o \"aceito\" e a liquidação, o pedido aceito some e o cliente já ouviu que deu certo. Por isso o Postgres é a fonte da verdade e a outbox é gravada na mesma transação; o relay copia para o Redis. Descartei publicar direto na fila, Redis Pub/Sub e gravar no banco e na fila sem outbox.",
     "fonte": "liquidacao-pix/docs/adr/0001-postgres-fonte-da-verdade-e-outbox.md (Contexto; Alternativas descartadas, linhas 23-27) — \"Se a fila cair entre o 'aceito' e a liquidação, o pedido aceito some, e o cliente já ouviu que deu certo.\"",
     "custo": "\"A latência da API inclui um commit no Postgres. É o preço da garantia.\" O relay pode publicar a mesma mensagem duas vezes, e o worker absorve isso por idempotência."
    },
    {
     "pergunta": "Por que Redis Streams e não Pub/Sub? E por que sem `MAXLEN`?",
     "resposta": "Porque o Pub/Sub não guarda mensagem; no Stream a mensagem fica guardada até o `XACK`. A confirmação é `XACK` + `XDEL` em MULTI, e não uso `MAXLEN` porque ele pode apagar mensagem não confirmada. Também descartei RabbitMQ e `XAUTOCLAIM`.",
     "fonte": "liquidacao-pix/MEMORIA_TECNICA.md:75 e :81; docs/adr/0003-redis-streams-retentativas-e-orfas.md:36-40; commit c6a8a86 — \"Streams em vez de Pub/Sub: a mensagem fica guardada até o XACK\"",
     "custo": "o ADR recusa RabbitMQ por ser \"mais um sistema para operar\". Para retentativa: \"Erros permanentes ... passam pelas mesmas retentativas que os temporários antes de morrer. É mais lento\" (ADR 0003, Consequências)."
    },
    {
     "pergunta": "Como você garante que a transferência não é liquidada duas vezes, e por que READ COMMITTED e não SERIALIZABLE?",
     "resposta": "A idempotência no consumo vem da trava de linha da transferência (`FOR UPDATE`), e as contas são travadas uma a uma em ordem crescente de id, o que evita deadlock entre transferências cruzadas. Uso READ COMMITTED porque SERIALIZABLE abortaria transações em conflito e exigiria repetir, sem ganho aqui.",
     "fonte": "liquidacao-pix/docs/adr/0002-idempotencia-e-travas.md (Decisão, itens 1-3); MEMORIA_TECNICA.md:78 — \"SERIALIZABLE abortaria transações em conflito e exigiria repetir, sem ganho aqui.\"",
     "custo": "não documentado como custo. A fonte registra a prova de mutação: sem ordenar as travas, o teste de concorrência acusa 189 deadlocks (MEMORIA_TECNICA.md, histórico de 2026-10-21; commit ff07977)."
    },
    {
     "pergunta": "Por que livro-razão de partidas dobradas com centavos em `bigint`?",
     "resposta": "Para a conservação do dinheiro ser verificável, sem erro de arredondamento. Os lançamentos são imutáveis por gatilho e o saldo é uma projeção mantida na mesma transação.",
     "fonte": "liquidacao-pix/MEMORIA_TECNICA.md:77; README.md, seção \"Como funciona\" — \"Conservação do dinheiro verificável; sem erro de arredondamento\"",
     "custo": "não documentado."
    },
    {
     "pergunta": "Por que a auditoria é uma cadeia de HMAC por conta e não uma cadeia global?",
     "resposta": "Uma cadeia única exige que cada entrada conheça o MAC da anterior, e isso serializa todas as liquidações numa trava. Por isso gravo uma entrada na cadeia do pagador e outra na do recebedor, na mesma transação da liquidação. Descartei cadeia global, hash SHA-256 sem chave e assinatura Ed25519.",
     "fonte": "liquidacao-pix/docs/adr/0006-auditoria-em-cadeia-e-cpf-cifrado.md:36-38 (Decisão 2); alternativas em :200-206 — \"uma cadeia única exige que cada entrada conheça o MAC da anterior, e isso serializa todas as liquidações numa trava.\"",
     "custo": "\"não há ordem total entre contas distintas\" (ADR 0006:44). A aceitação é provisória: a medição de carga com a cadeia mostrou cauda pior (API p99 8,1 → 27,4 ms) e \"não foi possível atribuí-la à cadeia\" com uma rodada por versão (ADR 0006, Consequências; commit a8c31ea)."
    },
    {
     "pergunta": "Por que a chave do HMAC fica fora do banco?",
     "resposta": "Para que quem edita o banco não refaça a cadeia, e para poder rotacionar a chave sem quebrar o passado. A chave vem da variável `AUDITORIA_CHAVES` e cada entrada grava o id da chave usada.",
     "fonte": "liquidacao-pix/MEMORIA_TECNICA.md:89; docs/adr/0006 (Decisão 4) — \"Quem edita o banco não refaz a cadeia; rotação sem quebrar o passado\"",
     "custo": "\"quem puder alterar banco e arquivo pode esconder a poda\" (ADR 0006, Decisão 5). Apagar o rabo de uma cadeia só é detectado sem âncora em LIQUIDADA; para REJEITADA exige âncora externa."
    },
    {
     "pergunta": "Como você trata o CPF, do ponto de vista de privacidade?",
     "resposta": "Cifro o CPF com AES-256-GCM, com uma chave de dados por conta embrulhada por uma chave-mestra do ambiente. Apagar o dado é descartar a chave de dados, e a auditoria e os lançamentos só citam `conta_id`. Descartei o índice cego (HMAC do CPF) porque seria dado pessoal derivado que sobrevive à destruição da chave.",
     "fonte": "liquidacao-pix/MEMORIA_TECNICA.md:93; docs/adr/0006 (Decisão 6; Decisão 6, :157-159) — \"Apagar = `DELETE` em `chaves_cpf`; auditoria e lançamentos só citam `conta_id`\"",
     "custo": "\"O custo é aceito: a conta se acha pela chave PIX.\" Cópias da chave em backups e a chave-mestra no mesmo host não são cobertas pelo apagamento (seção \"O que o crypto-shredding não resolve\")."
    },
    {
     "pergunta": "Por que não há autenticação?",
     "resposta": "Deixei autenticação e autorização fora do escopo de propósito, porque uma autenticação feita pela metade, como uma chave estática num cabeçalho, daria falsa sensação de segurança sem provar nada. Descartei também implementar mTLS e OAuth.",
     "fonte": "liquidacao-pix/docs/adr/0005-autenticacao-fora-do-escopo.md (Decisão; Alternativas descartadas, linhas 48-51) — \"uma autenticação feita pela metade (uma chave estática num cabeçalho, por exemplo) daria falsa sensação de segurança sem provar nada.\"",
     "custo": "\"a lacuna mais séria hoje é que qualquer chamador pode debitar qualquer conta\" (ADR 0005, O que um sistema real exigiria)."
    }
   ],
   "semMotivo": [
    "Parâmetros de produção (200 eventos por lote no relay, 10 ms de espera com outbox vazia, 30 s de idade para órfã, 5 republicações, 6 entregas máximas no worker, base de 5 s) — MEMORIA_TECNICA.md:116-124; nenhum tem justificativa própria.",
    "Postgres 17 e Redis 7 como versões fixas — MEMORIA_TECNICA.md:28.",
    "SQL escrito à mão com `pgx`, sem ORM — docs/especificacao.md:139.",
    "Imagem distroless com usuário não-root — MEMORIA_TECNICA.md:46."
   ],
   "dificeis": [
    {
     "pergunta": "Como você testou a concorrência?",
     "resposta": "Documentado em parte: a prova de mutação mostra que, sem ordenar as travas, o teste de concorrência acusa 189 deadlocks (MEMORIA_TECNICA.md, 2026-10-21; commit ff07977). O resto da estratégia de testes: prepare sua resposta."
    },
    {
     "pergunta": "Onde isso quebra em escala ou sob carga?",
     "resposta": "Documentado: a medição de carga com a cadeia de auditoria mostrou cauda pior (API p99 8,1 → 27,4 ms) e não foi possível atribuí-la à cadeia com uma rodada por versão (ADR 0006, commit a8c31ea). Além disso, não há ordem total entre contas distintas na auditoria."
    },
    {
     "pergunta": "O que você faria diferente ou ainda falta?",
     "resposta": "Documentado: a lacuna mais séria é que qualquer chamador pode debitar qualquer conta, porque a autenticação ficou fora do escopo (ADR 0005). Outros itens: prepare sua resposta."
    },
    {
     "pergunta": "O que foi seu e o que foi de ferramenta ou IA?",
     "resposta": "Documentado em parte: docs/colaboracao-claude-codex.md descreve o plano em que um agente implementa e outro revisa, e escolhe o modelo (Sonnet, Sol, Opus) pelo risco da mudança. A sua parte (pedido, decisões, aprovação): prepare sua resposta."
    }
   ]
  },
  {
   "projeto": "mesa-de-credito",
   "aviso": "",
   "pitch": "O problema: ensinar, com um jogo multiplayer, as consequências das decisões de crédito de uma financeira (concessão, provisão, atraso, venda de carteira). \"Perder sem entender por quê não ensina nada.\" (README.md:3; commit 2f1061d). Eu construí o jogo com um motor de regras único e puro, usado pela API, pelo banco e pelo simulador, com o estado da partida em JSONB alterado só pelo motor sob bloqueio de linha. As regras foram calibradas por simulação com robôs, e parte dos parâmetros vem de normas do Banco Central (capital mínimo de 17%, provisão por estágios: docs/FUNDAMENTOS.md, commit 662bce4) e de 3 séries do SGS; os demais são hipóteses, e o documento separa um do outro (FUNDAMENTOS.md:3).",
   "decisoes": [
    {
     "pergunta": "Por que um único motor de regras?",
     "resposta": "Porque em produção só o caminho PostgreSQL rodava, e as regras e os testes do motor em memória não protegiam a partida real. Removi os dois caminhos anteriores (`game` e `finance.Portfolio`). O motor é puro, sem HTTP, banco ou relógio.",
     "fonte": "mesa-de-credito/docs/AUDITORIA_FASE_1A.md:20, :51-52; commit cbeffd3 — \"Em produção só o caminho PostgreSQL rodava. As regras e os testes do motor em memória não protegiam a partida real.\"",
     "custo": "não documentado para o motor único; a decisão do estado em JSONB sob bloqueio admite: \"A custo de serializar comandos por partida, o que é irrelevante para 2 a 4 jogadores.\" (AUDITORIA_FASE_1A.md:52)."
    },
    {
     "pergunta": "Por que READ COMMITTED com bloqueio da linha do participante?",
     "resposta": "Porque um teste real de concorrência levou a essa escolha.",
     "fonte": "mesa-de-credito/docs/ROTEIRO_V1.md:160 — \"um teste real de concorrência levou à escolha de `READ COMMITTED` com bloqueio da linha do participante.\"",
     "custo": "não documentado. A auditoria registra que não houve teste matando o processo ou o banco (AUDITORIA_FASE_1A.md:59)."
    },
    {
     "pergunta": "Por que a semente é gerada no servidor e o empate é sorteado pela semente?",
     "resposta": "Porque, com o desempate pelo menor id, o empate ia sempre para o menor id, em 30 de 30 salas. A semente escolhida por quem criava a sala também foi descartada.",
     "fonte": "mesa-de-credito/docs/AUDITORIA_FASE_1A.md:30-31; commit cbeffd3 — \"Empate sempre para o menor id: 30 de 30 salas\"",
     "custo": "não documentado."
    },
    {
     "pergunta": "Por que o principal do contrato é o valor que o cliente aceitou e não o menor total oferecido?",
     "resposta": "Porque uma oferta de R$ 0,01 ganhava o cliente, já que vence o menor total. Foi um defeito de severidade A na auditoria.",
     "fonte": "mesa-de-credito/docs/AUDITORIA_FASE_1A.md:28 (defeito 1) — \"Oferta de R$ 0,01 ganhava o cliente, porque vence o menor total\"",
     "custo": "não documentado."
    },
    {
     "pergunta": "Por que os robôs só compram contratos de pessoas?",
     "resposta": "Porque, com robôs comprando uns dos outros, houve cerca de 26 vendas por partida.",
     "fonte": "mesa-de-credito/docs/RELATORIO_EQUILIBRIO.md:67; commit 589feeb — \"Com robôs comprando uns dos outros, houve cerca de 26 vendas por partida; por isso eles compram só de pessoas.\"",
     "custo": "\"Os parâmetros de `Market` em `sim/bots.go` são hipóteses. Nenhuma pessoa jogou contra eles.\" (RELATORIO_EQUILIBRIO.md:66)"
    },
    {
     "pergunta": "Por que o limite de empréstimo é 30% do capital regulatório por cliente?",
     "resposta": "O limite por cliente entrou como 30% do patrimônio porque um único contrato podia quase igualar o capital; 25% foi descartado porque ficar parado passava a vencer 24% das mesas (commit b1ab499). Na v4 a base passou a ser o capital regulatório (REGRAS_V4.md:14), sem motivo próprio escrito.",
     "fonte": "mesa-de-credito commit b1ab499; docs/REGRAS_V4.md (tabela, linha \"Limite por cliente\") — \"Um único contrato podia quase igualar o capital.\"",
     "custo": "\"o de `menor-taxa` segue perto de -80%: esses prejuízos vêm de acumular contratos ruins, não de um contrato só.\" (commit b1ab499)"
    },
    {
     "pergunta": "Como funciona o piso de preço na venda de contratos entre jogadores?",
     "resposta": "O piso do anúncio é o preço que o fundo paga (80% do saldo em dia, 45% em atraso), conferido de novo a cada mês. Antes o piso era 40% do saldo, e anunciar abaixo disso só servia para passar valor a quem compra.",
     "fonte": "mesa-de-credito commit 12925fc — \"anunciar abaixo disso só servia para passar valor a quem compra\"",
     "custo": "\"A transferência diminui, mas não acaba: dentro da faixa, um preço ainda pode favorecer um amigo, nos dois sentidos.\" (commit 12925fc)"
    },
    {
     "pergunta": "Por que as regras v4 com capital regulatório e provisão por estágios?",
     "resposta": "Porque, na v3, ficar parado competia com emprestar, já que faltava o que torna o crédito rentável na prática: alavancagem com limite de capital. A v4 usa capital mínimo de 17% dos ativos ponderados pelo risco e provisão por estágios, seguindo normas do Banco Central simplificadas.",
     "fonte": "mesa-de-credito commit 662bce4; docs/REGRAS_V4.md; docs/FUNDAMENTOS.md — \"ficar parado competia com emprestar, porque faltava o que torna o crédito rentável na prática: alavancagem com limite de capital.\"",
     "custo": "\"A provisão não muda o patrimônio final, porque todo contrato termina liquidado.\" (REGRAS_V4.md). Vários parâmetros são hipóteses (commit 662bce4)."
    },
    {
     "pergunta": "Por que não modelar tributos?",
     "resposta": "Porque as fontes consultadas divergem sobre a CSLL de financeiras em 2026 e sobre a vigência da norma.",
     "fonte": "mesa-de-credito/docs/FUNDAMENTOS.md:60 — \"porque as fontes consultadas divergem sobre a CSLL de financeiras em 2026 e sobre a vigência da norma.\"",
     "custo": "\"Com tributos, as margens cairiam.\" (FUNDAMENTOS.md:60)"
    },
    {
     "pergunta": "Por que só três séries do Banco Central como dado externo?",
     "resposta": "Para a pesquisa de fontes não ter duração aberta. O restante é marcado como sintético.",
     "fonte": "mesa-de-credito/docs/ROTEIRO.md:316; docs/FONTES_E_PARAMETROS.md:3 — \"para a pesquisa de fontes não ter duração aberta\"",
     "custo": "\"todos os parâmetros, exceto a taxa básica, são sintéticos\" (docs/SESSOES.md, sessão de 03/11/2026)."
    }
   ],
   "semMotivo": [
    "Classificação final pelo patrimônio final — docs/REGRAS_V4.md.",
    "Robôs veem apenas o que o anúncio mostra — commit 589feeb.",
    "Tokens guardados só como hash e comandos idempotentes por `command_id` — README.md:80.",
    "Trabalhador de `cmd/api` que fecha rodadas vencidas a cada segundo — docs/SESSOES.md:124 (o intervalo de 1 s não tem motivo).",
    "Go, PostgreSQL, React e Vite como stack — README.md:9."
   ],
   "dificeis": [
    {
     "pergunta": "Alguém jogou? O jogo está equilibrado de verdade?",
     "resposta": "Documentado: nenhuma pessoa jogou contra os robôs (RELATORIO_EQUILIBRIO.md:66); em 03/11/2026, antes das regras v4, todos os parâmetros exceto a taxa básica eram sintéticos (SESSOES.md:146); a v4 trouxe capital e provisão de normas do BCB/CMN (FUNDAMENTOS.md)."
    },
    {
     "pergunta": "Como você testou concorrência e falhas?",
     "resposta": "Documentado: um teste real de concorrência levou ao READ COMMITTED com bloqueio de linha (ROTEIRO_V1.md:160); não houve teste matando o processo ou o banco (AUDITORIA_FASE_1A.md:59)."
    },
    {
     "pergunta": "O que a auditoria encontrou?",
     "resposta": "Documentado: defeitos como a oferta de R$ 0,01 que ganhava o cliente e o empate sempre para o menor id, em 30 de 30 salas (AUDITORIA_FASE_1A.md:28-31)."
    },
    {
     "pergunta": "O que ainda tem brecha?",
     "resposta": "Documentado: dentro da faixa de preço, um preço ainda pode favorecer um amigo, nos dois sentidos (commit 12925fc); o `menor-taxa` segue perto de -80% (commit b1ab499)."
    },
    {
     "pergunta": "O que foi seu e o que foi de ferramenta ou IA?",
     "resposta": "Não documentado nos relatórios — prepare sua resposta."
    }
   ]
  },
  {
   "projeto": "raio-x-patrimonial",
   "aviso": "",
   "pitch": "O problema: mostrar o patrimônio declarado e a trajetória eleitoral dos 513 deputados federais eleitos em 2022 e 2026, com dados públicos do TSE e da Câmara, e permitir conferir a base contra a fonte (README.md:12-16, :120-123). Eu construí um site em Next.js com dados em JSON estático, cruzamento por CPF e um script que confere a base contra a API pública do TSE.",
   "decisoes": [
    {
     "pergunta": "Por que JSON estático e não banco de dados?",
     "resposta": "Porque o volume (513 registros, somente leitura) não justifica um banco de dados.",
     "fonte": "raio-x-patrimonial/README.md:57-58 — \"o volume (513 registros, somente leitura) não justifica um banco de dados\"",
     "custo": "não documentado. A premissa é o volume pequeno e somente leitura."
    },
    {
     "pergunta": "Por que cruzar por CPF e não por nome de urna?",
     "resposta": "Porque o CPF é mais confiável que o nome de urna, que falhava em ~110 dos 513 por apelidos e nomes de urna divergentes. Ligar por nome acharia só 227 dos 296.",
     "fonte": "raio-x-patrimonial commit ba341b8; commit d3c726d — \"mais confiavel que nome de urna, que falhava em ~110 dos 513 por apelidos e nomes de urna divergentes\"",
     "custo": "não documentado. O commit registra o resultado: 470 de 513 casados."
    },
    {
     "pergunta": "Por que normalizar o CPF com zeros à esquerda?",
     "resposta": "Porque o cruzamento por igualdade de string falhava para todo candidato cujo CPF começa com zero, 118 mil registros só no arquivo de 2012.",
     "fonte": "raio-x-patrimonial/README.md:77-81; commit 7e6c813 — \"o cruzamento por igualdade de string falhava para todo candidato cujo CPF começa com zero — 118 mil registros só no arquivo de 2012.\"",
     "custo": "candidaturas presidenciais de 2014 têm CPF ocultado (-1) e não se ligam ao histórico; duas trajetórias ficam incompletas (README.md:275-278)."
    },
    {
     "pergunta": "Por que mediana e não média na comparação 2022 x 2026?",
     "resposta": "Porque a variação máxima passa de 5.000% e distorceria qualquer média.",
     "fonte": "raio-x-patrimonial commit d3c726d — \"a variação máxima passa de 5.000% e distorceria qualquer média.\"",
     "custo": "o percentual não é calculado quando a declaração de 2022 foi zero (commit d3c726d). Os valores são nominais (README.md:266)."
    },
    {
     "pergunta": "Por que não há link para a ficha do TSE dos eleitos de 2026?",
     "resposta": "Porque um código chutado geraria links quebrados, e o código de eleição não foi confirmado.",
     "fonte": "raio-x-patrimonial commit a1d8de5; README.md:232-235 — \"um código chutado geraria links quebrados.\"",
     "custo": "os eleitos de 2026 não têm verificação pela API nem link para a ficha (README.md:234-235)."
    },
    {
     "pergunta": "Por que usar a composição atual da Câmara para 18 deputados do Maranhão?",
     "resposta": "Porque o resultado padrão do TSE estava sem o resultado proporcional do estado, e o rótulo de fonte existe para não esconder que a fonte da situação eleitoral, nesse caso específico, não é o próprio TSE.",
     "fonte": "raio-x-patrimonial/README.md:147-152 — \"para não esconder que a fonte da situação eleitoral, nesse caso específico, não é o próprio TSE.\"",
     "custo": "o resultado de 2022 desses 18 não vem do TSE (README.md:281-285). Depois que o TSE corrigiu o arquivo, a reconciliação passou a valer só enquanto o arquivo não trouxer eleitos do MA (README.md:166-168; commit a1d8de5)."
    },
    {
     "pergunta": "Por que um script que confere a base contra a API do TSE?",
     "resposta": "Porque um projeto sobre transparência não pode pedir que o leitor confie na palavra do autor. O script cobre os 513 deputados.",
     "fonte": "raio-x-patrimonial/README.md:120-123; commit 7e6c813 — \"um projeto sobre transparência não pode pedir que o leitor confie na palavra do autor.\"",
     "custo": "a verificação cobre só os eleitos de 2022 (README.md:232-235)."
    },
    {
     "pergunta": "Por que uma página por deputado, renderizada no servidor?",
     "resposta": "Porque é útil para apontar uma trajetória específica sem mandar a pessoa procurar na lista, e o link ganha título e descrição próprios.",
     "fonte": "raio-x-patrimonial/README.md:38-41; commit 952ec82 — \"útil para apontar uma trajetória específica sem mandar a pessoa procurar na lista.\"",
     "custo": "não documentado."
    },
    {
     "pergunta": "Por que os projetos de lei ficam em um arquivo por deputado?",
     "resposta": "Porque o conjunto completo passa de 20MB com as ementas, grande demais para embutir no carregamento da página. Mantenho só um resumo pequeno para a página /leis.",
     "fonte": "raio-x-patrimonial commit ba341b8; commit 598379c — \"o conjunto completo passa de 20MB com as ementas, grande demais para embutir no carregamento da pagina.\"",
     "custo": "não documentado."
    }
   ],
   "semMotivo": [
    "Next.js (App Router) servido por vinext sobre Vite, React 19 e TypeScript — README.md:47-48.",
    "Gráfico de evolução patrimonial em SVG escrito à mão, sem biblioteca — README.md:51-53.",
    "Mapa do Brasil com @svg-maps/brazil — commit 8fad21f.",
    "Scripts de dados só com a biblioteca padrão do Python — README.md:55-56.",
    "Testes com o runner nativo `node:test` — README.md:61.",
    "CPF retirado do arquivo publicado — README.md:197-198.",
    "Valores nominais, sem correção pelo IPCA — README.md:266; docs/ROTEIRO.md:41.",
    "Fotos oficiais dos candidatos incluídas no site — commit 7e6c813."
   ],
   "dificeis": [
    {
     "pergunta": "Seus dados estão corretos? Como alguém confere?",
     "resposta": "Documentado: há um script que confere a base contra a API pública do TSE (README.md:120-123), mas só para os eleitos de 2022 (README.md:232-235)."
    },
    {
     "pergunta": "Quais as limitações dos dados?",
     "resposta": "Documentado: valores nominais (README.md:266); 18 deputados do MA com situação eleitoral de 2022 vinda da Câmara (README.md:147-152, :281-285); duas trajetórias incompletas por CPF ocultado em 2014 (README.md:275-278); eleitos de 2026 sem verificação nem link (README.md:234-235)."
    },
    {
     "pergunta": "Onde quebra em escala?",
     "resposta": "Documentado só o caso dos projetos de lei (mais de 20MB, por isso carregados sob demanda por deputado). O resto: prepare sua resposta."
    },
    {
     "pergunta": "Como você testou?",
     "resposta": "Os relatórios citam o runner `node:test` (README.md:61) e o script de conferência com a API do TSE. Cobertura: prepare sua resposta."
    },
    {
     "pergunta": "O que foi seu e o que foi de ferramenta ou IA?",
     "resposta": "Registrado no histórico: 5 commits trazem `Co-Authored-By: Claude Sonnet 5` (8fad21f, 4540a33, ba341b8, f1a2a9c, 598379c). O README assina \"Dados e desenvolvimento por Vitor Barbosa\" (README.md:289). A divisão do trabalho: prepare sua resposta."
    }
   ]
  },
  {
   "projeto": "thronfolge",
   "aviso": "",
   "pitch": "O problema: um jogo de estratégia política em mapa, a partir da morte de Henrique I em 936, em que a sucessão vira uma simulação em que personagens têm conhecimento parcial e memórias, e a história real só inicializa a partida (README.md:3-7; contexto.md:8-11). O protótipo é HTML, CSS e JavaScript sem bibliotecas externas nem motor de jogo, com a simulação separada da interface e testada com `node --test`. As decisões dos agentes são determinísticas, sem IA generativa na primeira versão.",
   "decisoes": [
    {
     "pergunta": "Por que HTML e JavaScript puros e não um motor de jogo como o Godot?",
     "resposta": "Porque o ambiente já possui Node, não possui Godot, e um mapa político estático não justifica instalar um motor antes de validar o núcleo do jogo.",
     "fonte": "thronfolge/contexto.md:98-102 — \"o ambiente atual já possui Node, não possui Godot, e um mapa político estático não justifica instalar um motor antes de validar o núcleo do jogo.\"",
     "custo": "não documentado como custo; contexto.md:103 limita a escolha ao protótipo (\"não impede empacotamento ou migração futura\")."
    },
    {
     "pergunta": "Por que a simulação é separada da interface?",
     "resposta": "A simulação não depende da interface e é testada pelo executor nativo do Node.js; o ambiente já tem Node, não tem Godot, e um mapa político estático não justifica instalar um motor antes de validar o núcleo.",
     "fonte": "thronfolge/contexto.md:99-102 — \"o ambiente atual já possui Node, não possui Godot, e um mapa político estático não justifica instalar um motor antes de validar o núcleo do jogo.\"",
     "custo": "não documentado."
    },
    {
     "pergunta": "Por que sem IA generativa?",
     "resposta": "Porque o projeto prioriza baixo custo de desenvolvimento e de execução. As decisões dos agentes são determinísticas (utilidade e regras). Só avaliaria um modelo local depois de um protótipo jogável.",
     "fonte": "thronfolge/README.md:9-11; contexto.md:63, :91 — \"O projeto prioriza baixo custo de desenvolvimento e de execução.\"",
     "custo": "não documentado. Condição de revisão: avaliar modelo local \"apenas se ele melhorar decisões ou diálogos de maneira mensurável\" (contexto.md:92-94)."
    },
    {
     "pergunta": "Por que \"três de cinco\" grandes para eleger o rei, sem falar em voto?",
     "resposta": "Porque as fontes de 936 buscam consenso e não contam votos; o precedente mais próximo é 919. A interface não fala em voto nem em maioria.",
     "fonte": "thronfolge/RECADOS.md:56-58; commit 0bf8ba5 — \"as fontes buscam consenso e não contam votos. O precedente mais próximo é 919\"",
     "custo": "\"simplificação declarada\" (contexto.md:64-65); quem não aderiu \"permanece como pendência de reconhecimento para sistemas futuros\" (contexto.md:65-66)."
    },
    {
     "pergunta": "Por que a eleição é o que faz rei, e a unção não é condição?",
     "resposta": "Porque a eleição é o passo que faz rei, e a unção não era obrigatória (Henrique I a recusou em 919).",
     "fonte": "thronfolge/RECADOS.md:51-55 — \"a eleição é o passo que faz rei; a unção não era obrigatória (Henrique I a recusou em 919).\"",
     "custo": "não documentado."
    },
    {
     "pergunta": "Por que Siegfried não é um sexto apoio?",
     "resposta": "Porque incluir Siegfried agora quebraria o recorte testado de cinco poderes. A Saxônia é representada por Otto.",
     "fonte": "thronfolge/contexto.md:72-74 — \"incluir Siegfried agora quebraria o recorte testado de cinco poderes.\"",
     "custo": "\"Otto representar o poder saxão é uma simplificação declarada\" (contexto.md:73)."
    },
    {
     "pergunta": "Por que a campanha começa em 2 de julho de 936 e a história só inicializa o jogo?",
     "resposta": "Porque a história serve somente para inicializar a campanha; depois do início a cronologia histórica deixa de ser obrigatória.",
     "fonte": "thronfolge/contexto.md:21-22; RECADOS.md:308-309 — \"A história serve somente para inicializar a campanha.\"",
     "custo": "\"a simulação pode divergir completamente da cronologia real\" (contexto.md:22)."
    },
    {
     "pergunta": "Como você decidiu a grafia dos nomes?",
     "resposta": "Uso provisório: forma portuguesa quando há tradição em português e forma original quando não há. A convenção final é decisão minha e está em aberto.",
     "fonte": "thronfolge/contexto.md:172, :183-190; commit 928f7f8; RECADOS.md:167-169 — \"forma portuguesa quando há tradição em português\" (uso provisório nos dados, listado em \"Decisões em aberto\"; a convenção é decisão do Vitor ainda não tomada)",
     "custo": "Otto ou Otão e Eberhardo ou Eberardo ficam em aberto; \"até lá nada muda\" (RECADOS.md:167-169)."
    },
    {
     "pergunta": "Por que os recursos de 936 estão em faixas?",
     "resposta": "Proposta do Claude, ainda em aberto (não é decisão confirmada): faixas, porque as fontes de 955 e 981 só dão escala.",
     "fonte": "thronfolge/contexto.md:172, :177-181; RECADOS.md:183-184 — registrada em \"Decisões em aberto\" como \"Proposta do Claude\": \"porque as fontes de 955 e 981 só dão escala\"",
     "custo": "\"As duas fontes são posteriores a 936: dão escala, não valores.\" (RECADOS.md:184)"
    },
    {
     "pergunta": "Por que limitar a troca de apoio a uma por mês?",
     "resposta": "Porque um grande trocava de lado várias vezes no mesmo mês sem custo, e a IA aceitava pedidos de apoio em nome do jogador. Agora abandonar um apoio exige vantagem de 15 pontos e pedidos ao jogador ficam pendentes até aceite ou recusa.",
     "fonte": "thronfolge commit 201ae5f; commit 1452cf4 — \"um grande trocava de lado várias vezes no mesmo mês sem custo, e a IA aceitava pedidos de apoio em nome do jogador.\"",
     "custo": "não documentado."
    },
    {
     "pergunta": "Por que o relatório final só conta acontecimentos registrados?",
     "resposta": "Para que nada seja inventado para fechar a história; a causa vem das memórias de quem decidiu.",
     "fonte": "thronfolge commit 43468e4 — \"para que nada seja inventado para fechar a história\"",
     "custo": "\"Campanhas sem acontecimentos suficientes recebem relatório curto, sem fatos inventados\" (RECADOS.md, resolução de 2026-10-04, linhas 199-205)."
    },
    {
     "pergunta": "Por que os textos ficam num JSON separado?",
     "resposta": "Para o Codex integrar sem que os textos e o código mudem no mesmo commit.",
     "fonte": "thronfolge commit ce5e7b2 — \"Fica num JSON para o Codex integrar sem que os textos e o código mudem no mesmo commit.\"",
     "custo": "não documentado."
    }
   ],
   "semMotivo": [
    "Poder e legitimidade separados; poder calculado de territórios, ouro e soldados — contexto.md:75-83; plano_de_acao.md:26.",
    "O motor valida toda ação e o LLM nunca altera o estado — contexto.md:61-62.",
    "Mapa 2D, estratégico e relativamente estático; tempo discreto — contexto.md:55-56.",
    "Campanha de até 24 meses e três apoios para terminar — contexto.md:70-71; plano_de_acao.md:12-13.",
    "Claude não altera código executável; Codex implementa — CLAUDE.md:19; contexto.md:89-125."
   ],
   "dificeis": [
    {
     "pergunta": "Quanto do jogo é história e quanto é invenção?",
     "resposta": "Documentado: a história só inicializa a campanha e a simulação pode divergir completamente da cronologia real (contexto.md:21-22). Simplificações declaradas: \"três de cinco\", Otto representando a Saxônia, recursos em faixas."
    },
    {
     "pergunta": "Por que não usar IA nos agentes?",
     "resposta": "Documentado: baixo custo de desenvolvimento e de execução, e avaliação de modelo local só se melhorar decisões ou diálogos de maneira mensurável (contexto.md:92-94)."
    },
    {
     "pergunta": "O que foi seu e o que foi de ferramenta ou IA?",
     "resposta": "Documentado como divisão de papéis: Claude não altera código executável, e o Codex implementa (CLAUDE.md:19; contexto.md:89-125), sem motivo escrito. O papel documentado do Vitor: visão, prioridades, escopo, aprovação de premissa e tecnologia, e a palavra final entre fidelidade histórica e jogabilidade (contexto.md:107-114). A grafia dos nomes ainda é decisão em aberto (contexto.md:172, :183-190). O restante: prepare sua resposta."
    },
    {
     "pergunta": "Como você testou?",
     "resposta": "Documentado: a simulação é validada com `node --test` (README.md:25-26). Cobertura e resultados: prepare sua resposta."
    },
    {
     "pergunta": "O que você faria diferente?",
     "resposta": "Documentado em parte: Otto/Otão e Eberhardo/Eberardo em aberto (RECADOS.md:167-169) e o reconhecimento de quem não aderiu, pendente para sistemas futuros (contexto.md:65-66). O resto: prepare sua resposta."
    }
   ]
  }
 ]
};
