// Contrato que comparten todos los productos de la cafetería: define qué debe
// saber hacer cualquiera de ellos y delega la implementación en cada clase
// (Pastelería, Café expreso y Café filtrado).
// Conviene no modificar la firma, ya que la usan todas las implementaciones.
export interface Producto {
  id: string;
  nombre: string;
  precioBase: number;
  calcularPrecio(): number;
}
