const express = require('express');
const app = express();
const https = require('https');
const querystring = require('querystring'); 
var cors = require('cors');
 
app.listen(8000, () => {
    console.log('Server started!')
});

app.use(cors({origin: 'http://localhost:4200'}));


 
function httpRequest(options){
    return new Promise ((resolve, reject) => {  
        let req = https.request(options, (res) => {  
            let body = [];

            res.on('data', (d) => {
                body.push(d);
            }).on('end', () => {
                try {
                    body = Buffer.concat(body).toString();
                } catch(e) {
                    reject(e);
                }

                resolve(JSON.parse(body));
            });
        });
        
        req.on('error', (e) => { 
            reject(e);
        }); 

        req.end();  
    }) 
} 

app.get('/api/items', async (req, res, next)  => { 
    let params = req.query;
    let return_response = {
        "author": { "name": "Daniel", "lastname": "Rubio"},
        "items" : [],
        "categories" : []
    };
    let options = { 
        hostname: 'api.mercadolibre.com',
        port: 443,
        path: '/sites/MLA/search?',
        method: 'GET', 
    };

    if(Object.keys(params).length > 0){
        options.path = '/sites/MLA/search?' + querystring.stringify(params) + '&limit=4';
    }
      

    await httpRequest(options).then(response => {
        let items = []; 
        let categories = [];
        let category_most_frecuently = '';
        
        if('results' in response){ 

            response.results.map((item) => { 

                let new_item = {
                    "id":  item.id,
                    "title": item.title,
                    "price": {
                        "currency": item.currency_id,
                        "amount": item.price,
                        "decimals": 0
                    },
                    "picture": item.thumbnail,
                    "condition": item.condition,
                    "free_shipping": item.shipping.free_shipping 
                }  

                items.push(new_item); 

                if(item.category_id in categories){
                    categories[item.category_id] ++
                } else {
                    categories[item.category_id] = 0
                }   
            });
            
            return_response.items = items;
            categories.sort();
            category_most_frecuently = Object.keys(categories)[0];
            options.path = '/categories/'+category_most_frecuently;
        } 

    }).catch(error => console.error(error));
 
    await httpRequest(options).then(response => {
        categories = [];
        response.path_from_root.map((category) => { 
            categories.push(category.name);
        }) 

        return_response.categories = categories; 

    }).catch(error => console.error(error));  
 
    res.json(return_response);

}); 
 

app.get("/api/items/:id", async (req, res, next) => {
    let params = req.params; 
    let category = "";
    let return_response = {
        "author": { "name": "Daniel", "lastname": "Rubio"},
        "item" : {},
        "categories" : []
    }  
    let options = { 
        hostname: 'api.mercadolibre.com',
        port: 443,
        path: '/items/'+params.id,
        method: 'GET', 
    };  

    await httpRequest(options).then( response => { 
        category = response.category_id;
        return_response.item = {
            "id":  response.id,
            "title": response.title,
            "price": {
                "currency": response.currency_id,
                "amount": response.price,
                "decimals": 0
            },
            "picture": response.pictures[0].url,
            "condition": response.condition,
            "free_shipping": response.shipping.free_shipping,
            "sold_quantity": response.sold_quantity
        } 
    }).catch(error => console.error(error)); 

    options.path = '/items/' + params.id + '/description';  
    await httpRequest(options).then( response => {
        return_response.item.description = response.plain_text; 
    }).catch(error => console.error(error)); 

    options.path = '/items/' + category + '/description'; 
    await httpRequest(options).then( response => { 
        return_response.categories = response.path_from_root;  
    }).catch(error => console.error(error)); 

    res.json(return_response); 
}) 

 