class Consultor  {
    constructor( id, RG, CPF, especialidade ) {
        this.id = id;
        this.RG = RG;
        this.CPF = CPF;
        this.especialidade = especialidade;
    }

    async pesquisarConsultores(conexao){
	 	//Instanciando objeto usuário
	 	//mapeamento recebe o objeto do usuário mapeado. Precisamos aguardar a resposta do select
	 	const mapear = await conexao.consultorModel.findAll().map(item => { 
	 		const consultor = new Consultor();
	 		const { id, RG, CPF, especialidade } = item;
	 		consultor.id = id;
	 		consultor.RG = RG;
	 		consultor.CPF = CPF;
	 		consultor.especialidade = especialidade;
	            //console.log(consultor);
	            return consultor;
	        });
	 	//Retornando para a api
	 	console.log(mapear);
	 	return mapear;
	 }

	 async CadastrarConsultor(conexao, consultor){
	 	//Instanciando objeto empresa
	 	const cadastro = await conexao.consultorModel.create({
	 		id: consultor.id,
	 		RG: consultor.RG,
	 		CPF: consultor.CPF,
	 		especialidade: consultor.especialidade
	 	});
	 	return cadastro;
	 }

	 async pesquisarConsultor(conexao, id){
	 	const consultor = await conexao.consultorModel.findById(id);
	 	console.log(consultor);
	 	return consultor;
	 }

	 async alterarConsultor(conexao, id, consultor){
	 	const novaconsultor = await conexao.consultorModel.update({
	 		RG: consultor.RG,
	 		CPF: consultor.CPF,
	 		especialidade: consultor.especialidade
	 	},{where:{id : id}});

	}

	async removerConsultor(id){
		try{
			const consultor_removida = await conexao.consultorModel.destroy(
				{where:{id: id}}
				);
			return consultor_removida;
		}catch(e){
			console.log(e);
		}
	}
}
//Deixamos a classe publica
module.exports = Consultor;
