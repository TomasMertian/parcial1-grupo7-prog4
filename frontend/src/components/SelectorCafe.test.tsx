import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { SelectorCafe } from './SelectorCafe.tsx';
import React from 'react';

    describe('Componente SelectorCafe (3 pasos)', () => {
    it('debe permitir seleccionar variedad, tamaño y confirmar la cantidad', () => {
        const onAgregarMock = vi.fn();

        render(<SelectorCafe precioBase={2500} onAgregar={onAgregarMock} />);

        // paso 1
        expect(screen.getByText(/paso 1: elige la variedad/i)).toBeInTheDocument();
        fireEvent.click(screen.getByRole('button', { name: /colombia/i }));

        // paso 2
        expect(screen.getByText(/paso 2: elige el tamaño/i)).toBeInTheDocument();
        fireEvent.click(screen.getByRole('button', { name: /mediano/i }));

        // paso 3
        expect(screen.getByText(/paso 3: confirmar/i)).toBeInTheDocument();
        fireEvent.click(screen.getByRole('button', { name: /agregar al pedido/i }));

        // verifica que se mande al carrito exactamente lo que eligio
        expect(onAgregarMock).toHaveBeenCalledWith({
        variedad: 'Colombia',
        tamano: 'Mediano',
        cantidad: 1,
        });
    });
    });