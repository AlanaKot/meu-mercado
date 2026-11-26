// Abre o app num navegador invisível e confere as funções principais. Dados inventados.
const { chromium } = require("playwright");
const path = require("path");
let falhas = 0;
const ok = (c, m) => { console.log((c ? "ok   " : "FALHA ") + m); if (!c) falhas++; };
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 390, height: 800 } });
  const erros = []; p.on("pageerror", e => erros.push(e.message));
  await p.goto("file://" + path.resolve(__dirname, "../index.html"));
  const aba = async (h, t) => { await p.click(`a[href="#${h}"]`); await p.waitForFunction(t => document.querySelector("#titulo").textContent === t, t); };
  const txt = async () => (await p.innerText("#view")).replace(/\u00a0/g, " ");
  ok((await p.innerText("#titulo")) === "Resumo", "abre no Resumo");
  // teto
  await p.click(".w.tinta"); await p.fill("[name=m]", "1.000,00"); await p.fill("[name=s]", "250"); await p.click("dialog .primary");
  ok((await txt()).includes("Resta R$ 1.000,00"), "teto do mês aparece");
  // botão "+ Compra" cabe na tela do celular
  await aba("compras","Compras");
  ok(await p.$eval("[data-act=nova-compra]", b => { const r = b.getBoundingClientRect(); return r.right <= innerWidth && b.scrollWidth <= b.clientWidth; }), "botão + Compra cabe na tela");
  // compra
  await p.click("[data-act=nova-compra]");
  await p.fill("[name=nome]", "Sabão em pó"); await p.fill("[name=preco]", "12,50"); await p.fill("[name=qtd]", "2");
  const limp = await p.$eval("[name=cat]", s => [...s.options].find(o => o.text === "Limpeza").value); await p.selectOption("[name=cat]", limp);
  await p.fill("[name=local]", "Atacadão"); await p.click('dialog button[value=outro]');
  ok((await p.inputValue("[name=local]")) === "Atacadão", "salvar e anotar outro mantém o local");
  await p.fill("[name=nome]", "Bombom"); await p.fill("[name=preco]", "8,00"); await p.click('dialog .primary');
  ok((await txt()).includes("R$ 25,00") && (await txt()).includes("R$ 8,00"), "compras e totais (2 × 12,50 = 25,00)");
  // preenchimento automático pelo nome
  await p.click("[data-act=nova-compra]"); await p.fill("[name=nome]", "bombom");
  ok((await p.inputValue("[name=preco]")) === "8,00", "preço sugerido pelo nome");
  await p.click("dialog [data-fechar]");
  // categoria com limite
  await aba("categorias","Categorias"); await p.click("[data-act=nova-cat]");
  await p.fill("[name=nome]", "Padaria"); await p.fill("[name=limite]", "10"); await p.click("dialog .primary");
  ok((await txt()).includes("Padaria"), "categoria nova");
  const lim = await p.$$eval(".row[data-act=edit-cat]", rs => rs.length); ok(lim === 5, "5 categorias");
  // limite em Limpeza -> aviso
  await p.click("text=Limpeza"); await p.fill("[name=limite]", "30"); await p.click("dialog .primary");
  await aba("resumo","Resumo");
  const r = await txt();
  ok(r.includes("Gasto no mês") && r.includes("R$ 33,00") && r.includes("Resta R$ 967,00"), "resumo soma o mês e mostra o que resta");
  ok(r.includes("Limpeza") && r.includes("83% do limite"), "aviso de 80% do limite");
  ok(r.includes("Atacadão"), "por ida ao mercado");
  // lista simples: só o nome; o preço entra na hora de comprar
  await aba("lista","Lista"); await p.fill("#rapido-in", "Arroz"); await p.press("#rapido-in", "Enter");
  await p.fill("#rapido-in", "Feijão"); await p.press("#rapido-in", "Enter");
  ok((await txt()).includes("Arroz") && (await txt()).includes("Feijão"), "lista simples: só o nome, sem categoria nem valor");
  await p.click(".tick >> nth=0");
  ok((await p.inputValue("dialog [name=nome]")) === "Arroz", "círculo abre a compra com o nome");
  await p.fill("dialog [name=preco]", "30"); await p.click("dialog .primary");
  ok(!(await txt()).includes("Arroz") && (await txt()).includes("Feijão"), "comprado sai da lista");
  await p.click("text=Feijão"); await p.click("dialog .danger"); ok((await txt()).includes("Sua lista está vazia"), "excluir item da lista");
  await aba("compras","Compras"); ok((await txt()).includes("Arroz"), "…e vira compra");
  // apagar e desfazer
  await p.click("text=Arroz"); await p.click("dialog .danger"); ok(!(await txt()).includes("Arroz"), "excluir");
  await p.click("#toast button"); ok((await txt()).includes("Arroz"), "desfazer");
  // dados salvos
  await p.reload(); await aba("compras","Compras");
  ok((await txt()).includes("Sabão em pó"), "dados continuam depois de recarregar");
  ok(erros.length === 0, "sem erros no console" + (erros.length ? ": " + erros[0] : ""));
  await p.screenshot({ path: process.env.TELA || "/tmp/tela.png" });
  await b.close();
  console.log(falhas ? falhas + " falha(s)" : "Tudo certo"); process.exit(falhas ? 1 : 0);
})();
