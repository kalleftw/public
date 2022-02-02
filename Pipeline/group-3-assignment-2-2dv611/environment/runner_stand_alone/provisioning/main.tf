module "instance_floatip" {
  source       = "./modules/instance_floatip/"
  key_pair     = var.key_pair
  network_name = var.network_name
}

resource "time_sleep" "wait_30_seconds" {
  depends_on = [
    module.instance_floatip
  ]

  triggers = {
    always_run = "${timestamp()}"
  }

  create_duration = "30s"
}

resource "local_file" "ansible_hostsfile" {
  depends_on = [
    module.instance_floatip, time_sleep.wait_30_seconds
  ]

  content = templatefile("inventory.tmpl", {
    runner-name    = module.instance_floatip.runner_name,
    runner-public  = module.instance_floatip.runner_public_ip,
    runner-private = module.instance_floatip.runner_private_ip,
    key_name        = var.key_name
    }
  )
  filename = "../configuration/ansible/hosts"
}

resource "local_file" "ansible_config_file" {
  depends_on = [
    module.instance_floatip, time_sleep.wait_30_seconds
  ]

  content = templatefile("ansible_config.tmpl", {
    key-name = var.key_name
    }
  )
  filename = "../configuration/ansible/ansible.cfg"
}

# "Manual" Execs...
resource "null_resource" "execfile" {
  depends_on = [
    module.instance_floatip, time_sleep.wait_30_seconds
  ]

  triggers = {
    always_run = "${timestamp()}"
  }

  provisioner "local-exec" {
    command = "(ssh-keygen -R $ip ; ssh-keyscan $ip >> .ssh/known_hosts ; eval `ssh-agent` ; ssh-add -k .ssh/$keyName ; scp .ssh/$keyName ubuntu@$ip:.ssh ; ssh -t ubuntu@$ip ; chmod 600 .ssh/$keyName)"

    environment = {
      ip      = module.instance_floatip.instance_ip_addr
      keyName = var.key_name
    }
  }

  provisioner "local-exec" {
    command = "(cd ../configuration/ansible ; ansible-playbook -i hosts main.yaml --extra-vars gitlab_runner_token=$gitlabToken)"
  
    environment = {
      gitlabToken = var.gitlab_token
      keyName = var.key_name
    }

  }
}
