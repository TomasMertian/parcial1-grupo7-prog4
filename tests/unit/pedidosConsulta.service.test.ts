import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { existsSync, unlinkSync } from 'fs';
import { PedidosConsultaService } from '../../src/services/pedidosConsulta.service.js';
import { PedidosService } from '../../src/services/pedidos.service.js';
import { JsonPedidoRepository } from '../../src/repositories/PedidoRepository.js';

// archivo JSON temporal 
const testFilePath = './tests/unit/test-pedidos-consulta.json';

// mock del repo de productos 
const mockProductoRepo = {
    findAll: () => [],
    findById: (id: string) => undefined,
    create: () => { throw new Error('No implementado'); }
} as any;

describe('Servicio - PedidosConsulta', () => {
    let repoPedidos: JsonPedidoRepository;
    let servicioCreacion: PedidosService;
    let servicioConsulta: PedidosConsultaService;

    beforeEach(() => {
    // "limpio" el archivo de prueba para que cada test empiece con un estado limpio
    if (existsSync(testFilePath)) unlinkSync(testFilePath);
    
    // instancie el repositorio apuntando al archivo temporal
    repoPedidos = new JsonPedidoRepository(testFilePath);
    
    // instancie los servicios con el repositorio
    servicioCreacion = new PedidosService(repoPedidos, mockProductoRepo);
    servicioConsulta = new PedidosConsultaService(repoPedidos);
});

afterEach(() => {
    // "limpio" el archivo de prueba despues de cada test
    if (existsSync(testFilePath)) unlinkSync(testFilePath);
});

it('deberia listar todos los pedidos guardados', () => {
    // uso el servicio de creacion para agregar algunos pedidos
    servicioCreacion.crear({ mesaId: 10, items: [] });
    servicioCreacion.crear({ mesaId: 12, items: [] });

    // pruebo mi funcion:
    const resultado = servicioConsulta.listar();
    
    expect(resultado).toHaveLength(2);
    expect(resultado[0].mesaId).toBe(10);
    expect(resultado[1].mesaId).toBe(12);
});

it('deberia obtener un pedido especifico por su ID', () => {
    // creo uno y guardo la respuesta para saber que ID se genero
    const pedidoCreado = servicioCreacion.crear({ mesaId: 5, items: [] });
    
    // pruebo mi funcion
    const resultado = servicioConsulta.obtener(pedidoCreado.id);
    
    expect(resultado).not.toBeUndefined();
    expect(resultado?.id).toBe(pedidoCreado.id);
    expect(resultado?.mesaId).toBe(5);
});

it('deberia devolver undefined si se busca un ID que no existe', () => {
    const resultado = servicioConsulta.obtener('id-falso-123');
    expect(resultado).toBeUndefined();
    });
}); 