const { config } = require('dotenv');
if (process.env.NODE_ENV === 'production') config({ path: 'config/.env.prod' });
else config({ path: 'config/.env.dev' });

const Hapi = require('hapi'),//Gerencia Rotas
		//HapiPino = require('hapi-pino'),//Plugin que provê alguns logs
		Joi = require('joi'),//Joi para realizar validação dos requests
		HapiSwagger = require('hapi-swagger'),//HapiSwagger para a documentação
		Inert = require('inert'),//Plugin que provê páginas estáticas. Nesse projeto serve para ver a documentação
		Vision = require('vision'),//Plugin que suporta templates de páginas
		Database = require('../model/database'),//Instância de Banco de dados
	    BD = new Database(),
	    Agricultor = require('../controllers/agricultor'),
	    AgricultorOB = new Agricultor(),
	    Usuario = require('../controllers/usuario'),
	    UsuarioOB = new Usuario(),
	    Funcionario = require('../controllers/funcionario');
	    FuncionarioOB = new Funcionario(),
	    Anuncio = require('../controllers/anuncio'),
	    AnuncioOB = new Anuncio(),
	    Chamado = require('../controllers/chamado'),
	    ChamadoOB = new Chamado(),
	    Consultor = require('../controllers/consultor'),
	    ConsultorOB = new Consultor(),
	    Produto = require('../controllers/produto'),
	    ProdutoOB = new Produto(),
		app = new Hapi.Server({ 
			port: process.env.PORT || 8080 //process.env.PORT 
		});
		var corsHeaders = require('hapi-cors-headers');

class Routes{
 async rotas(){//Utilização de arrow functions
		await BD.conectar(); // estabelecimento de conexão



// Cadastrando Rotas de manipulação de funcionario
app.route(
	[
			//Listar todas as funcionarios
			{
				method: 'GET',
				path: '/funcionario',
				config: {
					cors: {
				            origin: ['*'],
				            additionalHeaders: ['cache-control', 'x-requested-with'],
				            //access-control-request-method: 'GET',
						    //access-control-request-headers: ''
				    },
					description: 'Rota para listar todos funcionarioes',
					notes: 'Retorna todos funcionarioes',
					tags: ['api'],
					validate: {
						/*headers: Joi.object({
							authorization: Joi.string().required()
						}).unknown(),*/
					},
					handler: async (req, reply) => {
						try {
							const funcionario = await FuncionarioOB.pesquisarFuncionarios(BD);
							console.log(funcionario);
							return funcionario;
						} catch (e) {
							console.log('Erro ao listar funcionarioes' + e);
							return 'Ocorreu um erro no processo';
						}
					}
				}
			},
			//Listar um funcionario específico por ID
			{
				method: 'GET',
				path: '/funcionario/{id}',
				config: {
					cors: {
				            origin: ['*'],
				            additionalHeaders: ['cache-control', 'x-requested-with'],
				            //access-control-request-method: 'GET',
						    //access-control-request-headers: ''
				    },
					description: 'Rota para listar o registro de um funcionario específico',
					notes: 'Essa rota retorna os dados de um funcionario pesquisado por ID',
					tags: ['api'],
					validate: {
						/*headers: Joi.object({
							authorization: Joi.string().required()
						}).unknown(),*/
						//Params são os valores recebidos pela url
						params: {
							id: Joi.number().required().description('O ID é um campo obrigatório para realizar a pesquisa')
						}
					},
					handler: async (req, reply) => {
						try{
							const funcionarioPesquisada = await FuncionarioOB.pesquisarFuncionario(BD, req.params.id);  
							console.log(funcionarioPesquisada);
							return funcionarioPesquisada;
						}catch(e){
							return 'Ocorreu um problema ao buscar por funcionario';
						}
					}
				}
			},
			//Cadastro de uma funcionario
			{
				method: 'POST',
				path: '/funcionario',
				config: {
					cors: {
				            origin: ['*'],
				            additionalHeaders: ['cache-control', 'x-requested-with'],
				            //access-control-request-method: 'GET',
						    //access-control-request-headers: ''
				    },
					description: 'Rota para cadastrar novos funcionarios',
					notes: 'Rota que realiza cadastro de um novo funcionario',
					tags: ['api'],
					validate: {
						/*headers: Joi.object({
							authorization: Joi.string().required()
						}).unknown(),*/
						payload: {
							nome: Joi.string()
							.min(3)
							.max(200)
							.required()
							.description('Nome que da usuario'),
							username: Joi.string()
							.min(3)
							.max(200)
							.required()
							.description('Username para login'),
							password: Joi.string()
							.min(3)
							.max(200)
							.required()
							.description('Senha para login'),
							localizacao: Joi.string()
							.min(3)
							.max(200)
							.required()
							.description('Endereço do usuario'),
							telefone: Joi.string()
							.min(3)
							.max(200)
							.required()
							.description('Telefone para contato'),
							celular: Joi.string()
							.min(3)
							.max(200)
							.required()
							.description('Telefone celular para contato'),
							email: Joi.string()
							.min(3)
							.max(200)
							.required()
							.description('Email para contato'),
							foto: Joi.string()
							.min(3)
							.max(200)
							.description('Foto opcional para usuário'),
							RG: Joi.string()
							.min(3)
							.max(10)
							.required()
							.description('RG funcionario'),
							CPF: Joi.string()
							.min(3)
							.max(12)
							.required()
							.description('CPF funcionario'),
							
						}
					},
					handler: async (req, reply) => {
						try {
							//Passando os dados do corpo da requisição para o cadastro						
							const funcionarioCadastrada = await FuncionarioOB.CadastrarFuncionario(BD, req.payload);
							return funcionarioCadastrada;
						} catch (e) {
							console.log('Erro ao cadastrar funcionario' + e);
							return 'Erro no processo';
						}
					}
				}
			},
			//Alterar uma funcionario específica por ID
			{
				method: 'PUT',
				path: '/funcionario/{id}',
				config: {
					cors: {
				            origin: ['*'],
				            additionalHeaders: ['cache-control', 'x-requested-with'],
				            //access-control-request-method: 'GET',
						    //access-control-request-headers: ''
				    },
					description: 'Rota para alterar um funcionario específico por ID',
					notes: 'Esta rota realiza a alteração no funcionario pesquisado',
					tags: ['api'],
					validate: {
						/*headers: Joi.object({
							authorization: Joi.string().required()
						}).unknown(),*/
						params:{
							id:Joi.number().required(),
						},
						payload: {
							nome: Joi.string()
							.min(3)
							.max(100),
							username: Joi.string(),
							password: Joi.string(),
							localizacao: Joi.string(),
							telefone: Joi.string(),
							celular: Joi.string(),
							email: Joi.string(),
							foto: Joi.string(),
							RG: Joi.string().min(3).max(10).required(),
							CPF: Joi.string().min(3).max(12).required(),
						}
					},
					handler: async (req, reply) => {
						try {
							const id = req.params.id;
							const dados = req.payload;
							const funcionarioAlterada = await FuncionarioOB.alterarFuncionario(BD, id, dados);
							//if(empresaAlterada === 1)
							return 'funcionario alterado com sucesso';
						} catch (e) {
							console.log('Erro ao alterar funcionario' + e);
							return 'Ocorreu um erro no processo';
						}
					}
				}
			},
			//Remover um funcionario específico por ID
			{
				method: 'DELETE',
				path: '/funcionario/{id}',
				config: {
					cors: {
				            origin: ['*'],
				            additionalHeaders: ['cache-control', 'x-requested-with'],
				            //access-control-request-method: 'GET',
						    //access-control-request-headers: ''
				    },
					description: 'Rota para remover um funcionario específico por ID',
					notes: 'Remove o registro completo de um funcionario pesquisado',
					tags: ['api'],
					validate: {
						/*headers: Joi.object({
							authorization: Joi.string().required()
						}).unknown(),//Não esquecer o unknown para não dar bad request*/
						params: {
							id: Joi.string().required()
						}
					},
					handler: async (req, reply) => {
						try {
							const funcionarioRemovida = await FuncionarioOB.removerFuncionario(BD, req.params.id);  
							if(funcionarioRemovida === 1)
								return 'funcionario removido com sucesso';
						} catch (e) {
							console.log('Erro em remover funcionario' + e);
							return 'Ocorreu um erro no processo';
						}
					}
				}
			}
			]);		

// Cadastrando Rotas de manipulação de anuncio
app.route(
	[
			//Listar todas as anuncios
			{
				method: 'GET',
				path: '/anuncio',
				config: {
					cors: {
				            origin: ['*'],
				            additionalHeaders: ['cache-control', 'x-requested-with'],
				            //access-control-request-method: 'GET',
						    //access-control-request-headers: ''
				    },
					description: 'Rota para listar todos anuncios',
					notes: 'Retorna todos anuncios cadastrados',
					tags: ['api'],
					validate: {
						/*headers: Joi.object({
							authorization: Joi.string().required()
						}).unknown(),*/
					},
					handler: async (req, reply) => {
						try {
							const anuncio = await AnuncioOB.pesquisarAnuncios(BD);
							console.log(anuncio);
							return anuncio;
						} catch (e) {
							console.log('Erro ao listar anuncio' + e);
							return 'Ocorreu um erro no processo';
						}
					}
				}
			},
			//Listar um anuncio específico por ID
			{
				method: 'GET',
				path: '/anuncio/{id}',
				config: {
					description: 'Rota para listar o registro de um anuncio específico',
					notes: 'Essa rota retorna os dados de um anuncio pesquisado por ID',
					tags: ['api'],
					validate: {
						/*headers: Joi.object({
							authorization: Joi.string().required()
						}).unknown(),*/
						//Params são os valores recebidos pela url
						params: {
							id: Joi.number().required().description('O ID é um campo obrigatório para realizar a pesquisa')
						}
					},
					handler: async (req, reply) => {
						try{
							const anuncioPesquisada = await AnuncioOB.pesquisarAnuncio(BD, req.params.id);  
							console.log(anuncioPesquisada);
							return anuncioPesquisada;
						}catch(e){
							return 'Ocorreu um problema ao buscar por anuncio';
						}
					}
				}
			},
			//Cadastro de uma anuncio
			{
				method: 'POST',
				path: '/anuncio',
				config: {
					cors: {
				            origin: ['*'],
				            additionalHeaders: ['cache-control', 'x-requested-with'],
				            credentials: true
						    //access-control-request-headers: ''
				    },
					description: 'Rota para cadastrar novos anuncios',
					notes: 'Rota que realiza cadastro de um novo anuncio',
					tags: ['api'],
					validate: {
						/*headers: Joi.object({
							authorization: Joi.string().required()
						}).unknown(),*/
						payload: {
							foto: Joi.string()
							.min(3)
							.max(200)
							.description('Nome que da anuncio'),
							descricao: Joi.string()
							.min(3)
							.max(200)
							.required()
							.description('Tipo de anuncio'),
							preco: Joi.string()
							.min(3)
							.max(200)
							.required()
							.description('Duracao de anuncio'),
							dataInicio: Joi.string()
							.min(3)
							.max(200)
							.required()
							.description('Valor minimo de anuncio'),
							dataFim: Joi.string()
							.min(3)
							.max(200)
							.required()
							.description('Valor maximo de anuncio'),
						}
					},
					handler: async (req, reply) => {
						try {
							//Passando os dados do corpo da requisição para o cadastro						
							const anuncioCadastrada = await AnuncioOB.CadastrarAnuncio(BD, req.payload);
							return anuncioCadastrada;
						} catch (e) {
							console.log('Erro ao cadastrar anuncio' + e);
							return 'Erro no processo';
						}
					}
				}
			},
			//Alterar uma anuncio específica por ID
			{
				method: 'PUT',
				path: '/anuncio/{id}',
				config: {
					cors: {
				            origin: ['*'],
				            additionalHeaders: ['cache-control', 'x-requested-with'],
				            //access-control-request-method: 'GET',
						    //access-control-request-headers: ''
				    },					
					description: 'Rota para alterar um anuncio específico por ID',
					notes: 'Esta rota realiza a alteração no anuncio pesquisado',
					tags: ['api'],
					validate: {
						/*headers: Joi.object({
							authorization: Joi.string().required()
						}).unknown(),*/
						params:{
							id:Joi.number().required(),
						},
						payload: {
							nome: Joi.string(),
							foto: Joi.string(),
							descricao: Joi.string(),
							preco: Joi.string(),
							dataInicio: Joi.string(),
							dataFim: Joi.string()
						}
					},
					handler: async (req, reply) => {
						try {
							const id = req.params.id;
							const dados = req.payload;
							const anuncioAlterada = await AnuncioOB.alterarAnuncio(BD, id, dados);
							//if(empresaAlterada === 1)
							return 'anuncio alterado com sucesso';
						} catch (e) {
							console.log('Erro ao alterar anuncio' + e);
							return 'Ocorreu um erro no processo';
						}
					}
				}
			},
			//Remover um anuncio específico por ID
			{
				method: 'DELETE',
				path: '/anuncio/{id}',
				config: {
					cors: {
				            origin: ['*'],
				            additionalHeaders: ['cache-control', 'x-requested-with'],
				            //access-control-request-method: 'GET',
						    //access-control-request-headers: ''
				    },
					description: 'Rota para remover um anuncio específico por ID',
					notes: 'Remove o registro completo de um anuncio pesquisado',
					tags: ['api'],
					validate: {
						/*headers: Joi.object({
							authorization: Joi.string().required()
						}).unknown(),//Não esquecer o unknown para não dar bad request*/
						params: {
							id: Joi.string().required()
						}
					},
					handler: async (req, reply) => {
						try {
							const anuncioRemovida = await AnuncioOB.removerAnuncio(BD, req.params.id);  
							if(anuncioRemovida === 1)
								return 'anuncio removido com sucesso';
						} catch (e) {
							console.log('Erro em remover anuncio' + e);
							return 'Ocorreu um erro no processo';
						}
					}
				}
			}
			]);

// Cadastrando Rotas de manipulação de Agricultor
app.route(
	[
			//Listar todas as Agricultors
			{
				method: 'GET',
				path: '/agricultor',
				config: {
					cors: {
				            origin: ['*'],
				            additionalHeaders: ['cache-control', 'x-requested-with'],
				            //access-control-request-method: 'GET',
						    //access-control-request-headers: ''
				    },
					description: 'Rota para listar todos Agricultores',
					notes: 'Retorna todos Agricultores',
					tags: ['api'],
					validate: {
						/*headers: Joi.object({
							authorization: Joi.string().required()
						}).unknown(),*/
					},
					handler: async (req, reply) => {
						try {
							const Agricultor = await AgricultorOB.pesquisarAgricultores(BD);
							console.log(Agricultor);
							return Agricultor;
						} catch (e) {
							console.log('Erro ao listar Agricultores' + e);
							return 'Ocorreu um erro no processo';
						}
					}
				}
			},
			//Listar um Agricultor específico por ID
			{
				method: 'GET',
				path: '/agricultor/{id}',
				config: {
					cors: {
				            origin: ['*'],
				            additionalHeaders: ['cache-control', 'x-requested-with'],
				            //access-control-request-method: 'GET',
						    //access-control-request-headers: ''
				    },
					description: 'Rota para listar o registro de um Agricultor específico',
					notes: 'Essa rota retorna os dados de um Agricultor pesquisado por ID',
					tags: ['api'],
					validate: {
						/*headers: Joi.object({
							authorization: Joi.string().required()
						}).unknown(),*/
						//Params são os valores recebidos pela url
						params: {
							id: Joi.number().required().description('O ID é um campo obrigatório para realizar a pesquisa')
						}
					},
					handler: async (req, reply) => {
						try{
							const AgricultorPesquisada = await AgricultorOB.pesquisarAgricultor(BD, req.params.id);  
							console.log(AgricultorPesquisada);
							return AgricultorPesquisada;
						}catch(e){
							return 'Ocorreu um problema ao buscar por Agricultor';
						}
					}
				}
			},
			//Cadastro de uma Agricultor
			{
				method: 'POST',
				path: '/agricultor',
				config: {
					cors: {
				            origin: ['*'],
				            additionalHeaders: ['cache-control', 'x-requested-with'],
				            //access-control-request-method: 'GET',
						    //access-control-request-headers: ''
				    },
					description: 'Rota para cadastrar novos Agricultors',
					notes: 'Rota que realiza cadastro de um novo Agricultor',
					tags: ['api'],
					validate: {
						/*headers: Joi.object({
							authorization: Joi.string().required()
						}).unknown(),*/
						payload: {
							
						}
					},
					handler: async (req, reply) => {
						try {
							//Passando os dados do corpo da requisição para o cadastro						
							const AgricultorCadastrada = await AgricultorOB.CadastrarAgricultor(BD, req.payload);
							return AgricultorCadastrada;
						} catch (e) {
							console.log('Erro ao cadastrar Agricultor' + e);
							return 'Erro no processo';
						}
					}
				}
			},
			//Alterar uma Agricultor específica por ID
			{
				method: 'PUT',
				path: '/agricultor/{id}',
				config: {
					cors: {
				            origin: ['*'],
				            additionalHeaders: ['cache-control', 'x-requested-with'],
				            //access-control-request-method: 'GET',
						    //access-control-request-headers: ''
				    },
					description: 'Rota para alterar um Agricultor específico por ID',
					notes: 'Esta rota realiza a alteração no Agricultor pesquisado',
					tags: ['api'],
					validate: {
						/*headers: Joi.object({
							authorization: Joi.string().required()
						}).unknown(),*/
						params:{
							id:Joi.number().required(),
						},
						payload: {
						}
					},
					handler: async (req, reply) => {
						try {
							const id = req.params.id;
							const dados = req.payload;
							const AgricultorAlterada = await AgricultorOB.alterarAgricultor(BD, id, dados);
							//if(empresaAlterada === 1)
							return 'Agricultor alterado com sucesso';
						} catch (e) {
							console.log('Erro ao alterar Agricultor' + e);
							return 'Ocorreu um erro no processo';
						}
					}
				}
			},
			//Remover um Agricultor específico por ID
			{
				method: 'DELETE',
				path: '/agricultor/{id}',
				config: {
					cors: {
				            origin: ['*'],
				            additionalHeaders: ['cache-control', 'x-requested-with'],
				            //access-control-request-method: 'GET',
						    //access-control-request-headers: ''
				    },
					description: 'Rota para remover um Agricultor específico por ID',
					notes: 'Remove o registro completo de um Agricultor pesquisado',
					tags: ['api'],
					validate: {
						/*headers: Joi.object({
							authorization: Joi.string().required()
						}).unknown(),//Não esquecer o unknown para não dar bad request*/
						params: {
							id: Joi.string().required()
						}
					},
					handler: async (req, reply) => {
						try {
							const AgricultorRemovida = await AgricultorOB.removerAgricultor(BD, req.params.id);  
							if(AgricultorRemovida === 1)
								return 'Agricultor removido com sucesso';
						} catch (e) {
							console.log('Erro em remover Agricultor' + e);
							return 'Ocorreu um erro no processo';
						}
					}
				}
			}
			]);

// Cadastrando Rotas de manipulação de chamado
app.route(
	[
			//Listar todas as chamados
			{
				method: 'GET',
				path: '/chamado',
				config: {
					cors: {
				            origin: ['*'],
				            additionalHeaders: ['cache-control', 'x-requested-with'],
				            //access-control-request-method: 'GET',
						    //access-control-request-headers: ''
				    },
					description: 'Rota para listar todos chamados',
					notes: 'Retorna todos chamados',
					tags: ['api'],
					validate: {
						/*headers: Joi.object({
							authorization: Joi.string().required()
						}).unknown(),*/
					},
					handler: async (req, reply) => {
						try {
							const chamado = await ChamadoOB.pesquisarChamados(BD);
							console.log(chamado);
							return chamado;
						} catch (e) {
							console.log('Erro ao listar chamado' + e);
							return 'Ocorreu um erro no processo';
						}
					}
				}
			},
			//Listar um chamado específico por ID
			{
				method: 'GET',
				path: '/chamado/{id}',
				config: {
					cors: {
				            origin: ['*'],
				            additionalHeaders: ['cache-control', 'x-requested-with'],
				            //access-control-request-method: 'GET',
						    //access-control-request-headers: ''
				    },
					description: 'Rota para listar o registro de um chamado específico',
					notes: 'Essa rota retorna os dados de um chamado pesquisado por ID',
					tags: ['api'],
					validate: {
						/*headers: Joi.object({
							authorization: Joi.string().required()
						}).unknown(),*/
						//Params são os valores recebidos pela url
						params: {
							id: Joi.number().required().description('O ID é um campo obrigatório para realizar a pesquisa')
						}
					},
					handler: async (req, reply) => {
						try{
							const chamadoPesquisada = await ChamadoOB.pesquisarChamado(BD, req.params.id);  
							console.log(chamadoPesquisada);
							return chamadoPesquisada;
						}catch(e){
							return 'Ocorreu um problema ao buscar por chamado';
						}
					}
				}
			},
			//Cadastro de uma chamado
			{
				method: 'POST',
				path: '/chamado',
				config: {
					cors: {
				            origin: ['*'],
				            additionalHeaders: ['cache-control', 'x-requested-with'],
				            //access-control-request-method: 'GET',
						    //access-control-request-headers: ''
				    },
					description: 'Rota para cadastrar novos chamados',
					notes: 'Rota que realiza cadastro de um novo chamado',
					tags: ['api'],
					validate: {
						/*headers: Joi.object({
							authorization: Joi.string().required()
						}).unknown(),*/
						payload: {
							titulo: Joi.string()
							.min(3)
							.max(200)
							.required()
							.description('Duracao de chamado'),
							foto: Joi.string()
							.min(3)
							.max(200)
							.description('Nome que da chamado'),
							descricao: Joi.string()
							.min(3)
							.max(200)
							.required()
							.description('Tipo de chamado'),
							dataInicio: Joi.string()
							.min(3)
							.max(200)
							.required()
							.description('Valor minimo de chamado'),
							dataFim: Joi.string()
							.min(3)
							.max(200)
							.required()
							.description('Valor maximo de chamado'),
							status: Joi.string()
							.min(3)
							.max(200)
							.required()
							.description('Duracao de chamado'),
						}
					},
					handler: async (req, reply) => {
						try {
							//Passando os dados do corpo da requisição para o cadastro						
							const chamadoCadastrada = await ChamadoOB.CadastrarChamado(BD, req.payload);
							return chamadoCadastrada;
						} catch (e) {
							console.log('Erro ao cadastrar chamado' + e);
							return 'Erro no processo';
						}
					}
				}
			},
			//Alterar uma chamado específica por ID
			{
				method: 'PUT',
				path: '/chamado/{id}',
				config: {
					cors: {
				            origin: ['*'],
				            additionalHeaders: ['cache-control', 'x-requested-with'],
				            //access-control-request-method: 'GET',
						    //access-control-request-headers: ''
				    },
					description: 'Rota para alterar um chamado específico por ID',
					notes: 'Esta rota realiza a alteração no chamado pesquisado',
					tags: ['api'],
					validate: {
						/*headers: Joi.object({
							authorization: Joi.string().required()
						}).unknown(),*/
						params:{
							id:Joi.number().required(),
						},
						payload: {
							nome: Joi.string()
							.min(3)
							.max(100),
							titulo: Joi.string(),
							foto: Joi.string(),
							descricao: Joi.string(),
							dataInicio: Joi.string(),
							dataFim: Joi.string(),
							status: Joi.string(),
						}
					},
					handler: async (req, reply) => {
						try {
							const id = req.params.id;
							const dados = req.payload;
							const chamadoAlterada = await ChamadoOB.alterarChamado(BD, id, dados);
							//if(empresaAlterada === 1)
							return 'chamado alterado com sucesso';
						} catch (e) {
							console.log('Erro ao alterar chamado' + e);
							return 'Ocorreu um erro no processo';
						}
					}
				}
			},
			//Remover um chamado específico por ID
			{
				method: 'DELETE',
				path: '/chamado/{id}',
				config: {
					cors: {
				            origin: ['*'],
				            additionalHeaders: ['cache-control', 'x-requested-with'],
				            //access-control-request-method: 'GET',
						    //access-control-request-headers: ''
				    },
					description: 'Rota para remover um chamado específico por ID',
					notes: 'Remove o registro completo de um chamado pesquisado',
					tags: ['api'],
					validate: {
						/*headers: Joi.object({
							authorization: Joi.string().required()
						}).unknown(),//Não esquecer o unknown para não dar bad request*/
						params: {
							id: Joi.string().required()
						}
					},
					handler: async (req, reply) => {
						try {
							const chamadoRemovida = await ChamadoOB.removerChamado(BD, req.params.id);  
							if(chamadoRemovida === 1)
								return 'chamado removido com sucesso';
						} catch (e) {
							console.log('Erro em remover chamado' + e);
							return 'Ocorreu um erro no processo';
						}
					}
				}
			}
			]);

// Cadastrando Rotas de manipulação de consultor
app.route(
	[
			//Listar todas as consultors
			{
				method: 'GET',
				path: '/consultor',
				config: {
					cors: {
				            origin: ['*'],
				            additionalHeaders: ['cache-control', 'x-requested-with'],
				            //access-control-request-method: 'GET',
						    //access-control-request-headers: ''
				    },
					description: 'Rota para listar todos consultores',
					notes: 'Retorna todos consultores',
					tags: ['api'],
					validate: {
						/*headers: Joi.object({
							authorization: Joi.string().required()
						}).unknown(),*/
					},
					handler: async (req, reply) => {
						try {
							const consultor = await ConsultorOB.pesquisarConsultores(BD);
							console.log(consultor);
							return consultor;
						} catch (e) {
							console.log('Erro ao listar consultores' + e);
							return 'Ocorreu um erro no processo';
						}
					}
				}
			},
			//Listar um consultor específico por ID
			{
				method: 'GET',
				path: '/consultor/{id}',
				config: {
					cors: {
				            origin: ['*'],
				            additionalHeaders: ['cache-control', 'x-requested-with'],
				            //access-control-request-method: 'GET',
						    //access-control-request-headers: ''
				    },
					description: 'Rota para listar o registro de um consultor específico',
					notes: 'Essa rota retorna os dados de um consultor pesquisado por ID',
					tags: ['api'],
					validate: {
						/*headers: Joi.object({
							authorization: Joi.string().required()
						}).unknown(),*/
						//Params são os valores recebidos pela url
						params: {
							id: Joi.number().required().description('O ID é um campo obrigatório para realizar a pesquisa')
						}
					},
					handler: async (req, reply) => {
						try{
							const consultorPesquisada = await ConsultorOB.pesquisarConsultor(BD, req.params.id);  
							console.log(consultorPesquisada);
							return consultorPesquisada;
						}catch(e){
							return 'Ocorreu um problema ao buscar por consultor';
						}
					}
				}
			},
			//Cadastro de uma consultor
			{
				method: 'POST',
				path: '/consultor',
				config: {
					cors: {
				            origin: ['*'],
				            additionalHeaders: ['cache-control', 'x-requested-with'],
				            //access-control-request-method: 'GET',
						    //access-control-request-headers: ''
				    },
					description: 'Rota para cadastrar novos consultors',
					notes: 'Rota que realiza cadastro de um novo consultor',
					tags: ['api'],
					validate: {
						/*headers: Joi.object({
							authorization: Joi.string().required()
						}).unknown(),*/
						payload: {
							nome: Joi.string()
							.min(3)
							.max(200)
							.required()
							.description('Nome que da usuario'),
							username: Joi.string()
							.min(3)
							.max(200)
							.required()
							.description('Username para login'),
							password: Joi.string()
							.min(3)
							.max(200)
							.required()
							.description('Senha para login'),
							localizacao: Joi.string()
							.min(3)
							.max(200)
							.required()
							.description('Endereço do usuario'),
							telefone: Joi.string()
							.min(3)
							.max(200)
							.required()
							.description('Telefone para contato'),
							celular: Joi.string()
							.min(3)
							.max(200)
							.required()
							.description('Telefone celular para contato'),
							email: Joi.string()
							.min(3)
							.max(200)
							.required()
							.description('Email para contato'),
							foto: Joi.string()
							.min(3)
							.max(200)
							.description('Foto opcional para usuário'),
							RG: Joi.string()
							.min(3)
							.max(10)
							.required()
							.description('Duracao de consultor'),
							CPF: Joi.string()
							.min(3)
							.max(12)
							.required()
							.description('Nome que da consultor'),
							especialidade: Joi.string()
							.min(3)
							.max(10)
							.required()
							.description('Duracao de consultor')					
						}
					},
					handler: async (req, reply) => {
						try {
							//Passando os dados do corpo da requisição para o cadastro						
							const consultorCadastrada = await ConsultorOB.CadastrarConsultor(BD, req.payload);
							return consultorCadastrada;
						} catch (e) {
							console.log('Erro ao cadastrar consultor' + e);
							return 'Erro no processo';
						}
					}
				}
			},
			//Alterar uma consultor específica por ID
			{
				method: 'PUT',
				path: '/consultor/{id}',
				config: {
					cors: {
				            origin: ['*'],
				            additionalHeaders: ['cache-control', 'x-requested-with'],
				            //access-control-request-method: 'GET',
						    //access-control-request-headers: ''
				    },
					description: 'Rota para alterar um consultor específico por ID',
					notes: 'Esta rota realiza a alteração no consultor pesquisado',
					tags: ['api'],
					validate: {
						/*headers: Joi.object({
							authorization: Joi.string().required()
						}).unknown(),*/
						params:{
							id:Joi.number().required(),
						},
						payload: {
							nome: Joi.string()
							.description('Nome que da usuario'),
							username: Joi.string()
							.description('Username para login'),
							password: Joi.string()
							.description('Senha para login'),
							localizacao: Joi.string()
							.description('Endereço do usuario'),
							telefone: Joi.string()
							.description('Telefone para contato'),
							celular: Joi.string()
							.description('Telefone celular para contato'),
							email: Joi.string()
							.description('Email para contato'),
							foto: Joi.string()
							.description('Foto opcional para usuário'),
							RG: Joi.string()
							.description('Duracao de consultor'),
							CPF: Joi.string()
							.description('Nome que da consultor'),
							especialidade: Joi.string()
							.description('Duracao de consultor'),
							
						}
					},
					handler: async (req, reply) => {
						try {
							const id = req.params.id;
							const dados = req.payload;
							const consultorAlterada = await ConsultorOB.alterarConsultor(BD, id, dados);
							//if(empresaAlterada === 1)
							return 'consultor alterado com sucesso';
						} catch (e) {
							console.log('Erro ao alterar consultor' + e);
							return 'Ocorreu um erro no processo';
						}
					}
				}
			},
			//Remover um consultor específico por ID
			{
				method: 'DELETE',
				path: '/consultor/{id}',
				config: {
					cors: {
				            origin: ['*'],
				            additionalHeaders: ['cache-control', 'x-requested-with'],
				            //access-control-request-method: 'GET',
						    //access-control-request-headers: ''
				    },
					description: 'Rota para remover um consultor específico por ID',
					notes: 'Remove o registro completo de um consultor pesquisado',
					tags: ['api'],
					validate: {
						/*headers: Joi.object({
							authorization: Joi.string().required()
						}).unknown(),//Não esquecer o unknown para não dar bad request*/
						params: {
							id: Joi.string().required()
						}
					},
					handler: async (req, reply) => {
						try {
							const consultorRemovida = await ConsultorOB.removerConsultor(BD, req.params.id);  
							if(consultorRemovida === 1)
								return 'consultor removido com sucesso';
						} catch (e) {
							console.log('Erro em remover consultor' + e);
							return 'Ocorreu um erro no processo';
						}
					}
				}
			}
			]);


// Cadastrando Rotas de manipulação de produto
app.route(
	[
			//Listar todas as produtos
			{
				method: 'GET',
				path: '/produto',
				config: {
					cors: {
				            origin: ['*'],
				            additionalHeaders: ['cache-control', 'x-requested-with'],
				            //access-control-request-method: 'GET',
						    //access-control-request-headers: ''
				    },
					description: 'Rota para listar todos produtos',
					notes: 'Retorna todos produtos',
					tags: ['api'],
					validate: {
						/*headers: Joi.object({
							authorization: Joi.string().required()
						}).unknown(),*/
					},
					handler: async (req, reply) => {
						try {
							const produto = await ProdutoOB.pesquisarProdutos(BD);
							console.log(produto);
							return produto;
						} catch (e) {
							console.log('Erro ao listar produto' + e);
							return 'Ocorreu um erro no processo';
						}
					}
				}
			},
			//Listar um produto específico por ID
			{
				method: 'GET',
				path: '/produto/{id}',
				config: {
					cors: {
				            origin: ['*'],
				            additionalHeaders: ['cache-control', 'x-requested-with'],
				            //access-control-request-method: 'GET',
						    //access-control-request-headers: ''
				    },
					description: 'Rota para listar o registro de um produto específico',
					notes: 'Essa rota retorna os dados de um produto pesquisado por ID',
					tags: ['api'],
					validate: {
						/*headers: Joi.object({
							authorization: Joi.string().required()
						}).unknown(),*/
						//Params são os valores recebidos pela url
						params: {
							id: Joi.number().required().description('O ID é um campo obrigatório para realizar a pesquisa')
						}
					},
					handler: async (req, reply) => {
						try{
							const produtoPesquisada = await ProdutoOB.pesquisarProduto(BD, req.params.id);  
							console.log(produtoPesquisada);
							return produtoPesquisada;
						}catch(e){
							return 'Ocorreu um problema ao buscar por produto';
						}
					}
				}
			},
			//Cadastro de uma produto
			{
				method: 'POST',
				path: '/produto',
				config: {
					cors: {
				            origin: ['*'],
				            additionalHeaders: ['cache-control', 'x-requested-with'],
				            //access-control-request-method: 'GET',
						    //access-control-request-headers: ''
				    },
					description: 'Rota para cadastrar novos produtos',
					notes: 'Rota que realiza cadastro de um novo produto',
					tags: ['api'],
					validate: {
						/*headers: Joi.object({
							authorization: Joi.string().required()
						}).unknown(),*/
						payload: {
							nome: Joi.string()
							.min(3)
							.max(200)
							.required()
							.description('Nome que da produto'),
							tipo: Joi.string()
							.min(3)
							.max(200)
							.required()
							.description('Tipo de produto'),
							duracao: Joi.string()
							.min(3)
							.max(200)
							.required()
							.description('Duracao de produto'),
							valorMin: Joi.string()
							.min(3)
							.max(200)
							.required()
							.description('Valor minimo de produto'),
							valorMax: Joi.string()
							.min(3)
							.max(200)
							.required()
							.description('Valor maximo de produto'),
						}
					},
					handler: async (req, reply) => {
						try {
							//Passando os dados do corpo da requisição para o cadastro						
							const produtoCadastrada = await ProdutoOB.CadastrarProduto(BD, req.payload);
							return produtoCadastrada;
						} catch (e) {
							console.log('Erro ao cadastrar produto' + e);
							return 'Erro no processo';
						}
					}
				}
			},
			//Alterar uma produto específica por ID
			{
				method: 'PUT',
				path: '/produto/{id}',
				config: {
					cors: {
				            origin: ['*'],
				            additionalHeaders: ['cache-control', 'x-requested-with'],
				            //access-control-request-method: 'GET',
						    //access-control-request-headers: ''
				    },
					description: 'Rota para alterar um produto específico por ID',
					notes: 'Esta rota realiza a alteração no produto pesquisado',
					tags: ['api'],
					validate: {
						/*headers: Joi.object({
							authorization: Joi.string().required()
						}).unknown(),*/
						params:{
							id:Joi.number().required(),
						},
						payload: {
							nome: Joi.string()
							.min(3)
							.max(100),
							nome: Joi.string(),
							tipo: Joi.string(),
							duracao: Joi.string(),
							valorMin: Joi.string(),
							valorMax: Joi.string(),
						}
					},
					handler: async (req, reply) => {
						try {
							const id = req.params.id;
							const dados = req.payload;
							const produtoAlterada = await ProdutoOB.alterarProduto(BD, id, dados);
							//if(empresaAlterada === 1)
							return 'produto alterado com sucesso';
						} catch (e) {
							console.log('Erro ao alterar produto' + e);
							return 'Ocorreu um erro no processo';
						}
					}
				}
			},
			//Remover um produto específico por ID
			{
				method: 'DELETE',
				path: '/produto/{id}',
				config: {
					cors: {
				            origin: ['*'],
				            additionalHeaders: ['cache-control', 'x-requested-with'],
				            //access-control-request-method: 'GET',
						    //access-control-request-headers: ''
				    },
					description: 'Rota para remover um produto específico por ID',
					notes: 'Remove o registro completo de um produto pesquisado',
					tags: ['api'],
					validate: {
						/*headers: Joi.object({
							authorization: Joi.string().required()
						}).unknown(),//Não esquecer o unknown para não dar bad request*/
						params: {
							id: Joi.string().required()
						}
					},
					handler: async (req, reply) => {
						try {
							const produtoRemovida = await ProdutoOB.removerProduto(BD, req.params.id);  
							if(produtoRemovida === 1)
								return 'produto removido com sucesso';
						} catch (e) {
							console.log('Erro em remover produto' + e);
							return 'Ocorreu um erro no processo';
						}
					}
				}
			}
			]);
// Cadastrando Rotas de manipulação de usuario
app.route(
	[
			//Listar todas as usuarios
			{
				method: 'GET',
				path: '/usuario',
				config: {
					cors: {
				            origin: ['*'],
				            additionalHeaders: ['cache-control', 'x-requested-with'],
				            //access-control-request-method: 'GET',
						    //access-control-request-headers: ''
				    },
					description: 'Rota para listar todas usuarios',
					notes: 'Retorna todas usuarios',
					tags: ['api'],
					validate: {
						/*headers: Joi.object({
							authorization: Joi.string().required()
						}).unknown(),*/
					},
					handler: async (req, reply) => {
						try {
							const usuarios = await UsuarioOB.pesquisarUsuarios(BD);
							console.log(usuarios);
							return usuarios;
						} catch (e) {
							console.log('Erro ao listar usuarios' + e);
							return 'Ocorreu um erro no processo';
						}
					}
				}
			},
			//Listar um usuário específico por ID
			{
				method: 'GET',
				path: '/usuario/{id}',
				config: {
					cors: {
				            origin: ['*'],
				            additionalHeaders: ['cache-control', 'x-requested-with'],
				            //access-control-request-method: 'GET',
						    //access-control-request-headers: ''
				    },
					description: 'Rota para listar o registro de um usuário específico',
					notes: 'Essa rota retorna os dados de um usuário pesquisado por ID',
					tags: ['api'],
					validate: {
						/*headers: Joi.object({
							authorization: Joi.string().required()
						}).unknown(),*/
						//Params são os valores recebidos pela url
						params: {
							id: Joi.number().required().description('O ID é um campo obrigatório para realizar a pesquisa')
						}
					},
					handler: async (req, reply) => {
						try{
							const usuarioPesquisada = await UsuarioOB.pesquisarUsuario(BD, req.params.id);  
							console.log(usuarioPesquisada);
							return usuarioPesquisada;
						}catch(e){
							return 'Ocorreu um problema ao buscar por usuário';
						}
					}
				}
			},
			//Cadastro de uma usuario
			{
				method: 'POST',
				path: '/usuario',
				config: {
					cors: {
				            origin: ['*'],
				            additionalHeaders: ['cache-control', 'x-requested-with'],
				            //access-control-request-method: 'GET',
						    //access-control-request-headers: ''
				    },
					description: 'Rota para cadastrar novos usuarios',
					notes: 'Rota que realiza cadastro de um novo usuario',
					tags: ['api'],
					validate: {
						/*headers: Joi.object({
							authorization: Joi.string().required()
						}).unknown(),*/
						payload: {
							nome: Joi.string()
							.min(3)
							.max(200)
							.required()
							.description('Nome que da usuario'),
							username: Joi.string()
							.min(3)
							.max(200)
							.required()
							.description('Username para login'),
							password: Joi.string()
							.min(3)
							.max(200)
							.required()
							.description('Senha para login'),
							localizacao: Joi.string()
							.min(3)
							.max(200)
							.required()
							.description('Endereço do usuario'),
							telefone: Joi.string()
							.min(3)
							.max(200)
							.required()
							.description('Telefone para contato'),
							celular: Joi.string()
							.min(3)
							.max(200)
							.required()
							.description('Telefone celular para contato'),
							email: Joi.string()
							.min(3)
							.max(200)
							.required()
							.description('Email para contato'),
							foto: Joi.string()
							.min(3)
							.max(200)
							.description('Foto opcional para usuário'),
						}
					},
					handler: async (req, reply) => {
						try {
							//Passando os dados do corpo da requisição para o cadastro						
							const usuarioCadastrada = await UsuarioOB.CadastrarUsuario(BD, req.payload);
							return usuarioCadastrada;
						} catch (e) {
							console.log('Erro ao cadastrar usuario' + e);
							return 'Erro no processo';
						}
					}
				}
			},
			//Alterar uma usuario específica por ID
			{
				method: 'PUT',
				path: '/usuario/{id}',
				config: {
					cors: {
				            origin: ['*'],
				            additionalHeaders: ['cache-control', 'x-requested-with'],
				            //access-control-request-method: 'GET',
						    //access-control-request-headers: ''
				    },
					description: 'Rota para alterar um usuario específico por ID',
					notes: 'Esta rota realiza a alteração no usuario pesquisado',
					tags: ['api'],
					validate: {
						/*headers: Joi.object({
							authorization: Joi.string().required()
						}).unknown(),*/
						params:{
							id:Joi.number().required(),
						},
						payload: {
							nome: Joi.string()
							.min(3)
							.max(100),
							username: Joi.string(),
							password: Joi.string(),
							localizacao: Joi.string(),
							telefone: Joi.string(),
							celular: Joi.string(),
							email: Joi.string(),
							foto: Joi.string(),
						}
					},
					handler: async (req, reply) => {
						try {
							const id = req.params.id;
							const dados = req.payload;
							const usuarioAlterada = await UsuarioOB.alterarUsuario(BD, id, dados);
							//if(empresaAlterada === 1)
							return 'usuario alterado com sucesso';
						} catch (e) {
							console.log('Erro ao alterar usuario' + e);
							return 'Ocorreu um erro no processo';
						}
					}
				}
			},
			//Remover um usuário específico por ID
			{
				method: 'DELETE',
				path: '/usuario/{id}',
				config: {
					cors: {
				            origin: ['*'],
				            additionalHeaders: ['cache-control', 'x-requested-with'],
				            //access-control-request-method: 'GET',
						    //access-control-request-headers: ''
				    },
					description: 'Rota para remover um usuario específico por ID',
					notes: 'Remove o registro completo de um usuario pesquisado',
					tags: ['api'],
					validate: {
						/*headers: Joi.object({
							authorization: Joi.string().required()
						}).unknown(),//Não esquecer o unknown para não dar bad request*/
						params: {
							id: Joi.string().required()
						}
					},
					handler: async (req, reply) => {
						try {
							const usuarioRemovida = await UsuarioOB.removerUsuario(BD, req.params.id);  
							if(usuarioRemovida === 1)
								return 'usuario removido com sucesso';
						} catch (e) {
							console.log('Erro em remover usuario' + e);
							return 'Ocorreu um erro no processo';
						}
					}
				}
			}
			]);		
	}

    //Função que inicia servidor
	async init(){
		try {
			await app.register(
				[
					Inert,
					Vision,
					{
						plugin: HapiSwagger,
						options: { info: { title: 'AMIGO CAT', description: 'AMIGO CAT', version: '1.0' } }
					}
				]).then(this.rotas);

			await app.start();
			console.log(`Servidor rodando na porta : ${app.info.port}`);

			app.ext('onPreResponse', corsHeaders);
		    //gambi para pegar o host certo no heroku
			    app.ext('onRequest', async (request, h) => {
			      request.headers['x-forwarded-host'] = (request.headers['x-forwarded-host'] || request.info.host);
			      return h.continue;
			    });


		}
		catch (e) {
			console.log('Erro com servidor' + e);
			return 'Erro com servidor';
		}
	}

}

module.exports = Routes;
