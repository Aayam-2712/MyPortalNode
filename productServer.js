var express = require("express");
var app = express();
app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE,OPTIONS");
  next();
});

// let port = 2410;
var port= process.env.PORT||2410;
app.listen(port, () => console.log("Node App listening on port : ", port));



let products = [
    {
        id : "A101",
        brand : "Pepsi",
        category : "Beverages",
        product : "Pepsi 300ml",
        price : 20,
        inStock : "true",
    },
    {
        id : "A232",
        brand : "Coca Cola",
        category : "Beverages",
        product : "Diet Coke 300ml",
        price : 25,
        inStock : "false",
    },
    {
        id : "A102",
        brand : "Pepsi",
        category : "Beverages",
        product : "Pepsi 500ml",
        price : 40,
        inStock : "true",
    },
    {
        id : "A237",
        brand : "Coca Cola",
        category : "Beverages",
        product : " Coke 1l",
        price : 75,
        inStock : "true",
    },
    {
        id : "B034",
        brand : "Dairy Milk",
        category : "Chocolates",
        product : "Fruit and Nuts - 40g",
        price : 15,
        inStock : "false",
    },
    {
        id : "B035",
        brand : "Dairy Milk",
        category : "Chocolates",
        product : "Crackles - 100g",
        price : 45,
        inStock : "true",
    },
    {
        id : "B036",
        brand : "Dairy Milk",
        category : "Chocolates",
        product : "Nutties - 20g",
        price : 10,
        inStock : "true",
    },
    {
        id : "B137",
        brand : "Snickers",
        category : "Chocolates",
        product : "25gm bar",
        price : 35,
        inStock : "false",
    },
];

let users = [
    { username : "Emp101", password : "Emp101", name : "Jack Smith", role : "User" },
    { username : "Emp102", password : "Emp102", name : "Bob", role : "User" },
    { username : "Emp103", password : "Emp103", name : "Anna", role : "Admin" },
    { username : "Emp104", password : "Emp104", name : "Steve", role : "Admin" }
];


app.get("/productApp/products", function (req, res) {
    res.send(products);
});

app.get("/productApp/products/:id", function (req, res) {
    let id = req.params.id;
    console.log(id);
    let find = products.find((obj) => obj.id === id);
    console.log("find",find);
    if (find) {
        res.send(find);
    } else {
        res.send("Not Found");
    }
});

app.post("/productApp/products/add", function (req, res) {
    let body = req.body;
    console.log("bodyPost product add: ",body);
    let find = products.find((obj1) => obj1.id == body.id);
    console.log("Find : ", find)
    if (find) {
        res.status(400).send("Id Already Exist");
    } else {
        products.push(body);
        res.send(body);
    }
});

app.put("/productApp/products/:id", function (req, res) {
    let id = req.params.id;
    let body = req.body;
    console.log("Putid",id);
    console.log("Putbody",body);
    let index = products.findIndex((obj1) => obj1.id === id);
    if (index >= 0) {
        products[index] = body;
        res.send(body);
    } else {
        res.send("Not Found");
    }
});

app.delete("/productApp/products/:id", function (req, res) {
    let id = req.params.id;
    let index = products.findIndex((obj1) => obj1.id === id);
    if (index >= 0) {
        products.splice(index,1);
        res.send("Successfully deleted.");
    } else {
        res.send("Not Found");
    }
});



app.get("/productApp/users", function (req, res) {
    res.send(users);
});

app.post("/productApp/login", function(req,res) {
    let body = req.body;
    console.log("bodyPost login: ",body);
    let find = users.find((e1) => e1.username === body.username && e1.username === body.password);
    console.log("Find Login : ", find);
    if(find) {
        res.send(find)
    }
    else {
        res.status(400).send("Invalid Username or Password");
    }
})

app.get("/productApp/users/:username", function (req, res) {
    let username = req.params.username;
    console.log(username);
    let find = users.find((obj) => obj.username === username);
    console.log("find",find);
    if (find) {
        res.send(find);
    } else {
        res.send("Not Found");
    }
});

app.post("/productApp/user/add", function (req, res) {
    let body = req.body;
    console.log("bodyPost product add: ",body);
    let find = users.find((obj1) => obj1.username == body.username);
    console.log("Find : ", find)
    if (find) {
        res.status(400).send("Username Already Exist");
    } else {
        users.push(body);
        res.send(body);
    }
});

app.put("/productApp/users/:username", function (req, res) {
    let username = req.params.username;
    let body = req.body;
    console.log("Putid",username);
    console.log("Putbody",body);
    let index = users.findIndex((obj1) => obj1.username === username);
    if (index >= 0) {
        users[index] = body;
        res.send(body);
    } else {
        res.send("Not Found");
    }
});

app.delete("/productApp/users/:username", function (req, res) {
    let username = req.params.username;
    let index = users.findIndex((obj1) => obj1.username === username);
    if (index >= 0) {
        users.splice(index,1);
        res.send("Successfully deleted.");
    } else {
        res.send("Not Found");
    }
});


















// app.get("/products", function (req, res) {
//     res.send(products);
// });

app.get("/product/:id", function (req, res) {
    let id = +req.params.id;
    console.log(id);
    let find = products.find((obj) => obj.productId === id);
    console.log("find",find);
    if (find) {
        res.send(find);
    } else {
        res.send("Not Found");
    }
});

app.post("/product/add", function (req, res) {
    let body = req.body;
    console.log("bodyPostbefore : ",body);
    body.productId = +body.productId;
    console.log("bodyPostafter : ",body);
    let find = products.find((obj1) => obj1.productId === body.productId);
    if (find) {
        res.send("Id Already Exist");
    } else {
        products.push(body);
        res.send(body);
    }
});

app.put("/product/:id", function (req, res) {
    let id = +req.params.id;
    let body = req.body;
    console.log("Putid",id);
    console.log("Putbody",body);
    let index = products.findIndex((obj1) => obj1.productId === id);
    if (index >= 0) {
        products[index] = body;
        res.send(body);
    } else {
        res.send("Not Found");
    }
});







app.get("/purchases", function (req, res) {
    let productStr = +req.query.product;
    let store = req.query.store;
    let sort = req.query.sort;
    let arr = purchases;
    if (productStr) {
        let productArr = productStr.split(",");
        arr = arr.filter((obj) => productArr.find((p1) => p1 === obj.productid));
    }
    if (store) arr = arr.filter((obj) => obj.shopId == store);
    // if (sort == "QtyAsc") arr.sort((p1,p2) => p1.quantity - p2.quantity);
    // if (sort == "QtyDesc") arr.sort((p1,p2) => p2.quantity - p1.quantity);
    // if (sort == "ValueAsc") arr.sort((p1,p2) => (p1.quantity*p1.price) - (p2.quantity*p2.price));
    // if (sort == "ValueDesc") arr.sort((p1,p2) => (p2.quantity*p2.price) - (p1.quantity*p1.price));
    res.send(arr);
});



app.get("/purchases/shops/:id", function(req, res) {
    let id = req.params.id;
    let arr = purchases.filter((obj) => {
        let find = shops.find((obj1) => obj1.shopId === obj.shopId);
        if(find.shopId == id) return obj;
    }); 
    console.log("Array :" , arr);
});

app.get("/purchases/products/:id", function(req, res) {
    let id = req.params.id;
    let arr = purchases.filter((obj) => {
        let find = products.find((obj1) => obj1.productId === obj.productid);
        if(find.productId == id) return obj;
    }); 
    console.log("Array :" , arr);
});

app.post("/purchase/add", function (req, res) {
    let body = req.body;
    console.log("bodyPost : ",body);
    let find = purchases.find((obj1) => obj1.purchaseId === body.id);
    if (find) {
        res.send("Id Already Exist");
    } else {
        purchases.push(body);
        res.send(body);
    }
});



