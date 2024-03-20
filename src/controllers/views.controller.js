import { configObject } from "../config/config.js";
import { ProductMongo } from "../daos/mongo/products.daoMongo.js";
import fetch from "node-fetch";

const productsService = new ProductMongo();

class ViewsController {
  constructor() {}

  login = (req, res) => {
    try {
      if (req.user) return res.redirect('/');
      res.render('index', { title: "Home" });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }

  register = (req, res) => {
    try {
      if (req.user) return res.redirect('/products');
      res.render("register", { title: "Nuevo Registro" });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }

  products = async (req, res) => {
    try {
      const {
        page = 1,
        sort,
        category: initialCategory,
        availability = true,
      } = req.query;
      const category = initialCategory === "all" ? null : initialCategory;
      const apiUrl = new URL(`http://localhost:${configObject.port}/api/products`);
      apiUrl.searchParams.set("page", page);
      apiUrl.searchParams.set("limit", "5");
      if (sort) apiUrl.searchParams.set("sort", sort);
      if (category) apiUrl.searchParams.set("category", category);
      if (availability) apiUrl.searchParams.set("availability", availability);
  
      const data = await (await fetch(apiUrl)).json();
  
      if (
        data.error ||
        Number(page) > Number(data.data.totalPages) ||
        Number(page) < 0
      ) {
        return res.status(500).send({ message: "Error fetching product data" });
      }

      const product = data.data.docs.map((prd) => ({
        ...prd,
        price: prd.price.toLocaleString("es-ES", { style: "decimal" }),
        unavailability: prd.stock === 0,
        link: `/products/${prd._id}`,
      }));
  
      const filterUrl = (filter) => {
        const params = new URLSearchParams(req.url.split("?")[1] || "");
        params.delete(filter);
        params.delete("page");
        return `/products?${params}`;
      };
  
      res.render("products", { title: "Productos", product, category: await productsService.getCategorys(), pageControl: {
          page: data.data.page,
          totalPages: data.data.totalPages,
          hasPrevPage: data.data.hasPrevPage,
          hasNextPage: data.data.hasNextPage,
          prevLink: filterUrl("page") + data.data.prevLink,
          nextLink: filterUrl("page") + data.data.nextLink,
          ascend: filterUrl("sort") + "&sort=asc",
          descend: filterUrl("sort") + "&sort=desc",
          disorderly: filterUrl("sort") + "&sort=disorderly",
          availability: filterUrl("availability") + "&availability=false",
          unavailability: filterUrl("availability") + "&availability=true",
          url: filterUrl("category"),
        },
      });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }

  productById = async (req, res) => {
    try {
      const { pid } = req.params;
      const apiUrl = `http://localhost:${configObject.port}/api/products/${pid}`;
  
      const resp = await (await fetch(apiUrl)).json();
      const { isError, data } = resp
  
      res.render("product","Producto",
        {
          control: {
            productError: isError,
          },
          arrays: {
            product: data,
          },
        }
      );
  
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }

  cart = async (req, res) => {
    try {
    const cart = req.user.userCart;

    let resp = await fetch(`http://localhost:${configObject.port}/api/carts/${cart}`);
    const products = (await resp.json()).data.products;

    products.forEach( product => product.total = product.product.price * product.quantity );
  
    const objectRender = {
      cartError: false,
      cartId: cart,
      cartNoEmpty: products.length !== 0,
      products: products.length !== 0 ? products : undefined
    };
    res.render('cart', { title: 'Carrito', ...objectRender });
  } catch (error) {
    res.status(500).send('Hubo un problema al cargar el carrito', error);
  }
  };

  realTimeProducts = async (req, res) => {
    try {
      const apiUrl = `http://localhost:${configObject.port}/api/products?limit=100`;
      const resp = (await (await fetch(apiUrl)).json()).data.docs;
      const product = resp.map((prd) => ({
        ...prd,
        price: prd.price.toLocaleString('es-ES', { style: 'decimal' }),
      }));
  
      res.render('realTimeProducts', { title: 'Productos en tiempo Real', product });
    } catch (error) {
      res.status(500).send('Hubo un problema al cargar los productos', error);
    }
  }

  chat = async (req, res) => res.render('chat', { title: 'Chat' });

  user = async (req, res) => {
    try {
      res.render('user', { title: 'Usuario' });
    } catch (error) {
      res.status(500).send({ message: error.message });
    } 
  }
}
export default ViewsController;
