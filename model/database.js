
const Sequelize = require('sequelize');

class Database {
	
	constructor(){
		this.sequelize = {}; // DEFININDO SequelizeETO GLOBAL DE CONEXÃO QUE PODERÁ SER UTILIZADO POR QUALQUER FUNÇÃO INTERNA A CLASSE
		this.agricultorModel = {}; //DEFININDO MEU OBJETO DE Agricultor	
		this.anuncioModel = {}; //DEFININDO MEU OBJETO DE anuncio
		this.chamadoModel = {}; //DEFININDO MEU OBJETO DE chamado
		this.consultorModel = {}; //DEFININDO MEU OBJETO DE consultor
		this.produtoModel = {}; //DEFININDO MEU OBJETO DE produto
		this.usuarioModel = {}; //DEFININDO MEU OBJETO DE usuario
		this.funcionarioModel = {}; //DEFININDO MEU OBJETO DE funcionario
 	}

	async conectar(){
		const conn_uri = process.env.DATABASE || 'postgres://mlasqjzdzynuxx:4958ae1cec611095b7b74cb3662fe0f795f5ab87570c53cc4894e51eecc920ea@ec2-23-23-222-184.compute-1.amazonaws.com:5432/d3ohiueut8bvbm';
		//const conn = conn_uri;//process.env.DATABASE_URL ||
		try{
			this.sequelize = new Sequelize(
		            conn_uri,
		            {
		                dialect: 'postgres',
		                dialectOptions: {
		                    ssl: true,
		                    requestTimeout: 30000, // timeout = 30 seconds
		                },
		            },
		        )
			console.log('Conexão estabelecida com sucesso');
		}
		catch(e){
			console.log('Conexão falhou');
			console.log(e);
		}
		//CRIANDO MEU MODELO DE BD NO SEQUELIZE 
		await this.gerar();
	}
	async gerar() {
		//Montando uma tabela
		this.agricultorModel = this.sequelize.define('AGRICULTOR', {
		id: { 
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true 
			},	 
		},
		{
			freezeTableName: true,
			tableName: 'AGRICULTOR'
		});
		

		//Montando uma tabela
		this.produtoModel = this.sequelize.define('PRODUTO', {
			id: { 
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true 
			},
			nome: { type: Sequelize.STRING},
		  	tipo: { type: Sequelize.STRING }, 
		  	duracao: { type: Sequelize.STRING },
		  	valorMin: { type: Sequelize.STRING },
		  	valorMax: { type: Sequelize.STRING },
		  	},
		{
			freezeTableName: true,
			tableName: 'PRODUTO'
		});
		

		//Montando uma tabela
		this.chamadoModel = this.sequelize.define('CHAMADO', {
			id: { 
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true 
			},
			titulo: { type: Sequelize.STRING },
			foto: { type: Sequelize.STRING},
		  	descricao: { type: Sequelize.STRING }, 
		  	dataInicio: { type: Sequelize.STRING },
		  	dataFim: { type: Sequelize.STRING },
		  	status: { type: Sequelize.STRING },
		  	},
		{
			freezeTableName: true,
			tableName: 'CHAMADO'
		});


		//Montando uma tabela
		this.consultorModel = this.sequelize.define('CONSULTOR', {
			id: { 
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true 
			},
			nome: { type: Sequelize.STRING },
			username: { type: Sequelize.STRING },
			password: { type: Sequelize.STRING },
			localizacao: { type: Sequelize.STRING },
			telefone: { type: Sequelize.STRING },
			celular: { type: Sequelize.STRING },
			email: { type: Sequelize.STRING },
			foto: { type: Sequelize.STRING },
			RG: { type: Sequelize.STRING },
			CPF: { type: Sequelize.STRING},
		  	especialidade: { type: Sequelize.STRING }, 
		  	},
		{
			freezeTableName: true,
			tableName: 'CONSULTOR'
		});

		//Montando uma tabela
		this.funcionarioModel = this.sequelize.define('FUNCIONARIO', {
			id: { 
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true 
			},
			nome: { type: Sequelize.STRING },
			username: { type: Sequelize.STRING },
			password: { type: Sequelize.STRING },
			localizacao: { type: Sequelize.STRING },
			telefone: { type: Sequelize.STRING },
			celular: { type: Sequelize.STRING },
			email: { type: Sequelize.STRING },
			foto: { type: Sequelize.STRING },
			RG: { type: Sequelize.STRING },
			CPF: { type: Sequelize.STRING},
		},
		{
			freezeTableName: true,
			tableName: 'FUNCIONARIO'
		});


		//Montando uma tabela
		this.anuncioModel = this.sequelize.define('ANUNCIO', {
			id: { 
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true 
			},
			foto: { type: Sequelize.STRING},
		  	descricao: { type: Sequelize.STRING }, 
		  	preco: { type: Sequelize.STRING },
		  	dataInicio: { type: Sequelize.STRING },
		  	dataFim: { type: Sequelize.STRING },
		  	},
		{
			freezeTableName: true,
			tableName: 'ANUNCIO'
		});

		this.usuarioModel = this.sequelize.define('USUARIO', {
			id: { 
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true 
			},
			nome: { type: Sequelize.STRING},
		  	username: { type: Sequelize.STRING }, 
		  	password: { type: Sequelize.STRING },
		  	localizacao: { type: Sequelize.STRING },
		  	telefone: { type: Sequelize.STRING },
		  	celular: { type: Sequelize.STRING },
		  	email: { type: Sequelize.STRING },
		  	foto: { type: Sequelize.STRING },
		  	},
		{
			freezeTableName: true,
			tableName: 'USUARIO'
		});


		await this.usuarioModel.sync({force: false}).then(() => {});		
		await this.anuncioModel.sync({force: false}).then(() => {});
		await this.consultorModel.sync({force: false}).then(() => {});
		await this.chamadoModel.sync({force: false}).then(() => {});
		await this.produtoModel.sync({force: false}).then(() => {});
		await this.agricultorModel.sync({force: false}).then(() => {});
		await this.funcionarioModel.sync({force: true}).then(() => {});
	}
}

module.exports = Database;