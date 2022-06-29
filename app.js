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
    if(!result) return res.status(404).send('Result not found!')
    res.send(result)
})

app.post('/api/recipes', (req, res)=>{
    const result = validateRecipe(req.body);
    if(result.error) return res.status(400).send(result.error.details[0].message);

    const recipe = {
        id: recipes.length +1,
        name: req.body.name
    }

    recipes.push(recipe);
    res.status(200).send(recipe);
})

app.put('/api/recipes/:id', (req, res)=>{
    const searchResult = recipes.find(r=> r.id === parseInt(req.params.id));
    if(!searchResult) return res.status(404).send('Invalid recipe ID')

    
    const {error} = validateRecipe(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    searchResult.name = req.body.name;
    res.send(searchResult)

})
 
app.delete('/api/recipes/:id', (req, res)=>{
    const recipe = recipes.find(r=> r.id === parseInt(req.params.id))
    if(!recipe) return res.status(404).send('Invalid recipe ID');

    const index = recipes.indexOf(recipe);
    recipes.splice(index, 1);

    res.send(recipe)


})

const validateRecipe = (recipe)=>{

    const schema = Joi.object({
        name:Joi.string().min(3).required()
    })

    return schema.validate(recipe)
}
const port = process.env.PORT || 3000
app.listen(port, ()=> console.log(`Listening on Port ${port}..`));