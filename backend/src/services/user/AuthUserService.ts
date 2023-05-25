
import prismaClient from "../../prisma";
import {compare} from 'bcryptjs';
import {sign} from 'jsonwebtoken'



interface AuthRequest{
    email: string;
    password: string;
}

class AuthUserService{
    async execute({email, password}:AuthRequest){
        //Verificar se o email existe
        const user = await prismaClient.user.findFirst({
            where:{
                email: email
            }
        })

        if(!user){
            throw new Error("Usuario e ou senha incorreta")
        }

        //Verificar se a senha que ele enviou esta correta
        // metodo COMPARE que compara se a senha passada no login é a mesma cadastrada no banco de dados
        //metodo compare vem do pacote bcryptjs e compara a senha criptografada.
        //seus parametros são a senha passada no login e o valor que está no banco
        const passwordMatch = await compare(password,user.password);

        if(!passwordMatch){
            throw new Error("Usuario e ou senha incorreta")
        }

        //Se deu tudo certo gerar um token pro usuario
        //Gerar un token JWT  e devolver os dados do usuario
        //como id, nome, email

        const token = sign(
            {
                name: user.name,
                email: user.email,
            },
            process.env.JWT_SECRET,
            {
              subject: user.id,//
              expiresIn: '30d' // token expira em 30 dias
            }
        )

        
        

        return{
            id: user.id,
            name: user.name,
            email: user.email,
            token: token
        }
    }
}

export {AuthUserService}