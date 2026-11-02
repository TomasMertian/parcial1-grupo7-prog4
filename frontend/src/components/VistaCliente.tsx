import { useEffect, useState } from 'react';
import { Menu } from './Menu';
import { SelectorCafe } from './SelectorCafe';
import { obtenerMesaDeUrl } from '../utils/mesa';

    export function VistaCliente() {
    const [mesa, setMesa] = useState<number | null>(null);

    useEffect(() => {
        // simula la lectura del qr capturando la mesa de la url
        const numeroMesa = obtenerMesaDeUrl(window.location.search);
        setMesa(numeroMesa);
    }, []);

    const manejarAgregarCafe = (seleccion: { variedad: string; tamano: string; cantidad: number }) => {
        // usa un alert para probar que el componente envia bien los datos al carrito
        alert(`¡Agregado! ${seleccion.cantidad}x Café ${seleccion.variedad} (${seleccion.tamano})`);
    };

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', fontFamily: 'sans-serif' }}>
        <h1> Bienvenido a la Cafetería</h1>
        
        {mesa ? (
            <h3 style={{ color: 'green' }}> Estás en la Mesa {mesa}</h3>
        ) : (
            <h3 style={{ color: 'red' }}> Por favor, escaneá el QR de tu mesa</h3>
        )}
        
        <hr />
        
        <Menu />
        
        <hr />
        
        <h2>Armá tu pedido</h2>
        {/* Le pasa un precio base de prueba para ver el funcionamiento */}
        <SelectorCafe precioBase={3500} onAgregar={manejarAgregarCafe} />
        </div>
    );
    }