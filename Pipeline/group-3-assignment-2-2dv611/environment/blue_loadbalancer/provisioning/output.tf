output "lb_name" {
  value       = openstack_lb_loadbalancer_v2.lb.name
  description = "The name of the loadbalancer"
}

output "lb_description" {
  value       = openstack_lb_loadbalancer_v2.lb.description
  description = "The description of the loadbalancer"
}

output "lb_port_id" {
  value       = openstack_lb_loadbalancer_v2.lb.vip_port_id
  description = "The port id of the loadbalancer"
}

# Public IP of load balancer
#output "lb_public_ip" {
#  value       = openstack_networking_floatingip_associate_v2.floatip_1.floating_ip
#  description = "The public IP address of the loadbalancer"
#}
