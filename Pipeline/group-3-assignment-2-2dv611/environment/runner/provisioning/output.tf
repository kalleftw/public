output "runner_name" {
  value       = openstack_compute_instance_v2.runner.name
  description = "The name of the runner instance."
}

output "runner_public_ip" {
  value       = openstack_networking_floatingip_v2.runner_float_ip.address
  description = "The public IP address of the runner instance."
}

output "runner_private_ip" {
  value       = openstack_compute_instance_v2.runner.access_ip_v4
  description = "The private IP address of the runner instance."
}


output "runner_ansible_inventory" {
  value = templatefile("${path.module}/inventory.tmpl", {
    runner-name    = openstack_compute_instance_v2.runner.name,
    runner-public  = openstack_networking_floatingip_v2.runner_float_ip.address
    }
  )
}

output "runner_ansible_cfg" {
  value = templatefile("${path.module}/ansible_config.tmpl", {
    key-name = var.key_name
    }
  )
}