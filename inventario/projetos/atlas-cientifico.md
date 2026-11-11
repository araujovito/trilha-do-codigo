# atlas-cientifico

Repositório: https://github.com/araujovito/atlas-cientifico

## O que é
Plataforma para guardar artigos científicos, conferir de onde vem cada número e registrar medidas com a página e o trecho exato de origem. O backend é uma API Spring Boot que lê PDFs em um processo separado, com fila durável no PostgreSQL.

## Do que é feito
- Java 21 (cerca de 75%) — a linguagem da API (api/pom.xml:30).
- Spring Boot 4.1.1 — o framework que monta a aplicação web, o agendamento e a configuração (api/pom.xml:8).
- Apache PDFBox 3.0.8 — extrai o texto de cada página do PDF (api/pom.xml:48-49).
- SQL e Flyway — 20 migrações que criam e alteram as tabelas (api/pom.xml:57, :73).
- PostgreSQL 18 — o banco, local em 127.0.0.1:5433; o 18 vem da imagem `postgres:18` (docker-compose.yml:4-5); o driver (api/pom.xml:78) não fixa versão no pom.
- Testcontainers — PostgreSQL descartável nos testes (api/pom.xml:113-118).
- Playwright 1.63.0 — testa a tela no navegador Chromium (api/pom.xml:123-124).
- Jackson — lê o JSON que o subprocesso devolve (ExtratorPdfIsolado.java:14-15).
- OpenTelemetry starter — telemetria (api/pom.xml:44).
- JavaScript/HTML (api/src/main/resources/static/) — tela de protótipo.
- Spring Security crypto e bcprov — dependências de criptografia; uso não conferido no código (api/pom.xml:35, :39-40).

## Como as peças se encaixam
1. O usuário envia um PDF (pacote dev/atlas/documentos/).
2. O extrator de texto lê o PDF página a página e marca o estado: TEXTO_EXTRAIDO ou PRECISA_OCR (ExtratorTextoPdf.java:30-40).
3. Uma fila durável no PostgreSQL guarda as tarefas de extração; um worker agendado chama tick() a cada intervalo (FilaExtracaoWorker.java:30).
4. Para isolar o risco, o PDF é lido em outra JVM, com tempo limite e no máximo 2 leitores ao mesmo tempo (ExtratorPdfIsolado.java:21, :28, :33-41).
5. O localizador encontra o trecho exato dentro do texto (LocalizadorDeTrecho.java:16).

## Conceitos que aparecem aqui
(caminhos abaixo relativos a api/src/main/java/dev/atlas/documentos/, como no relatório)
- Componente gerenciado pelo Spring (injeção) — api/src/main/java/dev/atlas/documentos/ExtratorTextoPdf.java:13-14 — a classe é registrada como bean com @Component.
- try-with-resources — ExtratorTextoPdf.java:22 — o PDFBox é fechado ao fim do bloco, mesmo com exceção.
- Laço página a página — ExtratorTextoPdf.java:30-36 — cada página é extraída separadamente e guardada com seu número.
- Enum — EstadoExtracaoPdf.java:3-6 — dois estados: TEXTO_EXTRAIDO ou PRECISA_OCR, escolhidos em ExtratorTextoPdf.java:38-40.
- Record (dado imutável) — LocalizadorDeTrecho.java:16 — Resultado guarda situação e posições do trecho.
- Agendamento periódico — FilaExtracaoWorker.java:30 — @Scheduled chama tick() a cada intervalo configurado.
- Tratamento de exceção com decisão — FilaExtracaoWorker.java:54-64 — 503 devolve a tarefa sem gastar tentativa; 4xx exceto 429 vira erro permanente.
- Semáforo (limite de concorrência) — ExtratorPdfIsolado.java:21 e :28 — no máximo 2 parsers simultâneos; sem vaga, responde 503.
- Subprocesso com tempo limite — ExtratorPdfIsolado.java:33-41 — o PDF é lido em outra JVM com ambiente limpo; passou do prazo, o processo é morto.
- finally para limpeza — ExtratorPdfIsolado.java:59-65 — libera o semáforo e apaga o diretório temporário.

## Dúvidas em aberto
- Contagem de testes (117 no README, 134 no último commit) não conferida; não rodei testes.
- docs/, deploy/ e .github/workflows/ci.yml não foram lidos além do README.
- Frontend React/TS previsto no README não existe na árvore; a tela atual é HTML/JS em api/src/main/resources/static/.
- Não foi confirmado o endpoint de extração síncrona descrito no README.

Fonte: relatório de leitura do projeto (rascunho local, fora do repositório)
