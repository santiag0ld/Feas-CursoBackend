async function testProductManager() {
  const ProductManager = require("./productManager");

  const productManager = new ProductManager("./products.json");

  await productManager.clearProducts();

  console.log({ products: await productManager.getProducts() });

  await productManager.addProduct(
    "Almendras",
    "Almendras fraccionadas de a 100gr",
    1950,
    "imagen",
    "Sueltos",
    1
  );
  await productManager.addProduct(
    "Yogurt Griego",
    "yogurt griego marca Ygiarto de 250gr",
    2130,
    "imagen",
    "Heladera",
    2
  );

  console.log({ Productos: await productManager.getProducts() });

  try {
    await productManager.addProduct(
      "",
      "Hojas secas de Hibisco fraccionadas de a 50gr",
      2500,
      "imagen",
      "Hierbas",
      3
    );
  } catch (error) {
    console.log({ error: error.message });
  }

  try {
    await productManager.addProduct(
      "Hibiscus",
      "Hojas secas de Hibisco fraccionadas de a 50gr",
      2500,
      "imagen",
      "Hierbas",
      2
    );
  } catch (error) {
    console.log({ error: error.message });
  }

  try {
    await productManager.getProductById(10);
  } catch (error) {
    console.log({ error: error.message });
  }

  console.log({
    "Producto localizado por ID": await productManager.getProductById(1),
  });

  try {
    const updatedProduct = await productManager.updateProduct(
      2,
      "Yogurt Griego",
      "yogurt griego marca Ygiarto de 250gr",
      2250,
      "imagen",
      "Heladera",
      6
    );
    console.log({ updatedProduct });
    console.log({
      "Producto actualizado": await productManager.getProductById(2),
    });
  } catch (error) {
    console.log({ error: error.message });
  }

  try {
    const deletedProduct = await productManager.deleteProduct(1);
    console.log({ deletedProduct });
    console.log({ "Productos restantes": await productManager.getProducts() });
  } catch (error) {
    console.log({ error: error.message });
  }
  await productManager.clearProducts();
}

testProductManager().catch((error) => console.log(error));
