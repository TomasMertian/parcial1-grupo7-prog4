    import { useState } from 'react';

    interface SelectorCafeProps {
    nombre: string;
    descripcion?: string;
    precioBase: number;
    onAgregar: (seleccion: { variedad: string; tamano: string; cantidad: number }) => void;
    onCancelar: () => void; 
}

    export function SelectorCafe({ nombre, descripcion, precioBase, onAgregar, onCancelar }: SelectorCafeProps) {
    const [paso, setPaso] = useState<1 | 2 | 3>(1);
    const [variedad, setVariedad] = useState<string>('');
    const [tamano, setTamano] = useState<string>('');
    const [cantidad, setCantidad] = useState<number>(1);

    const seleccionarVariedad = (v: string) => {
        setVariedad(v);
        setPaso(2);
    };

    const seleccionarTamano = (t: string) => {
        setTamano(t);
        setPaso(3);
    };

    const manejarAgregar = () => {
        onAgregar({
        variedad,
        tamano,
        cantidad,
        });
    };

    return (
        <div className="selector-cafe" style={{ textAlign: 'left' }}>
        <div className="detalle-producto" style={{ marginBottom: '20px', paddingBottom: '10px', borderBottom: '1px solid #ccc' }}>
        <h3>Bebida: {nombre}</h3>
        {descripcion && <p>Descripción: {descripcion}</p>}
        <p>Precio base: ${precioBase}</p>
        </div>

        {paso === 1 && (
            <div>
            <h3>Paso 1: Elige la variedad</h3>
            <div className="opciones">
                <button onClick={() => seleccionarVariedad('Brasil')}>Brasil</button>
                <button onClick={() => seleccionarVariedad('Colombia')}>Colombia</button>
                <button onClick={() => seleccionarVariedad('Etiopia')}>Etiopia</button>
            </div>
            </div>
        )}

        {paso === 2 && (
            <div>
            <h3>Paso 2: Elige el tamaño</h3>
            <div className="opciones">
                <button onClick={() => seleccionarTamano('Pocillo')}>Pocillo</button>
                <button onClick={() => seleccionarTamano('Mediano')}>Mediano</button>
                <button onClick={() => seleccionarTamano('Taza grande')}>Taza grande</button>
            </div>
            <button style={{ marginTop: '10px' }} onClick={() => setPaso(1)}>← Volver a variedad</button>
            </div>
        )}

        {paso === 3 && (
        <div>
            <h4>Paso 3: Confirmar</h4>
            <p>Resumen: Café {variedad} ({tamano})</p>
            <p style={{ fontWeight: 'bold' }}>Precio total: ${precioBase * cantidad}</p>
            
            <div className="control-cantidad" style={{ margin: '15px 0' }}>
                <label htmlFor="cantidad">Cantidad: </label>
                <button 
                type="button"
                onClick={() => setCantidad((prev) => Math.max(1, prev - 1))}
                disabled={cantidad <= 1}
                >
                -
                </button>
                <span style={{ margin: '0 10px' }}>{cantidad}</span>
                <button type="button" onClick={() => setCantidad((prev) => prev + 1)}>+</button>
            </div>
            
            <button onClick={manejarAgregar} style={{ backgroundColor: 'green', color: 'white', padding: '10px', border: 'none', cursor: 'pointer' }}>
                Agregar al pedido
            </button>
            <div style={{ marginTop: '10px' }}>
                <button onClick={() => setPaso(2)}>← Volver a tamaño</button>
            </div>
            </div>
        )}

        {/* Botón cancelar movido adentro del componente */}
        <div style={{ marginTop: '20px', borderTop: '1px solid #ccc', paddingTop: '10px' }}>
            <button onClick={onCancelar} style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer' }}>Cancelar</button>
        </div>

    </div>
);
}