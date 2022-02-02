output "vip_subnet_id" {
  value       = openstack_networking_subnet_v2.sn_1.id
  description = "ID of subnet."
}