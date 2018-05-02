class Consultor  {
    constructor( id, nome, username, password, localizacao, telefone, celular, email, foto, RG, CPF, especialidade ) {
        this.id = id;
        this.nome = nome;
        this.username = username;
        this.password = password;
        this.localizacao = localizacao;
        this.telefone = telefone;
        this.celular = celular;
        this.email = email;
        this.foto = foto;
        this.RG = RG;
        this.CPF = CPF;
        this.especialidade = especialidade;
    }

    async pesquisarConsultores(conexao){
	 	//Instanciando objeto usuário
	 	//mapeamento recebe o objeto do usuário mapeado. Precisamos aguardar a resposta do select
	 	const mapear = await conexao.consultorModel.findAll().map(item => { 
	 		const consultor = new Consultor();
	 		const { id, nome, username, password, localizacao, telefone, celular, email, foto, RG, CPF, especialidade } = item;
	 		consultor.id = id;
	 		//consultor.id = id;
	 		consultor.nome = nome;
	 		consultor.username = username;
	 		consultor.password = password;
	 		consultor.localizacao = localizacao;
	 		consultor.telefone = telefone;
	 		consultor.celular = celular;
	 		consultor.email = email;
	 		consultor.foto = foto;
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
	 		nome: consultor.nome,
	 		username: consultor.username,
	 		password: consultor.password,
	 	    localizacao: consultor.localizacao, 
	 		telefone: consultor.telefone,
	 		celular: consultor.celular, 
	 		email: consultor.email, 
	 		foto: consultor.foto,
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
	 		nome: consultor.nome,
	 		username: consultor.username,
	 		password: consultor.password,
	 	    localizacao: consultor.localizacao, 
	 		telefone: consultor.telefone,
	 		celular: consultor.celular, 
	 		email: consultor.email, 
	 		foto: consultor.foto,
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
