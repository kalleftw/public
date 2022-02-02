terraform {
  required_version = ">= 0.14.0"
  required_providers {
    openstack = {
      source  = "terraform-provider-openstack/openstack"
      version = "~> 1.35.0"
    }
  }
}

provider "openstack" {
  auth_url    = "https://cscloud.lnu.se:5000/v3"
  user_name   = var.username
  password    = var.password
  region      = "RegionOne"
  tenant_name = var.tenant_name
  tenant_id   = var.tenant_id
}


resource "openstack_networking_router_v2" "router_1" {
  name                = "router_1"
  external_network_id = var.external_gateway
}

resource "openstack_networking_network_v2" "testNet" {
  name           = var.network_name
  admin_state_up = "true"
}

resource "openstack_networking_subnet_v2" "sn_1" {
  name       = "sn_1"
  network_id = openstack_networking_network_v2.testNet.id
  cidr       = "192.168.0.0/24"
  ip_version = 4
}

resource "openstack_networking_router_interface_v2" "router_interface_1" {
  router_id = openstack_networking_router_v2.router_1.id
  subnet_id = openstack_networking_subnet_v2.sn_1.id
}

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

variable "network_name" {
  type    = string
  default = "testNet"
}



