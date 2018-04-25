class Chamado  {
    constructor( id, titulo, foto, descricao, dataInicio, dataFim, status ) {
        this.id = id;
        this.titulo = titulo;
        this.foto = foto;
        this.descricao = descricao;
        this.dataInicio = dataInicio;
        this.dataFim = dataFim;
        this.status = status;
    }
   	async pesquisarChamados(conexao){
	 	//Instanciando objeto usuário
	 	//mapeamento recebe o objeto do usuário mapeado. Precisamos aguardar a resposta do select
	 	const mapear = await conexao.chamadoModel.findAll().map(item => { 
	 		const chamado = new Chamado();
	 		const { id, titulo, foto, descricao, dataInicio, dataFim, status } = item;
	 		chamado.id = id;
	 		chamado.titulo = titulo;
	 		chamado.foto = foto;
	 		chamado.descricao = descricao;
	 		chamado.dataInicio = dataInicio;
	 		chamado.dataFim = dataFim;
	            //console.log(chamado);
	            return chamado;
	        });
	 	//Retornando para a api
	 	console.log(mapear);
	 	return mapear;
	 }

	 async CadastrarChamado(conexao, chamado){
	 	//Instanciando objeto empresa
	 	const cadastro = await conexao.chamadoModel.create({
	 		id: chamado.id,
	 		titulo: chamado.titulo,
	 		foto: chamado.foto,
	 		descricao: chamado.descricao,
	 		dataInicio: chamado.dataInicio,
	 		dataFim: chamado.dataFim,
	 		status: chamado.status
	 	});
	 	return cadastro;
	 }

	 async pesquisarChamado(conexao, id){
	 	const chamado = await conexao.chamadoModel.findById(id);
	 	console.log(chamado);
	 	return chamado;
	 }

	 async alterarChamado(conexao, id, chamado){
	 	const novachamado = await conexao.chamadoModel.update({
	 		titulo: chamado.titulo,
	 		foto: chamado.foto,
	 		descricao: chamado.descricao,
	 		titulo: chamado.titulo,
	 		dataInicio: chamado.dataInicio,
	 		dataFim: chamado.dataFim,
	 		status: chamado.status
	 	},{where: {id : id}});

	}

	async removerChamado(conexao, id){
		try{
			const chamado_removida = await conexao.chamadoModel.destroy(
				{where:{id: id}}
				);
			return chamado_removida;
		}catch(e){
			console.log(e);
		}
	} 
}
//Deixamos a classe publica
module.exports = Chamado;


