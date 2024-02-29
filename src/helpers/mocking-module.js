export function generateMockProducts(count) {
    const products = [];
    for (let i = 0; i < count; i++) {
      const product = {
        title: `Producto ${i + 1}`,
        description: `Descripcion ${i + 1}`,
        code: `CODE-${i + 1}`,
        price: Math.floor(Math.random() * 100) + 1,
        stock: Math.floor(Math.random() * 100) + 1,
        status: Math.random() > 0.5 ? 'active' : 'inactive',
        category: 'categoria',
        thumbnail: `https://example.com/thumbnails/product${i + 1}.jpg`,
      };
      products.push(product);
    }
    return products;
  }