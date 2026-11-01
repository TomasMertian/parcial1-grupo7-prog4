import { http, HttpResponse } from 'msw';

export const productosMock = [
    {
        id: "exp-med-col",
        variedad: "Colombia",
        tamano: "Mediano",
        nombre: "Café expreso Mediano Colombia",
        precioBase: 2500,
        precio: 7360,
        tipo: "expreso"
    },
    {
        id: "fil-poc-bra",
        nombre: "Café Filtrado Brasil - Pocillo",
        variedad: "Brasil",
        tamano: "Pocillo",
        precioBase: 3200,
        precio: 4040,
        tipo: "filtrado"
    },
    {
        id: "pas-muffin",
        nombre: "Muffin de chocolate",
        precioBase: 2500,
        precio: 2500,
        tipo: "pasteleria"
    }
    ];

    export const handlers = [
    http.get('*/productos', () => {
        return HttpResponse.json(productosMock);
    }),
    ];