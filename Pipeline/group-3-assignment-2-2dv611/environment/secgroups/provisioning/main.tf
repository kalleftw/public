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

resource "openstack_networking_secgroup_v2" "secgroup_ssh" {
  name        = "secgroup_ssh"
  description = "SSH security group"
}

resource "openstack_networking_secgroup_rule_v2" "secgroup_rule_1" {
  direction         = "ingress"
  ethertype         = "IPv4"
  protocol          = "tcp"
  port_range_min    = 22
  port_range_max    = 22
  remote_ip_prefix  = "0.0.0.0/0"
  security_group_id = openstack_networking_secgroup_v2.secgroup_ssh.id
}

resource "openstack_networking_secgroup_v2" "secgroup_http" {
  name        = "secgroup_http"
  description = "HTTP security group"
}

resource "openstack_networking_secgroup_rule_v2" "secgroup_rule_2" {
  direction         = "ingress"
  ethertype         = "IPv4"
  protocol          = "tcp"
  port_range_min    = 80
  port_range_max    = 80
  remote_ip_prefix  = "0.0.0.0/0"
  security_group_id = openstack_networking_secgroup_v2.secgroup_http.id
}


resource "openstack_networking_secgroup_v2" "secgroup_https" {
  name        = "secgroup_https"
  description = "HTTPS security group"
}


resource "openstack_networking_secgroup_rule_v2" "secgroup_rule_3" {
  direction         = "ingress"
  ethertype         = "IPv4"
  protocol          = "tcp"
  port_range_min    = 443
  port_range_max    = 443
  remote_ip_prefix  = "0.0.0.0/0"
  security_group_id = openstack_networking_secgroup_v2.secgroup_https.id
}

resource "openstack_networking_secgroup_v2" "secgroup_runner" {
  name        = "secgroup_runner"
  description = "Docker runner security group"
}

resource "openstack_networking_secgroup_rule_v2" "secgroup_rule_4" {
  direction         = "ingress"
  ethertype         = "IPv4"
  protocol          = "tcp"
  port_range_min    = 8093
  port_range_max    = 8093
  remote_ip_prefix  = "0.0.0.0/0"
  security_group_id = openstack_networking_secgroup_v2.secgroup_runner.id
}

resource "openstack_networking_secgroup_rule_v2" "secgroup_rule_5" {
  direction         = "egress"
  ethertype         = "IPv4"
  protocol          = "tcp"
  port_range_min    = 8093
  port_range_max    = 8093
  remote_ip_prefix  = "0.0.0.0/0"
  security_group_id = openstack_networking_secgroup_v2.secgroup_runner.id
}

resource "openstack_networking_secgroup_v2" "secgroup_proxyport" {
  name        = "secgroup_proxy"
  description = "Kubernetes proxy security group"
}

resource "openstack_networking_secgroup_rule_v2" "secgroup_rule_proxyport" {
  direction         = "ingress"
  ethertype         = "IPv4"
  protocol          = "tcp"
  port_range_min    = var.proxy_port
  port_range_max    = var.proxy_port
  remote_ip_prefix  = "0.0.0.0/0"
  security_group_id = openstack_networking_secgroup_v2.secgroup_proxyport.id
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

variable "proxy_port" {
  description = "Node port for Kubernetes worker nodes"
  type        = number
}


