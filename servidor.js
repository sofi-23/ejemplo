const productos = [{"title":"book","price":40,"available":true,"id":1},{"title":"teapot","price":10,"available":true,"id":2},{"title":"computer","price":100,"available":true,"id":3}]

class Contenedor {
    constructor(nombre) {
        this.nombre = nombre
    }
    
    async save(objeto) {
        try {
            let data = await fs.promises.readFile("./" + this.nombre, "utf-8") 
            data = await JSON.parse(data)
            objeto.id = data.length + 1
            data.push(objeto)
            try {
                await fs.promises.writeFile("./" + this.nombre, JSON.stringify(data))
                data = await fs.promises.readFile("./" + this.nombre, "utf-8")
            }catch(err) {
                console.log("no se pudo agregar el objeto")
            
            }
        }catch(err){
            console.log("No existe el archivo")    
                objeto.id = 1
                const productos = []
                productos.push(objeto)
                fs.promises.writeFile("./" + this.nombre, JSON.stringify(productos))
        }
    }
    async getById(id) {
        //recibe un id y devuelve el objeto correspondiente, o null si no existe.
        try {
            let data = await fs.promises.readFile("./" + this.nombre, "utf-8")
            data = JSON.parse(data)
                let item = data.find(i=> i.id == id)
                if (item !== undefined) {
                    item = JSON.stringify(item)
                    console.log("ITEM" + item)
                    return item
                }else {
                    console.log("No existe un producto con ese id")
                    return null
                }
                
            } catch(err) {
            console.log("No existe el archivo")
        }

    }
    async getAll() {
        try {
            let data = await fs.promises.readFile("./" + this.nombre, "utf-8")
            data = JSON.parse(data)
            console.log(data)
        }catch {
            console.log("no se pudo leer el archivo")
        }
    }

    async deleteAll() {
        //elimina todos los objetos presentes en el archivo
        try {
            await fs.promises.readFile("./" + this.nombre, "utf-8")
            await fs.promises.writeFile("./" + this.nombre, [])
            let data = fs.promises.readFile("./" + this.nombre, "utf-8")
            data = JSON.stringify(data)
            console.log("DATA" + data)
        }catch {
            console.log("Archivo inexistente")
        }
    }

    async deleteById(id) {
        //Elimina los objetos con el id buscado.
        try {
            let data = await fs.promises.readFile("./" + this.nombre, "utf-8")
            data = await JSON.parse(data)
            try {
                data = data.filter(i=> i.id !== id)
                return console.log(data)
            } catch {
                console.log("no existe el id")
            }
        }catch {    
            console.log("Archivo inexistente")
        }
    }


}

const express = require("express")
const app = express()
    
    app.get('/productos', async (req, res) => {
        const productsFile = new Contenedor('products.json');
    
        const products = await productsFile.getAll();
    
        res.json(products);
    });

    app.get('/productoRandom', async (req, res) => {
        const productsFile = new Contenedor('products.json');
    
        const products = await productsFile.getAll();
    
        const random = Math.floor(Math.random() * products.length);
    
        res.json(products[random]);
    });
    
   app.listen(0, () => {
        
        console.log(`- Servidor escuchando`)
    })

    app.on("error", ()=> {console.log("ERROR")})