
import prismaClient from "../../prisma";

interface ProductRquest{
    category_id: string;
}
class ListByCategoryService{
    async execute({category_id}: ProductRquest){
        //Listando categorias por id

        const findByCartegory = await prismaClient.product.findMany({
            where:{
                category_id: category_id
            }
        })
            return findByCartegory;
    }
}

export{ ListByCategoryService}

