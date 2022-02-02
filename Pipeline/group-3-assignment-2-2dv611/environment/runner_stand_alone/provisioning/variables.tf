variable "username" {
  type = string
}

variable "password" {
  type      = string
  sensitive = true
}

variable "external_gateway" {
  type = string
}

variable "tenant_name" {
  type = string
}

variable "tenant_id" {
  type = string
}

variable "key_pair" {
  type      = string
  sensitive = true
}

variable "key_name" {
  type = string
}

variable "gitlab_token" {
  type = string
}

variable "network_name" {
  type    = string
  default = "testNet"
}



