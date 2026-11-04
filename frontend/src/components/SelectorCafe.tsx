    import { useState } from 'react';

    interface SelectorCafeProps {
    precioBase: number;
    onAgregar: (seleccion: { variedad: string; tamano: string; cantidad: number }) => void;
    }

    export function SelectorCafe({ precioBase, onAgregar }: SelectorCafeProps) {
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
        <div className="selector-cafe">
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
            <button onClick={() => setPaso(1)}>← Volver a variedad</button>
            </div>
        )}

        {paso === 3 && (
            <div>
            <h3>Paso 3: Confirmar</h3>
            <p>Resumen: Café {variedad} ({tamano})</p>
            <p>Precio total: ${precioBase * cantidad}</p>
            <div className="control-cantidad d-flex align-items-center gap-2">
                <span className="mb-0">Cantidad:</span>
                <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                aria-label="Restar cantidad"
                onClick={() => setCantidad((prev) => Math.max(1, prev - 1))}
                disabled={cantidad <= 1}
                >
                -
                </button>
                <span id="cantidad" aria-live="polite">{cantidad}</span>
                <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                aria-label="Sumar cantidad"
                onClick={() => setCantidad((prev) => prev + 1)}
                >
                +
                </button>
            </div>
            <button onClick={manejarAgregar}>Agregar al pedido</button>
            <div>
                <button onClick={() => setPaso(2)}>← Volver a tamaño</button>
            </div>
            </div>
        )}
        </div>
    );
    }