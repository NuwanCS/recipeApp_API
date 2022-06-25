const express = require('express');
const app = express();
const Joi = require('joi');

app.use(express.json());

const recipes = [
    {id: 1, name:"Recipe1"},
    {id: 2, name:"Recipe2"},
    {id: 3, name:"Recipe3"},
]

app.get('/', (req,res)=>{
   res.send("Hello");
})

app.get('/api/recipes', (req, res)=>{
    res.send(recipes)
})

app.get('/api/recipes/:id', (req, res)=>{
    const result = recipies.find(r => r.id === parseInt(req.params.id));
    if(!result) res.status(404).send('Result not found!')
    res.send(result)
})

app.post('/api/recipes', (req, res)=>{

    const schema = {
        name: Joi.string().min(3).required()
    }

    const result = Joi.validate(req.body, schema)

    if(result.error){
        res.status(400).send(result.error);
        return;
    }

    const recipe = {
        id: recipes.length +1,
        name: req.body.name
    }

    recipes.push(recipe);
    res.status(200).send(recipe);
})
 
const port = process.env.PORT || 3000
app.listen(port, ()=> console.log(`Listening on Port ${port}..`));