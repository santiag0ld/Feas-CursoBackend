import Router from "../routerClass.js";

export default class UsersCRouter extends Router {
  init(){
    this.get('/', ['USER', 'ADMIN'], async (req, res) =>{
      try {
        const users = "users"
        if(!users) return res.sendUserError("User not found")
        res.sendSuccess(users)
      } catch (error) {
        res.sendServerError(error)
      }
    });
    this.post('/', (req, res) =>{
      res.send("POST USERS: Prueba exitosa")
    });
    this.put('/', (req, res) =>{
      res.send("PUT USERS: Prueba exitosa")
    });
    this.delete('/', (req, res) =>{
      
      res.send("DELETE USERS: Prueba exitosa")
    });
  }
}