import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { http, HttpResponse } from 'msw';
import { server } from '../mocks/server';
import { Menu } from './Menu';
import React from 'react';

describe('Componente Menu', () => {
    it('debe mostrar el indicador de carga al iniciar', () => {
        render(<Menu />);
        expect(screen.getByText(/cargando menú/i)).toBeInTheDocument();
    });

    it('debe renderizar los productos cuando la API responde correctamente', async () => {
        render(<Menu />);
        // findbytext espera hasta que el elemento aparezca
        expect(await screen.findByText(/Café expreso Mediano Colombia/i)).toBeInTheDocument();
    });

    it('debe mostrar mensaje de error y boton de reintentar si la API falla', async () => {
        // fuerza a que msw devuelva un error 500 para este test en particular
        server.use(
        http.get('*/productos', () => {
            return HttpResponse.json({ error: 'Fallo interno del servidor' }, { status: 500 });
        })
        );

        render(<Menu />);
        
        // verifica que aparezca el mensaje de la api y el boton por su rol (accesibilidad)
        expect(await screen.findByText(/Fallo interno del servidor/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /reintentar/i })).toBeInTheDocument();
    });
});