import type { PedidoRecord } from '../models/tipos.js';
import type { PedidoRepository } from '../repositories/PedidoRepository.js';

export class PedidosConsultaService {
    constructor(private readonly pedidosRepo: PedidoRepository) {}

    listar(): PedidoRecord[] {
        return this.pedidosRepo.findAll();
    }

    obtener(id: string): PedidoRecord | undefined {
        return this.pedidosRepo.findById(id);
    }
}