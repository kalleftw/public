output "runner_name" {
  value       = openstack_compute_instance_v2.basic_with_fip.name
  description = "The public IP address of the runner instance."
}

output "runner_public_ip" {
  value       = openstack_networking_floatingip_v2.floatip_1.address
  description = "The public IP address of the runner instance."
}

output "runner_private_ip" {
  value       = openstack_compute_instance_v2.basic_with_fip.access_ip_v4
  description = "The private IP address of the runner instance."
}
