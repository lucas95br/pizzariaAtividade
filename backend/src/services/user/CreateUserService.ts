
import prismaClient from "../../prisma";
import  {hash} from 'bcryptjs'

interface UserRequest{
    name: string;
    email: string;
    password: string;
}

class CreateUserService{
    async execute({name, email, password}:UserRequest){
    
    //Verificar se ele enviou um email
    if(!email){
        throw new Error("Email incorreto")
    }

    //Verificar se esse email ja está cadastrado na plataforma
    const userAlreadyExists = await prismaClient.user.findFirst({
        where:{
            email: email
        }
    })

    if(userAlreadyExists){
       throw new Error("Usuario Existente")
    }

    //CRIPTOGRAFANDO A SENHA utilizando a feature bcrypt.js
    //utilizando a função hash que recebe como parametro a senha e o tipo de criptografia no caso 8
    const passwordHash = await hash(password,8)

    //cadastrando usuario no banco de dados
    const user = await prismaClient.user.create({
        data:{
            name: name,
            email: email,
            password: passwordHash,// passando a senha criptografada pro banco
        },

        select:{
            id: true,
            name: true,
            email: true,

        }
    })

    return user;
    }
}

export { CreateUserService}


