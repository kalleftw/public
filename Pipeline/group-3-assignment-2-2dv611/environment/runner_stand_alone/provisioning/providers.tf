provider "openstack" {
  auth_url    = "https://cscloud.lnu.se:5000/v3"
  user_name   = var.username
  password    = var.password
  region      = "RegionOne"
  tenant_name = var.tenant_name
  tenant_id   = var.tenant_id
}
