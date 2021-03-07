const querystring = require("querystring");
const { httpRequest } = require("../utils/httpRequest");

const getProducts = async (req, res) => {
  try {
    const { query } = req;
    const returnResponse = {
      author: { name: "Daniel", lastname: "Rubio" },
      items: [],
      categories: [],
    };
    const options = {
      hostname: "api.mercadolibre.com",
      port: 443,
      path: "/sites/MLA/search?",
      method: "GET",
    }; 

    if (Object.keys(query).length > 0) {
      options.path = "/sites/MLA/search?" + querystring.stringify(query) + "&limit=4";
    }

    const { results } = await httpRequest(options); 

    //get items to return
    const items = results.map((item) => ({
      id: item.id,
      title: item.title,
      price: {
        currency: item.currency_id,
        amount: item.price,
        decimals: 0,
      },
      picture: item.thumbnail,
      condition: item.condition,
      free_shipping: item.shipping.free_shipping,
    }));
    
    // repeating category count
    const categories = results.reduce((acc, item) => {
      if (!(item.category_id in acc)) {
        acc[item.category_id] = 0;
        return acc;
      }
      acc[item.category_id]++;
      return acc;
    }, {});

    const max = Math.max(...Object.values(categories)); 
    const categoryMostFrecuently = Object.entries(categories).filter(item => item[1] == max).map(element => element[0])[0]; 
    
    returnResponse.items = items;
    
    // endpoint categories
    options.path = "/categories/" + categoryMostFrecuently;
    const responseCategories = await httpRequest(options); 
    returnResponse.categories = responseCategories.path_from_root;

    return res.status(200).json(returnResponse);
  } catch (e) {
    return res.status(404).json({ error: e });
  }
};

const getProductsById = async (req, res) => {
  try {
    const { params } = req;
    const returnResponse = {
      author: { name: "Daniel", lastname: "Rubio" },
      item: {},
      categories: [],
    };
    const options = {
      hostname: "api.mercadolibre.com",
      port: 443,
      path: "/items/" + params.id,
      method: "GET",
    }; 

    const response = await httpRequest(options); 
    const category = response.category_id;
  
    returnResponse.item = {
      id: response.id,
      title: response.title,
      price: {
        currency: response.currency_id,
        amount: response.price,
        decimals: 0,
      },
      picture: response.pictures[0].url,
      condition: response.condition,
      free_shipping: response.shipping.free_shipping,
      sold_quantity: response.sold_quantity,
    };

    options.path = "/items/" + params.id + "/description";
    const responseDescription = await httpRequest(options);
    returnResponse.item.description = responseDescription.plain_text;
    
    options.path = "/categories/" + category;
    const responseCategories = await httpRequest(options);
    returnResponse.categories = responseCategories.path_from_root;
 
    return res.status(200).json(returnResponse);
  } catch (e) {
    return res.status(404).json({ error: e });
  }
};

module.exports = { getProducts, getProductsById };
