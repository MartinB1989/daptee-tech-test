/**
 * Función genérica para filtrar elementos por un término de búsqueda
 * 
 * @param items - Array de elementos a filtrar
 * @param searchTerm - Término de búsqueda
 * @param fields - Campos por los que filtrar (pueden ser anidados usando notación de punto)
 * @returns Array filtrado
 * 
 * @example
 * // Buscar productos que contengan "phone" en su título
 * const productosEncontrados = filterItemsBySearchTerm(
 *   productos,
 *   "phone",
 *   ["title"]
 * );
 * 
 * @example
 * // Buscar usuarios que contengan "mar" en su nombre o email
 * const usuariosEncontrados = filterItemsBySearchTerm(
 *   usuarios,
 *   "mar",
 *   ["username", "email", "name.firstname", "name.lastname"]
 * );
 */
export function filterItemsBySearchTerm<T>(
  items: T[],
  searchTerm: string,
  fields: string[]
): T[] {
  if (!searchTerm) {
    return items;
  }

  const normalizedSearchTerm = searchTerm.toLowerCase();
  
  return items.filter(item => {
    return fields.some(field => {
      // Manejar campos anidados (por ejemplo 'name.firstname')
      const value = getNestedProperty(item, field);
      
      if (typeof value === 'string') {
        return value.toLowerCase().includes(normalizedSearchTerm);
      }
      
      if (typeof value === 'number') {
        return value.toString().includes(normalizedSearchTerm);
      }
      
      return false;
    });
  });
}

/**
 * Función auxiliar para obtener una propiedad anidada de un objeto
 * 
 * @param obj - Objeto del que extraer la propiedad
 * @param path - Ruta a la propiedad (usando notación de punto)
 * @returns Valor de la propiedad
 * 
 * @example
 * // Obtener el nombre de un usuario
 * const firstname = getNestedProperty(user, "name.firstname");
 * 
 * @example
 * // Obtener una propiedad anidada profunda
 * const ciudad = getNestedProperty(
 *   usuario,
 *   "address.location.city"
 * );
 * 
 * @example
 * // En caso de propiedad no existente, devuelve undefined
 * const valorInexistente = getNestedProperty(objeto, "ruta.inexistente");
 * // valorInexistente === undefined
 */
function getNestedProperty<T, R>(obj: T, path: string): R | undefined {
  return path.split('.').reduce((prev, curr) => {
    return prev && (prev as Record<string, unknown>)[curr] !== undefined 
      ? (prev as Record<string, unknown>)[curr] 
      : undefined;
  }, obj as unknown) as R | undefined;
} 