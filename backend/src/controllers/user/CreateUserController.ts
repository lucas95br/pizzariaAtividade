//Controler vai receber diretamente as requisições
// Vai pegar os parametros das requisições e chamar
//Os serviços repassando os dados necessarios

import{Request, Response, response} from 'express'
import { CreateUserService } from '../../services/user/CreateUserService'

class CreateUserController{
    async handle(req: Request, res: Response){
        const {name, email, password } = req.body
       
        const createUserService = new CreateUserService();
        const user = await createUserService.execute({
            name,
            email,
            password
        })
        
        return res.json({user})
    }

}

export { CreateUserController}