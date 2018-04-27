class Funcionario  {
    constructor( id, nome, username, password, localizacao, telefone, celular, email, foto, RG, CPF ) {
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
    }

        async pesquisarFuncionarios(conexao){
        //Instanciando objeto usuário
        //mapeamento recebe o objeto do usuário mapeado. Precisamos aguardar a resposta do select
        const mapear = await conexao.funcionarioModel.findAll().map(item => { 
            const funcionario = new Funcionario();
            const { id, nome, username, password, localizacao, telefone, celular, email, foto, RG, CPF } = item;
            funcionario.id = id;
            funcionario.nome = nome;
            funcionario.username = username;
            funcionario.password = password;
            funcionario.localizacao = localizacao;
            funcionario.telefone = telefone;
            funcionario.celular = celular;
            funcionario.email = email;
            funcionario.foto = foto;
            funcionario.RG = RG;
            funcionario.CPF = CPF;
                //console.log(funcionario);
                return funcionario;
            });
        //Retornando para a api
        console.log(mapear);
        return mapear;
     }

     async CadastrarFuncionario(conexao, funcionario){
        //Instanciando objeto empresa
        const cadastro = await conexao.funcionarioModel.create({
            id: funcionario.id,
            nome: funcionario.nome,
            username: funcionario.username,
            password: funcionario.password,
            localizacao: funcionario.localizacao, 
            telefone: funcionario.telefone,
            celular: funcionario.celular, 
            email: funcionario.email, 
            foto: funcionario.foto,
            RG: funcionario.RG,
            CPF: funcionario.CPF
        });
        return cadastro;
     }

     async pesquisarFuncionario(conexao, id){
        const funcionario = await conexao.funcionarioModel.findById(id);
        console.log(funcionario);
        return funcionario;
     }

     async alterarFuncionario(conexao, id, funcionario){
        const novafuncionario = await conexao.funcionarioModel.update({
            nome: funcionario.nome,
            username: funcionario.username,
            password: funcionario.password,
            localizacao: funcionario.localizacao, 
            telefone: funcionario.telefone,
            celular: funcionario.celular, 
            email: funcionario.email, 
            foto: funcionario.foto,
            RG: funcionario.RG,
            CPF: funcionario.CPF
        },{where: {id : id}});

     }

     async removerFuncionario(conexao, id){
        try{
            const funcionario_removida = await conexao.funcionarioModel.destroy(
                {where:{id: id}}
                );
            return funcionario_removida;
        }catch(e){
            console.log(e);
        }
     }
}
//Deixamos a classe publica
module.exports = Funcionario;

