const express = require('express');
const app = express();
const https = require('https');
var cors = require('cors');

app.listen(8000, () => {
    console.log('Server started!')
}) 
app.use(cors({origin: 'http://localhost:4200'}));


app.get("/api/items", (req, res, next) => { 
    
    let params = req.query;
    let query_srt = "";
      
    Object.keys(params).forEach(function eachKey(key) {
        query_srt += '?' + key + '=' + params[key] +'&limit=4';   
    });  
 
    https.get('https://api.mercadolibre.com/sites/MLA/search' + query_srt, function(response) {
        var body = ''; 
        response.on('data', function(chunk) {
          body += chunk;
        });

        response.on('end', function() {  
            let most_frecuency =  '';           
            let item_array = [];
            let categories_array = []; 
            body = JSON.parse(body); 

            body.results.forEach(element => { 
                let item = {
                    "id":  element.id,
                    "title": element.title,
                    "price": {
                        "currency": element.currency_id,
                        "amount": element.price,
                        "decimals": 0
                    },
                    "picture": element.thumbnail,
                    "condition": element.condition,
                    "free_shipping": element.shipping.free_shipping 
                }
                item_array.push(item);  
                categories_array.push(element.category_id); 
            });
            
            most_frecuency = findCommon(categories_array); 
            
            categories_array = []; +
            https.get('https://api.mercadolibre.com/categories/'+most_frecuency, (respo) => { 
                respo.on('data', (d) => { 
                    body = JSON.parse(d);  
                    body.path_from_root.forEach(category => { 
                        categories_array.push(category.name); 
                    });   
                 
                    let return_response = {
                        "author": { "name": "Daniel", "lastname": "Rubio"},
                        "items" : item_array,
                        "categories" : categories_array
                    } 
        
                    res.json(return_response); 

                }); 
            
            }).on('error', (e) => {
                console.error(e);
            }); 
             
        });
        
    }).on('error', function(e) {
        console.log("Got error: " + e.message);
    }); 

    function findCommon(arr) {
        var max = 1,
            m = [],
            val = arr[0],
            i, x;
    
        for(i = 0; i < arr.length; i ++) {
            x = arr[i]
            if (m[x]) {
                ++m[x] > max && (max = m[i], val = x);
            } else {
                m[x] = 1;
            }
        } return val;    
    }
      
   
});


app.get("/api/items/:id", (req, res, next) => {  
    let body = '';
    https.get('https://api.mercadolibre.com/items/' + req.params.id, function(response) {
        let data = [];

        response.on('data', function(chunk) {
            data.push(chunk);
        }).on('end', function() { 
            let buffer = Buffer.concat(data);
            data = JSON.parse(buffer);   

            https.get('https://api.mercadolibre.com/items/' + req.params.id+'/description', function(resp) {
                let data_description = []; 

                resp.on('data', function(chunk) {
                    data_description.push(chunk);
                }).on('end', function() {
                    let buffer = Buffer.concat(data_description);
                    data_description = JSON.parse(buffer);   

                    https.get('https://api.mercadolibre.com/categories/'+data.category_id, (respo) => { 
                        let data_category = []; 
                        let categories_array = [];

                        respo.on('data', function(chunk) {
                            data_category.push(chunk);
                        }).on('end', function() {
                            body = JSON.parse(data_category);  
                            body.path_from_root.forEach(category => { 
                                categories_array.push(category.name); 
                            });   
                            console.log(body);

                            let response_data = {
                                "author": { "name": "Daniel", "lastname": "Rubio"},
                                "item" : {
                                    "id":  data.id,
                                    "title": data.title,
                                    "price": {
                                        "currency": data.currency_id,
                                        "amount": data.price,
                                        "decimals": 0
                                    },
                                    "picture": data.pictures[0].url,
                                    "condition": data.condition,
                                    "free_shipping": data.shipping.free_shipping,
                                    "sold_quantity": data.sold_quantity,
                                    "description": data_description.plain_text 
                                },
                                "categories" : categories_array
                            }  
                    
                            res.json(response_data);

                        }) 
                    }); 
                    
                }) 
 
            });
        });
        
    })

})
