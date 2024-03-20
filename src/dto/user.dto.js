class UserDTO {
  constructor(newUser){
      this.first_name = newUser.nombre
      this.last_name  = newUser.apellido
      this.full_name  = `${newUser.nombre} ${newUser.apellido}`
      this.email      = newUser.email
      this.password   = `${newUser.nombre}123`
  }
}

export default UserDTO