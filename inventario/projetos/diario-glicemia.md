# diario-glicemia

Repositório: https://github.com/araujovito/diario-glicemia

## O que é
Página única (PWA) para anotar glicemia, refeições, insulina e hipoglicemias de uma criança, com resumo para consulta médica e exportação em PDF e CSV. Os dados ficam no Supabase com login Google e regras de acesso por papel; sem configuração, funciona só no navegador.

## Do que é feito
- JavaScript (cerca de 60%) — a lógica de cálculo (site/logic.js) e o acesso ao banco (site/supabase.js).
- HTML (cerca de 25%) — a interface inteira em site/index.html (1872 linhas).
- Supabase JS 2.117.2 — cliente do banco e do login Google, copiado em site/vendor/.
- SQL (supabase/migrations/) — tabelas, regras de acesso (RLS) e funções gravar_dia, ler_dias, entrar.
- pgTAP — testes das regras de acesso no banco (supabase/tests/).
- Service worker nativo — deixa o site funcionar offline (site/sw.js).
- Playwright e node:test — testes de lógica e de navegador (tests/).
- Python com openpyxl — gera a planilha Excel a partir da folha A4 (planilha/gerar_planilha.py:4-9).
- Wrangler (Cloudflare) — publica só site/ como arquivos estáticos (wrangler.jsonc).

## Como as peças se encaixam
1. O usuário abre site/index.html; sem config, os dados ficam só no navegador.
2. Com Supabase, o login Google usa o fluxo PKCE (site/supabase.js:26-28).
3. Ao salvar, o site chama a função gravar_dia por RPC; `p_substituir` escolhe entre mesclar e substituir o dia (supabase.js:151-153).
4. O banco só deixa quem tem o papel certo ler e escrever (RLS) e grava o autor com um trigger (migrations/20260927120000_diario.sql:184-192, :163-178).
5. logic.js faz os cálculos de resumo (percentil, desvio) (logic.js:11-16).
6. O service worker guarda a "casca" do site para uso offline (sw.js:1-18).

## Conceitos que aparecem aqui
- Módulo UMD — site/logic.js:1-5 — exporta para Node (module.exports) e para o navegador (window).
- Percentil por interpolação — site/logic.js:11-15 — quantil linear entre dois valores.
- Desvio amostral — site/logic.js:16 — divide por n-1.
- Normalização de texto — site/logic.js:19-23 — remove acento, stopwords e plural simples para agrupar pratos.
- Lembrete de 2 h — site/logic.js:32-36 — calcula o horário a partir da refeição.
- Atualização otimista — site/logic.js:42-46 — aplica antes, desfaz se o save falhar.
- Mesclagem sem apagar — site/logic.js:55-59 — registro nulo da cópia não remove o que existe.
- Tradução de erro — site/supabase.js:14-18 — códigos do Postgres viram erro de permissão do site.
- Cliente com PKCE — site/supabase.js:26-28 — login Google com fluxo PKCE.
- Gravação por RPC — site/supabase.js:151-153 — `p_substituir` escolhe entre mesclar e substituir o dia.
- RLS por papel — supabase/migrations/20260927120000_diario.sql:184-192 e :231-234 — ativa RLS e cria políticas em laço.
- Autoria pelo banco — supabase/migrations/20260927120000_diario.sql:163-178 — trigger grava quem escreveu.
- Cache de casca — site/sw.js:1-18 — cache-first para a lista APP e fallback para index.html na navegação.

## Dúvidas em aberto
- Não há requirements.txt para gerar_planilha.py; versão do openpyxl não declarada.
- Não li o HTML da interface (site/index.html, 1872 linhas) além dos pontos de entrada.
- Abri site/config.js para ver a estrutura; ele contém a URL e a chave pública (anon) do Supabase, que não foram copiadas para este relatório.
- Não abri o .xlsx da pasta planilha/.
- Não li supabase/tests nem as funções SQL de ler_dias/gravar_dia.

Fonte: relatório de leitura do projeto (rascunho local, fora do repositório)
