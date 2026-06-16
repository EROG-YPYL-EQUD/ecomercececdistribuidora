CEC E-COMMERCE - VERSAO 5

Arquivos principais:
- index.html: pagina inicial publica melhorada
- loja.html: loja/e-commerce
- entregas.html: entrega e devolucoes
- contato.html: contato
- acompanhar.html: consulta de pedido
- admin.html: painel separado, nao aparece no menu publico

Imagens:
- Coloque novas imagens em: assets/img/
- No admin, no campo "Imagem do produto", informe o caminho, por exemplo:
 assets/img/cartucho-hp-664xl.jpg
- Tambem pode usar URL completa de imagem externa, mas o ideal e salvar na pasta assets/img/.

Admin:
- Acesse abrindo admin.html
- Senha inicial: admin123
- Esta versao salva produtos e pedidos no navegador/localStorage.
- Para usar em varios computadores, login seguro e pedidos online reais, precisa conectar com Firebase/Supabase.

Publicacao:
- Suba todos os arquivos e pastas para a raiz do GitHub/Vercel.
- Nao suba somente os HTML; suba tambem a pasta assets.


Versão 9: página inicial voltou para o visual escuro/institucional preferido, mantendo contatos atualizados e páginas separadas.


Versão 10: tema escuro/institucional aplicado ao site inteiro, mantendo home, loja, contato, entregas, acompanhar pedido e admin no mesmo padrão visual.


Versão 11 Luxo: acabamento premium com fundo escuro, detalhes dourados, cards com vidro/gradiente, botões sofisticados e tipografia institucional.


Versão 12 Luxo: removido o e-mail secundário. Mantidos o e-mail principal de vendas e o e-mail de garantia.


Versão 13 Pix: adicionado pagamento manual por Pix. Chave Pix CNPJ: 37.492.135/0001-21. Pedidos Pix entram como Aguardando pagamento e aparecem no Admin/acompanhar pedido.


Versão 14 Pix QR: adicionado QR Code Pix, Pix Copia e Cola, botão para copiar, cópia da chave Pix e valor automático do pedido no checkout, no pedido gerado e na tela de acompanhar pedido.


Versão 15 Passo 1: aplicado logo enviado pelo cliente, criado logo com fundo transparente/dourado, refinada a página inicial, cabeçalho e admin com identidade visual da C&C Distribuidora.


Versão 16: inserido na página inicial o texto institucional solicitado pelo cliente.


Versão 17: página inicial limpa. Removidos os blocos 'Suprimentos de impressão', 'Principais categorias' e 'Como podemos ajudar'. Categorias ficam apenas dentro da Loja.


Versão 18: página Entrega e Devoluções substituída pela política completa de trocas, devoluções e entrega, organizada em seções e com e-mail garantia@cecvendas.com.


Versão 19: adicionada seção de horário de funcionamento na página Contato. Formulário de inscrição não foi adicionado porque sem banco de dados não salva e-mails.


Versão 20: formulário de contato agora tem envio pelo WhatsApp e botão para abrir e-mail preenchido. Página de garantia também abre e-mail com assunto e corpo prontos.


Versão 21 SEO Google:
- Adicionadas meta descriptions, títulos SEO, canonical, Open Graph e Twitter Cards.
- Adicionado Schema.org JSON-LD do tipo Store com endereço, horário e contato.
- Criados robots.txt e sitemap.xml.
- Domínio configurado no sitemap/canonical: https://cecdistribuidora.com.br.br
IMPORTANTE: se publicar em outro domínio, trocar https://cecdistribuidora.com.br.br nos arquivos HTML e sitemap.xml.


Versão 22: removido o telefone (67) 98145-6492 e atualizado WhatsApp principal para (67) 3042-4796 em links, botões, rodapé, contato, WhatsApp de pedidos e dados SEO.


Versão 23: mantido também o telefone/WhatsApp (67) 98162-6428 como atendimento. O WhatsApp principal e pedidos continuam em (67) 3042-4796.


Versão 24: Finalizar Pedido organizado em seções e códigos de pedidos alterados para sequência CEC-000001, CEC-000002, CEC-000003...


Versão 25:
- Adicionado campo CEP no checkout.
- CEP entra no WhatsApp, acompanhamento de pedido e painel Admin.
- SEO melhorado com títulos, descrições, canonical, Open Graph, robots, sitemap, Schema.org Store, BreadcrumbList, FAQPage e ItemList da loja.
- Adicionado texto local discreto na home para ajudar o Google a entender Campo Grande/MS e os serviços.
Domínio usado no SEO: https://cecdistribuidora.com.br.br. Se publicar em outro domínio, trocar canonical/sitemap.


Versão 26: página inicial redesenhada em formato premium centralizado, com logo em destaque, título forte, texto institucional central, botões e contatos em cards menores.


Versão 27:
- Corrigido contato por e-mail quando o mailto não abre.
- Formulário de contato agora abre direto no Gmail Web ou Outlook Web.
- Adicionado botão para copiar mensagem.
- Garantia/trocas também pode abrir Gmail/Outlook e copiar e-mail.
Observação: o cliente ainda precisa clicar em Enviar dentro do Gmail/Outlook. Envio automático real exige serviço externo como Formspree, EmailJS, Firebase Functions ou Supabase Edge Functions.


Versão 28:
- Formulário de contato ajustado para uso online real.
- O botão "Enviar mensagem pelo site" envia para vendas@cecvendas.com usando FormSubmit.
- Mantido botão de WhatsApp e botão de copiar mensagem.
- Criada página obrigado.html para retorno após o envio.
- Importante: na primeira vez, o FormSubmit pode pedir confirmação no e-mail vendas@cecvendas.com. Depois de confirmado, os envios passam a chegar normalmente.
- Se publicar em domínio diferente de https://cecdistribuidora.com.br.br, trocar o campo _next do formulário em contato.html.


Versão 29:
- Adicionada aba Admin → Configurações do Site.
- Permite editar dados da empresa, textos da home, contatos, endereço, horário, Pix, políticas e SEO básico.
- As páginas principais leem parte dessas configurações automaticamente.
- Mantido exportar/importar configurações.
Importante: em site estático, alterações do Admin ficam no navegador do Admin. Para todos os visitantes verem em tempo real, o próximo passo obrigatório é ligar essas configurações ao Firebase/Supabase.


Versão 30:
- Domínio SEO atualizado para https://cecdistribuidora.com.br.br.
- Admin de produtos completo: preço, descrição, imagem, tipo, marca, código/SKU, cor, rendimento, impressoras compatíveis e observações.
- Loja exibe compatibilidade do produto no card e nos detalhes.
- Busca da loja pesquisa também por marca, SKU/código, cor, rendimento e impressoras compatíveis.
- Admin Configurações ganhou campo de palavras/frases de busca para SEO básico.
- Texto SEO discreto adicionado na Loja para ajudar o Google a entender cartuchos, toners, fotocondutores e Campo Grande/MS.


Versão 31:
- Criada página politica-privacidade.html.
- Criada página termos.html.
- Adicionados links legais no rodapé.
- Adicionado aviso simples de privacidade/cookies.
- Sitemap atualizado com as páginas legais.


Versão 32: corrigido botão "Entendi" do aviso de privacidade/cookies. Agora fecha em todas as páginas e fica salvo no navegador.


Versão 33: corrigido login do Admin. Senha: admin123. A função de login foi refeita para não travar se alguma renderização do painel der erro.


Versão 34: admin.html recebeu login independente/fallback. O botão Entrar funciona com senha admin123 mesmo se algum script da loja falhar.


Versão 35:
- Corrigido botão Excluir no menu Pedidos.
- Adicionados botões Ver e Copiar nos pedidos.
- Admin recebeu resumo do painel: Produtos, Pedidos e Configurações.


Versão 36:
- Admin de produtos ganhou escolha de imagem para preencher caminho automaticamente.
- O produto salva apenas caminho/URL da imagem, não salva o arquivo dentro do navegador.
- Criada pasta assets/img/produtos/ para colocar imagens dos produtos.
- Exemplo de caminho: assets/img/produtos/toner-brother.jpg.


Versão 37:
- Corrigido botão Baixar backup no Admin.
- Corrigido botão Restaurar produtos no Admin.
- Adicionado fallback direto no admin.html para os botões funcionarem mesmo se outro script falhar.
- Importar backup agora tem botão explícito.


Versão 38:
- Melhorado o visual do campo de importar backup no Admin.
- Removido o input de arquivo feio/nativo visível.
- Agora há botão elegante "Selecionar backup" e texto com o nome do arquivo escolhido.


Versão 39:
- Corrigido Pré-visualizar imagem do produto.
- Ao anexar imagem, agora a prévia aparece imediatamente.
- A imagem anexada passa a ser salva no cadastro do produto como base64, para aparecer na loja sem precisar copiar arquivo manualmente.
- O campo de caminho continua sendo preenchido para organização.


Versão 40:
- Corrigido Salvar produto.
- Corrigido botão Limpar.
- O formulário não recarrega mais a página.
- Se houver erro ao salvar, os dados permanecem no formulário.
- Imagem anexada é reduzida antes de salvar para evitar erro de espaço no navegador.


Versão 41:
- Corrigido problema da imagem base64 aparecendo como texto gigante.
- Imagem anexada continua salva e aparece na loja.
- No Admin e no modal aparece apenas o caminho limpo ou "Imagem anexada no cadastro".
- Produtos antigos que salvaram image=data:image são normalizados automaticamente para imageData.


Versão 42:
- Removida a exibição de caminho/base64/texto de imagem.
- Agora aparece somente a imagem do produto no Admin, preview e loja.
- Modal de detalhes não mostra mais campo "Imagem".


Versão 43:
- Corrigida sincronização local de pedidos.
- Pedido salvo na loja agora é gravado também por índice de código.
- Admin atualiza status pelo mesmo código usado no acompanhamento.
- Acompanhar pedido aceita CEC-000001, CEC000001, 000001 ou 1.
- Acompanhamento atualiza automaticamente no mesmo navegador a cada 2,5 segundos.
- Admin ganhou botão Atualizar pedidos.


Versão 44:
- Corrigido salvar produto offline quando há imagem.
- A imagem não é mais salva em base64/localStorage, evitando perda de dados e erro de espaço.
- O botão Escolher imagem só preenche o caminho e mostra prévia temporária.
- Para a imagem aparecer após salvar/publicar, coloque o arquivo em assets/img/produtos/ com o mesmo nome.
- Admin Produtos ficou compacto, com descrição e compatibilidade resumidas.
- Produtos antigos com base64 são limpos automaticamente para liberar espaço.


Versão 45:
- Corrigido sumiço da imagem na lista do Admin.
- Se o caminho da imagem não existir, aparece uma imagem padrão em vez de sumir.
- Lista de produtos mantém miniatura sempre visível.


Versão 46:
- Adicionado ABRIR_SITE_LOCAL.bat para testar offline do jeito certo usando localhost.
- Ao abrir por localhost, admin.html e loja.html compartilham o mesmo localStorage.
- Isso corrige o problema de o Admin salvar produto e a Loja aparecer com 0 produtos quando aberto direto por arquivo.


Versão 47:
- Ajustado o card/grid da aba Produtos do Admin.
- Formulário da esquerda ficou mais organizado e em painel próprio.
- Lista de produtos ganhou cabeçalho, colunas mais equilibradas e ações sem corte.
- Tabela ficou mais compacta e legível.
- Em telas menores, o formulário sobe e a lista vai para baixo automaticamente.


Versão 48:
- Adicionado botão no Admin: "Abrir Loja com produtos do Admin".
- Esse botão envia os produtos cadastrados no Admin diretamente para a Loja por link.
- Funciona mesmo quando VS Code/arquivo/localhost separam o localStorage.
- Loja importa automaticamente os produtos recebidos pelo link.
- Também há botão para copiar o link da Loja com produtos.


Versão 49:
- Rodapé compactado.
- Menos altura e espaçamento.
- Fontes menores e mais elegantes.
- Colunas do rodapé melhor equilibradas.
- Linha inferior do endereço/CNPJ ficou mais discreta.


Versão 50:
- Corrigido caso a Loja mostrar "13 produtos importados" mas continuar com 0 produtos.
- Após importar pelo link do Admin, a Loja agora força a renderização da vitrine.
- Também força renderização se já houver produtos salvos no localStorage.


Versão 51:
- Aumentado o grid/card da lista de produtos no Admin.
- Coluna Produto ficou mais larga.
- Miniaturas maiores.
- Nome, descrição e compatibilidade maiores e mais legíveis.
- Botões de ação mais confortáveis.


Versão 52:
- Rodapé refeito em duas linhas.
- Primeira linha: empresa, e-mails, contatos, política e termos.
- Segunda linha: endereço e CNPJ.
- Removidas as colunas altas do rodapé.


Versão 53:
- Removida a faixa visível com texto SEO/institucional no fim da página.
- SEO continua nos metadados do site.
- Rodapé permanece em duas linhas.


Versão 54:
- Card da Loja simplificado: imagem, título, preço e botões.
- Descrição e compatibilidade saíram do card.
- Adicionado botão "Ver" para visualização rápida em modal.
- Imagem agora tenta fallback automático pela categoria se falhar.


Versão 55:
- Corrigido botão X do modal.
- Corrigida imagem no modal com fallback.
- Corrigido botão adicionar ao carrinho dentro do modal.
- Adicionada quantidade no card antes de adicionar.
- Adicionada quantidade no modal antes de adicionar.


Versão 57:
- Corrigido salvamento da imagem dentro do cadastro.
- A imagem escolhida no Admin é convertida em uma prévia leve e salva em imageData.
- A imagem aparece no Admin, na Loja e no modal Ver.


Versão 58:
- Modal Ver ajustado para a imagem não cobrir as informações.
- Imagem fica em bloco controlado.
- Informações ficam ao lado em tela grande e abaixo no celular.
- Conteúdo do modal tem rolagem interna.


Versão 59:
- Ajustada a área de compra no modal Ver.
- Preço não fica mais cortado.
- Quantidade ficou alinhada e centralizada.
- Botão Adicionar ao carrinho ficou proporcional.
- Layout responsivo para celular.


Versão 60:
- Corrigida imagem cadastrada na vitrine.
- Card da Loja prioriza imageData salva no cadastro.
- Modal Ver também usa a imagem cadastrada.
- Botão Abrir Loja com produtos do Admin agora transfere produtos sem perder imagem.


Versão 61:
- Corrigida imagem que não aparecia na vitrine.
- Agora a imagem é salva em imageData e também em um mapa separado por ID do produto.
- A vitrine busca a imagem salva antes de cair na imagem padrão.
- O botão Abrir Loja com produtos do Admin também transfere o mapa das imagens.


Versão 62:
- Corrigido nome do produto que sumia no card da vitrine.
- Card agora mostra imagem, categoria, título, preço, quantidade, Ver e Adicionar.
- Layout do card ficou com altura mínima para não cortar o título.


Versão 64:
- Volta ao card mais próximo do original.
- Corrige o nome espremido.
- Mantém a imagem no tamanho original da vitrine.
- Deixa Adicionar embaixo para não apertar o título.


Versão 65:
- Diminui a imagem da vitrine.
- Garante que o título apareça sem ser coberto.
- Mantém o restante do layout da versão original.


Versão 67:
- Revertido o grid alargado.
- Vitrine voltou para grade compacta/original.
- Imagem menor e isolada.
- Nome do produto visível.
- Botões organizados sem deixar o card feio.


Versão 68:
- Remove o texto repetido de categoria abaixo da imagem na vitrine.
- Aumenta a área da imagem do card para ela não ficar cortada.
- Mantém grid compacto e bonito.


Versão 69:
- Categorias voltaram a aparecer no filtro da Loja.
- Filtro por categoria agora separa corretamente os produtos.
- Categorias são criadas automaticamente a partir dos produtos cadastrados.
- Menu suspenso da Loja também passa a usar as categorias cadastradas.
- Para adicionar mais menus/categorias, basta cadastrar produto com nova categoria.


Versão 70:
- Removida mensagem verde de "produtos carregados do Admin" na Loja.
- Menu Loja estabilizado para não ficar piscando/recriando categorias várias vezes.
- Filtro de categorias só atualiza quando a lista realmente muda.


Versão 71:
- Corrigido botão Adicionar ao carrinho na vitrine.
- Corrigido botão Adicionar ao carrinho no modal Ver.
- Corrigido botão Ver carrinho/Carrinho para abrir o drawer.
- Carrinho agora atualiza quantidade, total, remover e contador.


Versão 72:
- Corrigido bug ao clicar nas categorias dentro da Loja.
- Categoria do menu não recarrega a página quando já está na Loja.
- Categoria filtra produtos sem trocar/quebrar o layout da vitrine.
- Loja e categorias usam o mesmo render de card.


Versão 73:
- Corrigido botão Todos quebrando o card.
- Todos e categorias agora usam exatamente o mesmo renderizador da vitrine.
- Título, preço, quantidade, Ver e Adicionar aparecem em todos os filtros.


VERSÃO 74 FIREBASE ONLINE
- Produtos, pedidos e configurações conectados ao Firebase/Firestore.
- Suba todos os arquivos no GitHub, inclusive assets/firebase-config.js.
- Configure o Firestore conforme CONFIGURAR_FIREBASE.txt.
