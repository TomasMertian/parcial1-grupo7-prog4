import { describe, it, expect } from 'vitest';
import { obtenerMesaDeUrl } from './mesa';

describe('obtenerMesaDeUrl', () => {
    it('debe devolver el numero de mesa si hay un parametro ?mesa=N valido', () => {
        expect(obtenerMesaDeUrl('?mesa=4')).toBe(4);
        expect(obtenerMesaDeUrl('?mesa=12')).toBe(12);
    });

    it('debe devolver null (retiro en barra) si no hay parametro ?mesa', () => {
        expect(obtenerMesaDeUrl('')).toBeNull();
        expect(obtenerMesaDeUrl('?otro=valor')).toBeNull();
    });

    it('debe devolver null si el parametro ?mesa es invalido', () => {
        expect(obtenerMesaDeUrl('?mesa=invalido')).toBeNull();
        expect(obtenerMesaDeUrl('?mesa=-5')).toBeNull();
        expect(obtenerMesaDeUrl('?mesa=0')).toBeNull();
    });
    });