class Produto  {
    constructor( id, nome, tipo, duracao, valorMin, valorMax) {
        this.id = id;
        this.nome = nome;
        this.tipo = tipo;
        this.duracao = duracao;
        this.valorMin = valorMin;
        this.valorMax = valorMax;
        
    }

    async pesquisarProdutos(conexao){
	 	//Instanciando objeto usuário
	 	//mapeamento recebe o objeto do usuário mapeado. Precisamos aguardar a resposta do select
	 	const mapear = await conexao.produtoModel.findAll().map(item => { 
	 		const produto = new Produto();
	 		const { id, nome, tipo, duracao, valorMin, valorMax } = item;
	 		produto.id = id;
	 		produto.nome = nome;
	 		produto.tipo = tipo;
	 		produto.duracao = duracao;
	 		produto.valorMin = valorMin;
	 		produto.valorMax = valorMax;
	            //console.log(produto);
	            return produto;
	        });
	 	//Retornando para a api
	 	console.log(mapear);
	 	return mapear;
	 }

	 async CadastrarProduto(conexao, produto){
	 	//Instanciando objeto empresa
	 	const cadastro = await conexao.produtoModel.create({
	 		id: produto.id,
	 		nome: produto.nome,
	 		tipo: produto.tipo,
	 		duracao: produto.duracao,
	 		valorMin: produto.valorMin,
	 		valorMax: produto.valorMax
	 	});
	 	return cadastro;
	 }

	 async pesquisarProduto(conexao, id){
	 	const produto = await conexao.produtoModel.findById(id);
	 	console.log(produto);
	 	return produto;
	 }

	 async alterarProduto(conexao, id, produto){
	 	const novaproduto = await conexao.produtoModel.update({
	 		nome: produto.nome,
	 		tipo: produto.tipo,
	 		duracao: produto.duracao,
	 		valorMin: produto.valorMin,
	 		valorMax: produto.valorMax
	 	},{where: {id: id}});

	}

	async removerProduto(conexao, id){
		try{
			const produto_removida = await conexao
			.produtoModel.destroy(
				{where:{id: id}}
				);
			return produto_removida;
		}catch(e){
			console.log(e);
		}
	}
}
//Deixamos a classe publica
module.exports = Produto;

