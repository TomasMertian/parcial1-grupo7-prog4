import React, { useEffect, useState } from 'react';
import { obtenerProductos } from '../services/productos';
import type { Menu as MenuType } from '../api/contratos';
    type EstadoMenu =
    | { estado: 'cargando' }
    | { estado: 'error'; mensaje: string }
    | { estado: 'listo'; productos: MenuType };

    export function Menu() {
    const [estado, setEstado] = useState<EstadoMenu>({ estado: 'cargando' });

    const cargarMenu = async () => {
        setEstado({ estado: 'cargando' });
        try {
        const data = await obtenerProductos();
        setEstado({ estado: 'listo', productos: data });
        } catch (error) {
        setEstado({
            estado: 'error',
            mensaje: error instanceof Error ? error.message : 'Error al cargar el menú',
        });
        }
    };

    useEffect(() => {
        cargarMenu();
    }, []);

    if (estado.estado === 'cargando') {
        return <div>Cargando menú...</div>;
    }

    if (estado.estado === 'error') {
        return (
        <div>
            <p>{estado.mensaje}</p>
            {/* El test busca especificamente un boton que diga "reintentar" */}
            <button onClick={cargarMenu}>Reintentar</button>
        </div>
        );
    }

    return (
        <div>
        <h2>Menú del Café</h2>
        <ul>
            {estado.productos.map((producto) => (
            <li key={producto.id}>
                {producto.nombre} - ${producto.precio}
            </li>
            ))}
        </ul>
        </div>
    );
}