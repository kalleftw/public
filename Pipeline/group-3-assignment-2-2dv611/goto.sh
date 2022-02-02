#!/bin/sh
# SSH to instance through bastion instnace
# How to run: . ./goto.sh xx222yy_key_ssh.pem 194.47.155.8 192.168.0.12 

# Required parameters (key name, Public IP to bastion and target instance private ip)
keyName=$1
bastionPublicIP=$2
instancePrivateIP=$3

# Remove and re-add the bastion
ssh-keygen -R ${bastionPublicIP}
ssh-keyscan ${bastionPublicIP} >> ~/.ssh/known_hosts

# Run the ssh-agent
eval `ssh-agent`
sleep 2
ssh-add -k ~/.ssh/${keyName}

# Copy the key to the bastion instance
scp ~/.ssh/${keyName} ubuntu@${bastionPublicIP}:.ssh

# Create interactive ('bash' command) terminal (-t flag) with agent forwarding (-A flag).
# Then chomd the key and finaly ssh into the target instance
ssh -t -A ubuntu@$bastionPublicIP "chmod 600 ~/.ssh/$keyName; ssh -t ubuntu@$instancePrivateIP; bash"


