const { Router } = require("express");

export default class CustomRouter {
  constructor() {
    this.router = Router();
    this.init();
  }
  init() {}
  getRouter() { return this.router; }

  get(path, policies, ...callbacksA) {
    this.router.get(path, handleResponses, this.handlePolicies(policies), this.applyCallbacks(callbacksA));
  }
  post(path, policies, ...callbacksA) {
    this.router.post(path, handleResponses, this.handlePolicies(policies), this.applyCallbacks(callbacksA));
  }
  put(path, policies, ...callbacksA) {
    this.router.put(path, handleResponses, this.handlePolicies(policies), this.applyCallbacks(callbacksA));
  }
  delete(path, policies, ...callbacksA) {
    this.router.delete(path, handleResponses, this.handlePolicies(policies), this.applyCallbacks(callbacksA));
  }

  handlePolicies = policies => (req, res, next) => {
    try {
      if(policies[0] === 'PUBLIC') return next();
      const authHeaders = req.headers.authorization; 
      if(!authHeaders) return res.status(401).send({isError: true, data: 'Unauthorized'});
      const token =  authHeaders.split(" ")[1] 
      const user = jwt.verify(token, JWT_PRIVATE_KEY)
      if(!policies.includes(user.role.toUpperCase())) return res.status(403).send({isError: true, data: 'Not permisions'}); 
      req.user = user; 
      next();
    } catch (error) {
      return res.status(401).send({isError: true, data: 'Token Invalid'});
    }
  }

  applyCallbacks(callbacksArray) {
    return callbacksArray.map((callback) => async (...params) => {
      try {
        await callback.apply(this, params);
      } catch (error) {
        params[1].status(500).send(error);
      }
    });
  }
}