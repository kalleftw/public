# Commands for the cluster.yaml template

### Install Kubernetes cluster on the blue environment
ansible-playbook -i inventory cluster.yaml --e "instance_color=blue"

### Install Kubernetes cluster on the green environment
ansible-playbook -i inventory cluster.yaml --e "instance_color=green"

### Install Kubernetes cluster and deploy the orginal app on the blue environment
ansible-playbook -i inventory main.yaml

### Deploy the orginal app on the blue environment
ansible-playbook -i inventory deploy_app_original.yaml

### Create terraform .tf files from templates (green)
ansible-playbook terraform_templates.yaml --e "color=green"

### Create terraform .tf files from templates (blue)
ansible-playbook terraform_templates.yaml --e "color=blue"