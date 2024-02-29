import Handlebars from "handlebars";

const generateHtml = (detail, products) => {
  const finalquantity = products.reduce((acc, ele) => acc + ele.quantity, 0);
  const finalamount = products.reduce((acc, ele) => acc + ele.amount, 0);

  const template = Handlebars.compile(`
      <h1>Orden de Compra: {{detail.code}}</h1>
      <div>
        <p>Nombre: {{detail.firstName}}</p>
        <p>Email: {{detail.purchaser}}</p>
        <p>Fecha y hora: {{detail.purchase_datetime}}</p>
      </div>
      <ul>
        {{#each products}}
          <li>
            {{title}} - Precio: $ {{unitprice}} x {{quantity}} - Total: $ {{amount}}
          </li>
        {{/each}}
      </ul>
      <div>
        <h2 class="strong">Artículos: {{finalquantity}}</h2>
        <h2 class="strong">Monto total: $ {{finalamount}}</h2>
      </div>
    `);

  const html = template({ detail, products, finalquantity, finalamount });

  return html;
};

export default generateHtml;
