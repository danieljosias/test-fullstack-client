import AppDataSource from "../../data-source";
import Client from "../../entities/clients.entity";
import { IClientRequest } from "../../interfaces/clients";

export const updateClientsService = async (id:string,{fullname,email,cellphone,mobile,createdAt}:IClientRequest) => {
	const clientsRepository = AppDataSource.getRepository(Client);
	const clients = await clientsRepository.find();

    let isClient = clients.find(client => client.id === id)

    if(!isClient){
        throw new Error('Client not found')
    }
    

    const client = new Client()
    client.fullname = fullname? fullname : isClient.fullname
    client.email = email? email : isClient.email
    client.cellphone = cellphone? cellphone : isClient.cellphone
    client.mobile = mobile? mobile : isClient.mobile
    client.createdAt = createdAt? createdAt : isClient.createdAt

    await clientsRepository.update(isClient!.id, client)
    const clientUpdate = await clientsRepository.findOneBy({id})

	return clientUpdate
};