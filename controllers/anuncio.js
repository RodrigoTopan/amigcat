class Anuncio{
    constructor(id, foto, descricao, preco, dataInicio, dataFim) {
        this.id = id;
        this.foto = foto;
        this.descricao = descricao;
        this.preco = preco;
        this.dataInicio = dataInicio;
        this.dataFim = dataFim;
        
    }

	async pesquisarAnuncios(conexao){
	 	//Instanciando objeto usuário
	 	//mapeamento recebe o objeto do usuário mapeado. Precisamos aguardar a resposta do select
	 	const mapear = await conexao.anuncioModel.findAll().map(item => { 
	 		const anuncio = new Anuncio();
	 		const { id, foto, descricao, preco, dataInicio, dataFim } = item;
	 		anuncio.id = id;
	 		anuncio.foto = foto;
	 		anuncio.descricao = descricao;
	 		anuncio.preco = preco;
	 		anuncio.dataInicio = dataInicio;
	 		anuncio.dataFim = dataFim;
	            //console.log(anuncio);
	            return anuncio;
	        });
	 	//Retornando para a api
	 	console.log(mapear);
	 	return mapear;
	 }

	 async CadastrarAnuncio(conexao,anuncio){
	 	//Instanciando objeto empresa
	 	const cadastro = await conexao.anuncioModel.create({
	 		id: anuncio.id,
	 		foto: anuncio.foto,
	 		descricao: anuncio.descricao,
	 		preco: anuncio.preco,
	 		dataInicio: anuncio.dataInicio,
	 		dataFim: anuncio.dataFim
	 	});
	 	return cadastro;
	 }

	 async pesquisarAnuncio(conexao,id){
	 	const anuncio = await conexao.anuncioModel.findById(id);
	 	console.log(anuncio);
	 	return anuncio;
	 }

	 async alterarAnuncio(conexao,id, anuncio){
	 	const novaanuncio = await conexao.anuncioModel.update({
	 		foto: anuncio.foto,
	 		descricao: anuncio.descricao,
	 		preco: anuncio.preco,
	 		dataInicio: anuncio.dataInicio,
	 		dataFim: anuncio.dataFim
	 	},{where: {id : id} });

	}

	async removerAnuncio(conexao,id){
		try{
			const anuncio_removida = await conexao.anuncioModel.destroy(
				{where:{id: id}}
				);
			return anuncio_removida;
		}catch(e){
			console.log(e);
		}
	}

}
module.exports = Anuncio;