terraform {
  required_version = ">= 0.14.0"
  required_providers {
    openstack = {
      source  = "terraform-provider-openstack/openstack"
      version = "~> 1.35.0"
    }
  }
}

resource "openstack_compute_instance_v2" "runner" {
  name              = "runner"
  image_id          = "ca4bec1a-ac25-434f-b14c-ad8078ccf39f"
  flavor_name       = "c2-r4-d40"
  key_pair          = var.key_pair
  security_groups   = ["default", "secgroup_ssh", "secgroup_https", "secgroup_runner"]
  availability_zone = "Education"

  network {
    name = var.network_name
  }
}

resource "openstack_networking_floatingip_v2" "runner_float_ip" {
  pool = "public"
}

resource "openstack_compute_floatingip_associate_v2" "runner_associate_fip" {
  floating_ip = openstack_networking_floatingip_v2.runner_float_ip.address
  instance_id = openstack_compute_instance_v2.runner.id
}

resource "time_sleep" "wait_5_seconds" {
  depends_on = [
    openstack_compute_instance_v2.runner
  ]

  triggers = {
    always_run = "${timestamp()}"
  }

  create_duration = "5s"
}

resource "local_file" "ansible_hostsfile" {
  depends_on = [
    openstack_compute_instance_v2.runner, time_sleep.wait_5_seconds
  ]

  content = templatefile("${path.module}/inventory.tmpl", {
    runner-name    = openstack_compute_instance_v2.runner.name,
    runner-public  = openstack_networking_floatingip_v2.runner_float_ip.address
    }
  )
  filename = "../../playbooks/inventory/runner_hosts"
}

resource "local_file" "ansible_config_file" {
  depends_on = [
    openstack_compute_instance_v2.runner, time_sleep.wait_5_seconds
  ]

  content = templatefile("${path.module}/ansible_config.tmpl", {
    key-name = var.key_name
    }
  )
  filename = "../../playbooks/ansible.cfg"
}

variable "key_pair" {
  type = string
}

variable "key_name" {
  type = string
}


variable "network_name" {
  type = string
}

variable "gitlab_token" {
  type = string
}
