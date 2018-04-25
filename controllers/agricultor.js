class Agricultor  {
    constructor(id) {
        this.id = id;
    }

    async pesquisarAgricultores(conexao){
	 	//Instanciando objeto usuário
	 	//mapeamento recebe o objeto do usuário mapeado. Precisamos aguardar a resposta do select
	 	const mapear = await conexao.agricultorModel.findAll().map(item => { 
	 		const Agricultor = new Agricultor();
	 		const { id } = item;
	 		Agricultor.id = id;
	            //console.log(Agricultor);
	            return Agricultor;
	        });
	 	//Retornando para a api
	 	console.log(mapear);
	 	return mapear;
	 }

	 async CadastrarAgricultor(conexao, agricultor){
	 	//Instanciando objeto empresa
	 	const cadastro = await conexao.agricultorModel.create({
	 		id: agricultor.id,
	 	});
	 	return cadastro;
	 }

	 async pesquisarAgricultor(conexao, id){
	 	const Agricultor = await conexao.agricultorModel.findById(id);
	 	console.log(Agricultor);
	 	return Agricultor;
	 }

	 async alterarAgricultor(conexao, id, Agricultor){
	 	const novaAgricultor = await conexao.agricultorModel.update({
	 		
	 	},{where: { id : id}});

	}

	async removerAgricultor(conexao, id){
		try{
			const Agricultor_removida = await conexao.agricultorModel.destroy(
				{where:{id: id}}
				);
			return Agricultor_removida;
		}catch(e){
			console.log(e);
		}
	}
}
//Deixamos a classe publica
module.exports = Agricultor;
