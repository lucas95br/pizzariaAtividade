import express, {Request, Response, NextFunction} from 'express';
import {router} from './routes';
import 'express-async-errors';
import cors from 'cors';
import path from 'path'

const app  = express(); // nosso express

// tipo de dado que o app vai usar JSON
app.use(express.json());

//Hapilita que qualquer url ou  ip use essa API
app.use(cors());

//Usando componente CRIADO EM ROUTES  para roteamento das rotas
app.use(router);

app.use(
    '/files',
    express.static(path.resolve(__dirname,'..','tmp'))
)
//Tratando erros de rotas, nem eu sei direito que esse metodo faz
app.use((err: Error, req: Request, res: Response, next: NextFunction)=>{
    if(err instanceof Error){
       // Se for uma instancia do tipo error
       return res.status(400).json({
        error: err.message
       })
    }

    return res.status(500).json({
        status: 'error',
        message: 'Internal server error.'
    })
})

// inicializa o projeto e da um calback na porta 3333
app.listen(3333,()=> console.log("Seeeervidor online"));
