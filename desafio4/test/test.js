async function testProductManager() {
  const ProductManager = require("../src/managers/productManager");

  const productManager = new ProductManager("./test/testProducts.json");

  await productManager.clearProducts();

  console.log({ products: await productManager.getProducts() });

  await productManager.addProduct(
    "Almendras",
    "Almendras fraccionadas de a 100gr",
    1950,
    "imagen",
    "ALM",
    1,
    true,
    "Sueltos"
  );

  await productManager.addProduct(
    "Yogurt Griego",
    "Yogurt Griego marca Ygiarto de 250gr",
    2130,
    "imagen",
    "YOG",
    2,
    true,
    "Heladera"
  );

  console.log({ productsAfterInsert: await productManager.getProducts() });

  try {
    await productManager.addProduct("");
  } catch (error) {
    console.log({ error: error.message });
  }

  try {
    await productManager.addProduct(
      "Hojas de Hibisco",
      "Hojas secas de Hibisco fraccionadas de a 50gr",
      2500,
      "imagen",
      "HIB",
      3,
      false,
      "Hierbas"
    );
  } catch (error) {
    console.log({ error: error.message });
  }

  try {
    await productManager.getProductById(10);
  } catch (error) {
    console.log({ error: error.message });
  }

  console.log({ specificProduct: await productManager.getProductById(1) });

  try {
    const updatedProduct = await productManager.updateProduct(
      1,
      "Cafe colombiano en granos",
      "Café en Granos de Colombia marca Café Molido de 250gr",
      2000,
      "imagen",
      "CAF",
      5,
      false,
      "Infusiones"
    );
    console.log({ updatedProduct });
    console.log({ updatedProduct: await productManager.getProductById(1) });
  } catch (error) {
    console.log({ error: error.message });
  }

  try {
    const deletedProduct = await productManager.deleteProduct(1);
    console.log({ deletedProduct });
    console.log({ productsAfterDelete: await productManager.getProducts() });
  } catch (error) {
    console.log({ error: error.message });
  }
  await productManager.clearProducts();
}

testProductManager()
  .then(() => console.log("Done"))
  .catch((error) => console.log(error));
