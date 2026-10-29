export function obtenerMesaDeUrl(queryString: string): number | null {
        const params = new URLSearchParams(queryString);
    const mesaParam = params.get('mesa');

    // si no existe el parametro ?mesa, devuelve null (retiro en barra)
    if (!mesaParam) {
        return null;
    }

    const numeroMesa = Number(mesaParam);

    // si el valor no es un numero o es 0 o negativo, devuelve null
    if (Number.isNaN(numeroMesa) || numeroMesa <= 0) {
        return null;
    }

    // si paso todas las validaciones, devuelve el numero de mesa
    return numeroMesa;
}