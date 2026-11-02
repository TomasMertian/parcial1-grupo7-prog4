import React from 'react';

    interface SelectorCafeProps {
    precioBase: number;
    onAgregar: (seleccion: { variedad: string; tamano: string; cantidad: number }) => void;
    }

    export function SelectorCafe({ precioBase, onAgregar }: SelectorCafeProps) {
    return <div>Selector en construcción</div>;
    }