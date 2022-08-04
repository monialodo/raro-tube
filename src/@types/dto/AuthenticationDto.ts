export interface LoginDTO {
  name: string
  password: string
}

export interface UserRegistrationDTO {
  name: string
  email: string
  password: string
}

export interface UserTokenDTO {
  id: string
  role: string

}

export interface UserResponseDTO {
  id: string
  name: string
  email: string
  role: string
}


export interface AuthResponseDTO {
  token: string
  role: string
}