class Usuario {
    constructor(id, nome, username, password, localizacao, telefone, celular, email, foto) {
    	this.id = id;
    	this.nome = nome;
        this.username = username;
        this.password = password;
        this.localizacao = localizacao;
        this.telefone = telefone;
        this.celular = celular;
        this.email = email;
        this.foto = foto;
    }

   async pesquisarUsuarios(conexao){
        //Instanciando objeto usuário
        //mapeamento recebe o objeto do usuário mapeado. Precisamos aguardar a resposta do select
        const mapear = await conexao.usuarioModel.findAll().map(item => { 
            const usuario = new Usuario();
            const { id, nome, username, password, localizacao, telefone, celular, email, foto } = item;
            usuario.id = id;
            usuario.nome = nome;
            usuario.username = username;
            usuario.password = password;
            usuario.localizacao = localizacao;
            usuario.telefone = telefone;
            usuario.celular = celular;
            usuario.email = email;
            usuario.foto = foto;
                //console.log(usuario);
                return usuario;
            });
        //Retornando para a api
        console.log(mapear);
        return mapear;
     }

     async CadastrarUsuario(conexao, usuario){
        //Instanciando objeto empresa
        const cadastro = await conexao.usuarioModel.create({
            id: usuario.id,
            nome: usuario.nome,
            username: usuario.username,
            password: usuario.password,
            localizacao: usuario.localizacao,
            telefone: usuario.telefone,
            celular: usuario.celular,
            email: usuario.email,
            foto: usuario.foto
        });
        return cadastro;
     }

     async pesquisarUsuario(conexao, id){
        const usuario = await conexao.usuarioModel.findById(id);
        console.log(usuario);
        return usuario;
     }

     async alterarUsuario(conexao, id, usuario){
        const novausuario = await conexao.usuarioModel.update({
            nome: usuario.nome,
            username: usuario.username,
            password: usuario.password,
            localizacao: usuario.localizacao,
            telefone: usuario.telefone,
            celular: usuario.celular,
            email: usuario.email,
            foto: usuario.foto
        },{where: { id: id}});

    }

    async removerUsuario(conexao, id){
        try{
            const usuario_removida = await conexao.usuarioModel.destroy(
                {where:{id: id}}
                );
            return usuario_removida;
        }catch(e){
            console.log(e);
        }
    } 
}
//Deixamos a classe publica
module.exports = Usuario;

