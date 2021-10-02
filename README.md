# Projeto Cadastro de Serviço Para Porto

## Descrição
O projeto tem como objeto realizar um crud completo em duas categorias, o contêiner
e as movimentações dentro do porto, após a realização desses serviços é possível mostrar um relatório informando a quantidade total de importação/exportação e todas as movimentações realizadas de forma detalhada, tendo um filtro para clientes e outro para os tipos de movimentação.

## Pedidos Propostos
 
### Crud de Contêiner
1. Cliente;
2. Número do contêiner (4 letras e 7 números. Ex: TEST1234567);
3. Tipo: 20 / 40;
4. Status: Cheio / Vazio;
5. Categoria: Importação / Exportação;
 
### Crud de Movimentações;
1. Tipo de Movimentação (embarque, descarga, gate in, gate out, reposicionamento, pesagem, scanner);
2. Data e Hora do Início;
3. Data e Hora do Fim;
 
### Relatório com o total de movimentações agrupadas por cliente e tipo de movimentação.
1. No final do relatório deverá conter um sumário com o total de importação/exportação.

## Instalação
Para realizar a instalação deve ser realizado os seguintes passos
1. Realize a clonagem do código;
2. Vá na pasta destino e entre dentro de cada uma das pastas backend/frontend;
3. Utilize o código "yarn install";
4. Abra dois terminais;
5. Em cada terminal entre em uma das pastas;
6. Utilize o código "yarn start" em cada um deles;
7. No final deve estar rodando o front-end e back-end;

## Instrução de Uso

### Contêiner e Movimentação
1. Para realizar o cadastro do contêiner e movimentação clique no botão respectivo na página home;
2. Preencha todos os campos;
3. Clique em enviar, retornando uma mensagem de confirmação;
4. Para editar pesquise por meio do documento ou do número do contêiner;
5. Troque o valor necessário e clique no botão de edição;
6. Para excluir realize o processo anterior de pesquisa;
7. Clique no botão de deletar;

### Relatório
1. Para realizar o relatório é necessário ter preenchido ao menos um contêiner ou movimentação;
2. Após isso escolha o tipo de filtro e clique nele;
3. Irá trazer o relatório do mesmo separado pelo filtro desejado;
4. Ao final irá mostrar o total de importação e exportação;

## Erros
1. Um possível erro que possa ocorrer é no cadastro da movimentação, onde se não selecionar um valor para o tipo além do padrão, ele iria acusar que está em branco, para resolver isso deve clicar em outro e clicar novamente no primeiro caso desejar;
2. Se caso excluir o banco de dados com servidor em funcionamento pode apresentar um erro, devendo finalizar o servidor e rodar novamente para realizar a criação das tabelas;
