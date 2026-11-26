# Meu Mercado

App pessoal para controlar quanto gasta no mercado: teto do mês e da semana, compras por categoria e lista de compras. Irmão do [Meus Gastos](https://github.com/AlanaKot/meus-gastos) e do [Meu Semestre](https://github.com/AlanaKot/meu-semestre-site), feito no mesmo padrão.

## Como usar

O app inteiro é o arquivo `index.html`. Ele funciona hospedado (GitHub Pages) ou aberto direto no navegador. Os dados ficam salvos só no aparelho em que você usa o app; não vão para nenhum servidor.

No celular: abra o site, toque em Compartilhar e **Adicionar à Tela de Início** (iPhone), ou em **Instalar** (Android).

1. **Resumo:** toque no quadro verde para definir o **teto do mês** (e, se quiser, o da semana). O quadro mostra quanto já gastou, quanto resta e a previsão do mês no ritmo atual.
2. **Compras:** toque em **+ Compra** e anote item, preço, quantidade, categoria, data e onde comprou. "Salvar e anotar outro" agiliza na hora do caixa. O app lembra o preço e a categoria de itens que você já comprou.
3. **Lista:** o que precisa comprar. O círculo marca como comprado e abre a compra já preenchida. Mostra o estimado da lista contra o que resta do teto.
4. **Categorias:** Alimentos, Limpeza, Doce e Diversos já vêm criadas; crie outras. O limite mensal de cada uma é opcional.

## Onde estou pecando

No **Resumo**: gasto por categoria (% do total e barra do limite), comparação com o mês passado por categoria, itens que mais pesaram e total de cada ida ao mercado. Quando uma categoria chega a 80% do limite, aparece um aviso.

## Dados

Em **Ajustes** (botão ◐): tema, cor do app, backup `.json` (baixar e importar) e planilha CSV.
