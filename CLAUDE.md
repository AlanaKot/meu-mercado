# Regras do projeto

Meu Mercado: app pessoal para controlar o gasto com mercado. Irmão do **Meus Gastos** (`AlanaKot/meus-gastos`) e do **Meu Semestre** (`AlanaKot/meu-semestre-site`); segue o mesmo padrão deles.

## Sobre quem usa

- A dona do projeto é iniciante em programação. Explique termos novos em uma frase.
- Respostas curtas e diretas, em português.

## Fluxo de mudanças

- Nunca enviar direto na `main` (exceto o primeiro envio do app).
- Toda mudança: criar uma branch, fazer commit, abrir um PR e mandar o link.
- Só fazer merge quando ela pedir ("pode juntar").

## Testes

- `node testes/testar.js` abre o app num navegador invisível e confere as funções principais (precisa de Node e Playwright). Rodar antes de abrir um PR; tem que terminar em "Tudo certo".
- Ao criar ou mudar uma função, acrescentar ou ajustar a conferência dela no mesmo arquivo. Usar só dados inventados.

## Padrão do app

- **Visual:** padrão dos apps do iPhone (título grande, listas em quadros sobre fundo cinza, barra de abas embaixo no celular). Cor escolhida em Ajustes (verde por padrão, azul ou bordô), guardada só no aparelho. Fontes do sistema, sem Google Fonts.
- **Arquivos na mesma pasta do `index.html`:** `manifest.webmanifest`, `sw.js` e os ícones `icon-192.png`, `icon-512.png` e `apple-touch-icon.png`. Ao mudar `sw.js` ou os ícones, aumentar a `VERSAO` dentro do `sw.js`.
- **Dados:** `localStorage` (chave `meu-mercado-v1`). Todo item salvo ganha `_t` (hora da mudança) e todo item apagado vai para `S.apagados`. Backup `.json` (baixar e importar: o item mais novo vence; ajustes só entram se faltam).
- Se uma tela der erro ao desenhar, `render()` mostra um aviso em vez de ficar em branco.
- Tudo em `index.html`, sem etapa de build, sem servidor e sem IA. Nunca gravar chave ou senha no código.

## O que o app faz

- **Teto** (`S.config.teto` do mês, `S.config.tetoSemana` da semana, segunda a domingo), editado em `formTeto()`.
- **Compras** (`S.compras`): `nome`, `preco` (cada), `qtd`, `cat`, `data`, `local`. Total = preço × quantidade (`total()`). Sugere preço e categoria pelo nome já comprado.
- **Lista** (`S.lista`): `nome`, `cat`, `preco` estimado. O círculo abre `formCompra` com `listaId`; ao salvar, o item sai da lista.
- **Categorias** (`S.categorias`): nome, cor, limite mensal opcional. Apagar categoria não apaga compras (ficam "Sem categoria").
- **Resumo:** gasto do mês contra o teto, semana, previsão do mês, gasto por categoria, comparação com o mês anterior, itens que mais pesaram, total por ida (data + onde), aviso de 80% do limite.
- Dinheiro em pt-BR (R$ 1.250,00). Aceitar `12,50`, `12.50` e `1.250,00`.

## Ideias para depois

Sincronizar com o Google Drive (como no Meus Gastos), repetir a lista do mês anterior, histórico de preço por item.

## Publicação

GitHub Pages (branch `main`, pasta raiz). Repositório público, sem dado pessoal no código.
