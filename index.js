const { response, json, request } = require('express')
const express = require('express')
const uuid = require('uuid')

const app = express()
app.use(express.json()) /*<=serve pra avisar o express que vamos usar json*/

 const orders = [] /*não esquecer a aprender a colocar isso em um banco de dados, porque ao armazenar uma info numa variável,depois ela some*/


 app.post('/orders',(req,resp) => { 
   const { nome,valor,pedido,status} = req.body
   
   const order = {id:uuid.v4(),nome,valor,pedido,status}

   orders.push(order)

   return resp.status(201).json(order)

   } ) 


 app.get('/orders',(req,resp) => { 
    

      return resp.json({orders})
  
      } )   

const checkOrderId = (req,resp,next) => {
   const {id} = req.params 
   
  const index = orders.findIndex (order => order.id === id )
  console.log(index)

  if (index < 0 ) {
   return resp.status(404).json({message:"order not found"})
  }

 req.orderIndex =index
 req.orderId = id

 next ()   
  
}





 app.put('/orders/:id',checkOrderId ,(req,resp) => {
//   const {id} = req.params  
  
  const {nome,valor,pedido,status} = req.body

  const index = req.orderIndex
  const id = req.orderId

  const updatedorder = {id,nome,valor,pedido,status} 

//   const index = orders.findIndex (order => order.id === id )

//   if (index < 0 ) {
//        return resp.status(404).json({message:"user not found"})
//     }
   
  orders[index] = updatedorder

  console.log(index)
 
  return resp.json(orders)

 } )

 app.patch('/orders/:id',checkOrderId,(req,resp) => {
   
   const {nome,valor,pedido,status} = req.body
 
   const updateStatus = {nome,valor,pedido,status} 

   const index = req.orderIndex
 
   orders[index] = updateStatus
 
   console.log(index)
  
   return resp.json(orders)
 
  } )
 
 
 app.delete('/orders/:id',checkOrderId,(req,resp) => { 
   
   const index = req.orderIndex
 

   // const index = orders.findIndex (order => order.id === id )
    
   orders.splice(index,1)

   return resp.status(204).json()
   

   } )


   // app.get('/orders/:id',(req,resp) => {    criar rota para retornar somenete um pedido
   //    const {id} = req.params

   //    const order = {id:uuid.v4(),nome,valor,pedido,status}

   //    const index = orders.findIndex (order => order.id === id )

      
   //    if (index < 0 ) {
   //    return resp.status(404).json({message:"user not found"})
   //   }

   //   return resp.status(201).json(order)
   //    } )






















app.listen(3001,() => {console.log('server started on port 3001')} )


















// app.get('/users',(request,response) => {
//      const name = request.query.nome
//      const age = request.query.age
      
//       console.log(name,age)
//       return response.json({nome:name, idade:age}) 
// })



/*meu site.com/users?nome=rodolfo&age=28*/

// app.get('/users',(req,resp) => {
//  const name = req.query.nome
//  const idade = req.query.age

//  /* para reduzir código eu posso fazer 
//  "const {name,idade} = request.query "   
//  (destructuring assigmnet)*/

//  return resp.json({nome:name, age:idade})
  
// } )



// app.get ('/users/:id',(req,resp) =>{

// const {id} = req.params
// console.log(req.params)

// return resp.json({id})

// } )


// app.get ('/users',(req,resp) => {

// console.log(req.body)
// const {nome,idade} = req.body
// return resp.json({message:"ok"})

// } )
