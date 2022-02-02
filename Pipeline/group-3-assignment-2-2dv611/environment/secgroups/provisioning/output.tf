output "sec_group_id" {
  value       = tolist([openstack_networking_secgroup_rule_v2.secgroup_rule_2.security_group_id])
  description = "Security group id."
}

output "sec_group_proxyport" {
  value       = openstack_networking_secgroup_v2.secgroup_proxyport.name
  description = "Proxy port security group."
}