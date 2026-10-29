import { z } from 'zod';

export const ProductoSchema = z.discriminatedUnion("tipo", [
    z.object({
        tipo: z.literal("expreso"),
        id: z.string(),
        nombre: z.string(),
        precioBase: z.number(),
        precio: z.number(),
        variedad: z.enum(["Brasil", "Colombia", "Etiopia"]),
        tamano: z.enum(["Pocillo", "Mediano", "Taza grande"]),
    }),
    z.object({
        tipo: z.literal("filtrado"),
        id: z.string(),
        nombre: z.string(),
        precioBase: z.number(),
        precio: z.number(),
        variedad: z.enum(["Brasil", "Colombia", "Etiopia"]),
        tamano: z.enum(["Pocillo", "Mediano", "Taza grande"]),
    }),
    z.object({
        tipo: z.literal("pasteleria"),
        id: z.string(),
        nombre: z.string(),
        precioBase: z.number(),
        precio: z.number(),
    })
    ]);

export const MenuSchema = z.array(ProductoSchema);

export type Producto = z.infer<typeof ProductoSchema>;
export type Menu = z.infer<typeof MenuSchema>;