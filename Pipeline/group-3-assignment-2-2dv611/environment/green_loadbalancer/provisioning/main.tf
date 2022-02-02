terraform {
  required_version = ">= 0.14.0"
  required_providers {
    openstack = {
      source  = "terraform-provider-openstack/openstack"
      version = "~> 1.35.0"
    }
  }
}


resource "openstack_lb_loadbalancer_v2" "lb" {
  name               = "green_loadbalancer"
  vip_subnet_id      = var.vip_subnet_id #subnet id
  security_group_ids = var.sec_group_id
  description        = "staging"

  lifecycle {
    ignore_changes = [
      description
    ]
  }
}

#lb pool
resource "openstack_lb_pool_v2" "pool" {
  name      = "lb_pool"
  protocol  = var.pool_protocol
  lb_method = var.pool_lb_method
  loadbalancer_id = openstack_lb_loadbalancer_v2.lb.id
}

#lb listener
resource "openstack_lb_listener_v2" "listener" {
  name            = "listener"
  protocol        = var.listener_protocol
  protocol_port   = var.listener_port
  loadbalancer_id = openstack_lb_loadbalancer_v2.lb.id
  default_pool_id = openstack_lb_pool_v2.pool.id
}

#lb monitor
resource "openstack_lb_monitor_v2" "monitor" {
  name        = "lb_monitor"
  pool_id     = openstack_lb_pool_v2.pool.id
  type        = var.monitor_type
  delay       = var.monitor_delay
  timeout     = var.monitor_timeout
  max_retries = var.monitor_max_retries
}

#Members
resource "openstack_lb_member_v2" "member" {
  count         = length(var.address)
  address       = var.address[count.index]
  protocol_port = var.proxy_port
  pool_id       = openstack_lb_pool_v2.pool.id
  subnet_id     = var.vip_subnet_id
}

#allocate floating ip to lb
#get floating IP
#resource "openstack_networking_floatingip_v2" "floatingip_1" {
#  pool = "public" #correct value?
#}

#associate floating ip to lb
#resource "openstack_networking_floatingip_associate_v2" "floatip_1" {
#  floating_ip = openstack_networking_floatingip_v2.floatingip_1.address
#  port_id     = openstack_lb_loadbalancer_v2.lb.vip_port_id
#}

variable "network_name" {
  type = string
  default = "testNet"
}


#variables outputted from other modules
variable "vip_subnet_id" {
  type = string
}

variable "address" {
  type = list(string)
}

variable "sec_group_id" {
  type = list(string)
}

#pool
variable "pool_protocol" {
  type    = string
  default = "HTTP"
}

variable "pool_lb_method" {
  type    = string
  default = "ROUND_ROBIN"
}

#listener
variable "listener_protocol" {
  type    = string
  default = "HTTP"
}

variable "listener_port" {
  type    = number
  default = 80
}

#monitor
variable "monitor_type" {
  type    = string
  default = "TCP"
}

variable "monitor_delay" {
  type    = number
  default = 5
}
variable "monitor_timeout" {
  type    = number
  default = 5
}
variable "monitor_max_retries" {
  type    = number
  default = 3
}

variable "proxy_port" {
  description = "Port number to be used between Openstack loadbalancer and kubernetes workers (for proxy pod)."
  type        = number
  default = 31790
}
