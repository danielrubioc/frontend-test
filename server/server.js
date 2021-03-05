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
    try {
        const {query} = req;
        const return_response = {
            "author": { "name": "Daniel", "lastname": "Rubio"},
            "items" : [],
            "categories" : []
        };
        const options = { 
            hostname: 'api.mercadolibre.com',
            port: 443,
            path: '/sites/MLA/search?',
            method: 'GET', 
        }; 
        let items = [], 
        categories = [], 
        category_most_frecuently = '';

        if(Object.keys(query).length > 0){
            options.path = '/sites/MLA/search?' + querystring.stringify(query) + '&limit=4';
        }

        const {results} = await httpRequest(options).then(response => response).catch(error => console.error(error));
        results.map(item => {
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
            item.category_id in categories ? categories[item.category_id] ++ : categories[item.category_id] = 0; 
        });

        return_response.items = items; 
        category_most_frecuently = Object.keys(categories.sort())[0];
        options.path = '/categories/'+category_most_frecuently; 
        
        const { path_from_root } = await httpRequest(options).then(response => response).catch(error => console.error(error));
        return_response.categories = path_from_root;   
    
        res.json(return_response);

    } catch (e) {
        next(e) 
    } 
}); 
 

app.get("/api/items/:id", async (req, res, next) => {
    try {
        const {params} = req;  
        const return_response = {
            "author": { "name": "Daniel", "lastname": "Rubio"},
            "item" : {},
            "categories" : []
        };
        const options = { 
            hostname: 'api.mercadolibre.com',
            port: 443,
            path: '/items/'+params.id,
            method: 'GET', 
        };  
        let category = "";
         
        const response = await httpRequest(options).then(response => response).catch(err => console.log(err)); 
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

        options.path = '/items/' + params.id + '/description';  
        const {plain_text} = await httpRequest(options).then(response => response).catch(error => console.error(error));
        return_response.item.description = plain_text;   
        options.path = '/categories/' + category; 

        const {path_from_root} = await httpRequest(options).then(response => response).catch(error => console.error(error)); 
        return_response.categories = path_from_root;  

        res.json(return_response);  
    
    } catch (e) {
        next(e);
    }
}) 

 

