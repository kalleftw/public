# Test file for GitLab pipeline: Will try to create a small instance

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

terraform {
  backend "http" {
  }
}


module "network" {
  source           = "./environment/network/provisioning/"
  external_gateway = var.external_gateway
  network_name     = var.network_name
  username         = var.username
  password         = var.password
  tenant_name      = var.tenant_name
  tenant_id        = var.tenant_id
}

module "secgroups" {
  source           = "./environment/secgroups/provisioning/"
  username         = var.username
  password         = var.password
  tenant_name      = var.tenant_name
  tenant_id        = var.tenant_id
  proxy_port       = var.proxy_port
}

resource "time_sleep" "wait_15_seconds" {
  depends_on = [
    module.network, module.secgroups
  ]

  triggers = {
    always_run = "${timestamp()}"
  }

  create_duration = "15s"
}


resource "openstack_networking_floatingip_v2" "production_ip" {
  pool         = "public"
  description  = "production"
}

resource "openstack_networking_floatingip_v2" "staging_ip" {
  pool         = "public"
  description  = "staging"
}


# Runner
module "runner" {
  source       = "./environment/runner/provisioning/"
  depends_on   = [module.network, module.secgroups, time_sleep.wait_15_seconds]
  key_pair     = var.key_pair
  key_name     = var.key_name
  network_name = var.network_name
  gitlab_token = var.gitlab_token
}

# Instances
module "blue_instances" {
  source              = "./environment/blue_instances/provisioning/"
  depends_on          = [module.network, module.secgroups, time_sleep.wait_15_seconds]
  username            = var.username
  password            = var.password
  external_gateway    = var.external_gateway
  tenant_name         = var.tenant_name
  tenant_id           = var.tenant_id
  key_pair            = var.key_pair
  key_name            = var.key_name
  network_name        = var.network_name
  sec_group_proxyport = module.secgroups.sec_group_proxyport
}

# Instances
module "green_instances" {
  source              = "./environment/green_instances/provisioning/"
  depends_on          = [module.network, module.secgroups, time_sleep.wait_15_seconds]
  username            = var.username
  password            = var.password
  external_gateway    = var.external_gateway
  tenant_name         = var.tenant_name
  tenant_id           = var.tenant_id
  key_pair            = var.key_pair
  key_name            = var.key_name
  network_name        = var.network_name
  sec_group_proxyport = module.secgroups.sec_group_proxyport
}

module "blue_loadbalancer" {
  source        = "./environment/blue_loadbalancer/provisioning/"
  depends_on    = [module.network, module.secgroups, module.blue_instances, time_sleep.wait_15_seconds]
  address       = module.blue_instances.blue_worker_ip
  vip_subnet_id = module.network.vip_subnet_id
  sec_group_id  = module.secgroups.sec_group_id
  proxy_port    = var.proxy_port
}

module "green_loadbalancer" {
  source        = "./environment/green_loadbalancer/provisioning/"
  depends_on    = [module.network, module.secgroups, module.green_instances, time_sleep.wait_15_seconds]
  address       = module.green_instances.green_worker_ip
  vip_subnet_id = module.network.vip_subnet_id
  sec_group_id  = module.secgroups.sec_group_id
  proxy_port    = var.proxy_port
}

resource "openstack_networking_floatingip_associate_v2" "default_fip_production_lb" {
  depends_on  = [module.network, module.secgroups, module.blue_instances, module.green_instances, module.blue_loadbalancer, module.green_loadbalancer]
  port_id     = module.blue_loadbalancer.lb_port_id
  floating_ip = openstack_networking_floatingip_v2.production_ip.address
  
  lifecycle {
    ignore_changes = [
      floating_ip, port_id
    ]
  }
}

resource "openstack_networking_floatingip_associate_v2" "default_fip_staging_lb" {
  depends_on  = [module.network, module.secgroups, module.blue_instances, module.green_instances, module.blue_loadbalancer, module.green_loadbalancer]
  port_id     = module.green_loadbalancer.lb_port_id
  floating_ip = openstack_networking_floatingip_v2.staging_ip.address

  lifecycle {
    ignore_changes = [
      floating_ip, port_id
    ]
  }
}


variable "username" {
  type = string
}

variable "password" {
  type      = string
  sensitive = true
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

variable "network_name" {
  type = string
  default = "testNet"
}

variable "external_gateway" {
  type = string
}

variable "proxy_port" {
  description = "Node port for Kubernetes worker nodes"
  type        = number
  default     = 31790
}

variable "gitlab_token" {
  type = string
}

output "ansible_blue_inventory" {
  value = module.blue_instances.ansible_inventory
  description = "Content of the blue_instances inventory host file (blue_hosts)"
}

output "ansible_green_inventory" {
  value = module.green_instances.ansible_inventory
  description = "Content of the green_instances inventory host file (green_hosts)"
}

output "ansible_cfg" {
  value = "${coalesce(module.blue_instances.ansible_cfg, module.green_instances.ansible_cfg, module.runner.runner_ansible_cfg)}"
  description = "Content of the ansible cfg file"
}

output "runner_ansible_inventory" {
  value = module.runner.runner_ansible_inventory
  description = "Content of the runner inventory host file (runner_hosts)"
}

output "production_public_ip" {
  value       = openstack_networking_floatingip_v2.production_ip.address
  description = "Public IP to the application (PRODUCTION)!"
}

output "production_public_ip_id" {
  value       = openstack_networking_floatingip_v2.production_ip.id
  description = "Public IP ID (PRODUCTION)!"
}

output "staging_public_ip" {
  value       = openstack_networking_floatingip_v2.staging_ip.address
  description = "Public IP to the application (STAGING)!"
}

output "staging_public_ip_id" {
  value       = openstack_networking_floatingip_v2.staging_ip.id
  description = "Public IP ID (STAGING)!"
}

output "blue_loadbalancer_port_id" {
  value       = module.blue_loadbalancer.lb_port_id
  description = "Port id of the blue loadbalancer"
}

output "blue_loadbalancer_description" {
  value       = module.blue_loadbalancer.lb_description
  description = "Description of the blue loadbalancer"
}

output "green_loadbalancer_port_id" {
  value       = module.green_loadbalancer.lb_port_id
  description = "Port id of the green loadbalancer"
}

output "green_loadbalancer_description" {
  value       = module.green_loadbalancer.lb_description
  description = "Description of the green loadbalancer"
}


output "blue_bastion_public_ip" {
  value       = module.blue_instances.blue_bastion_public_ip
  description = "The public IP address of the blue bastion instance."
}

output "blue_master_private_ip" {
  value       = module.blue_instances.blue_master_private_ip
  description = "The private IP address of the blue master instance."
}

output "green_bastion_public_ip" {
  value       = module.green_instances.green_bastion_public_ip
  description = "The public IP address of the green bastion instance."
}

output "green_master_private_ip" {
  value       = module.green_instances.green_master_private_ip
  description = "The private IP address of the green master instance."
}