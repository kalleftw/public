terraform {
  required_version = ">= 0.14.0"
  required_providers {
    openstack = {
      source  = "terraform-provider-openstack/openstack"
      version = "~> 1.35.0"
    }
  }
}

resource "openstack_compute_instance_v2" "basic_with_fip" {
  name              = "runner"
  image_id          = "ca4bec1a-ac25-434f-b14c-ad8078ccf39f"
  flavor_name       = "c2-r4-d20"
  key_pair          = var.key_pair
  security_groups   = ["default", "secgroup_ssh", "secgroup_https", "secgroup_runner"]
  availability_zone = "Education"

  network {
    name = var.network_name
  }
}

resource "openstack_networking_floatingip_v2" "floatip_1" {
  pool = "public"
}

resource "openstack_compute_floatingip_associate_v2" "fip_ass1" {
  floating_ip = openstack_networking_floatingip_v2.floatip_1.address
  instance_id = openstack_compute_instance_v2.basic_with_fip.id
}

output "instance_ip_addr" {
  value       = openstack_networking_floatingip_v2.floatip_1.address
  description = "The public IP address of the server instance."
}