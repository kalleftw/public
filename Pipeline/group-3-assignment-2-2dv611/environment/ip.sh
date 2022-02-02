#!/bin/bash

#Root path
rootPath=$1

# Check associated number of floating ip (should be maximum 3 with a runner)
openstack server list -f json | jq -r '.[] | (.Networks | split("=")[1:2] | join(""))' > associatedFIP.json

noAssociatedFIP=0
while read -r i ; do
line="${i}"
len=${#line}

if [ "$len" -gt 20 ]
then
    noAssociatedFIP=$((noAssociatedFIP + 1));
fi
done < associatedFIP.json
echo "noAssociatedFIP - $noAssociatedFIP"


# Check number of allocated floating IP:
neutron floatingip-list -c 'floating_ip_address' -f json > allocatedFIP.json
noAllocatedFIP=$(jq length allocatedFIP.json)
echo "noAllocatedFIP - $noAllocatedFIP"


# Create IPs if needed
avFIP="$((noAllocatedFIP-noAssociatedFIP))"
maxFIP="$((5-noAssociatedFIP))"
allocateNoOfFIP="$((maxFIP-avFIP))"

echo "avFIP - $avFIP"
echo "allocateNoOfFIP - $allocateNoOfFIP"
echo "maxFIP - $maxFIP"

if [ "${noAllocatedFIP}" -lt 5 ] && [ "${allocateNoOfFIP}" -le 2 ] && [ "${allocateNoOfFIP}" -ge 1 ] && [ "${maxFIP}" -le 5 ] 
then

echo "allocateNoOfFIP - $allocateNoOfFIP"

for ((j = 0; j < allocateNoOfFIP; j++));
do   

echo "Create floating ip"
openstack floating ip create public

done
fi

# Get IP info
neutron floatingip-list -f json > newAllocatedFIP.json
openstack server list -f json > newAssociatedFIP.json
neutron lbaas-loadbalancer-show blue_loadbalancer -f json > blue_loadbalancer.json
neutron lbaas-loadbalancer-show green_loadbalancer -f json > green_loadbalancer.json

# Allocated IP's
printf "####################\nAllocated IP's:\n"
allFipArr=( $(jq -r '.[].floating_ip_address' newAllocatedFIP.json) )
printf '%s\n' "${allFipArr[@]}"

# Already associated IP's
printf "####################\nAlready associated IP's:\n"
allAssocFipArr=( $(jq '.[]| select(.Networks | index("194")) | .Networks | split(", ")[1:2] | join("")' -r newAssociatedFIP.json) )
printf '%s\n' "${allAssocFipArr[@]}"

# Loadbalancer IP's
printf "####################\nDedicated Loadbalancer IP's:\n"
loadbalancerIPArr=(`echo ${allFipArr[@]} ${allAssocFipArr[@]} | tr ' ' '\n' | sort | uniq -u `)
printf '%s\n' "${loadbalancerIPArr[@]}"

loadbalancer_IP1="${loadbalancerIPArr[0]}"
loadbalancer_IP2="${loadbalancerIPArr[1]}"

# Loadbalancer IP's (ID)
printf "####################\nDedicated Loadbalancer IP's (ID):\n"
loadbalancer_IP1_ID_Arr=( $(jq --arg loadbalancer_IP1 "$loadbalancer_IP1" '.[]| select(.floating_ip_address | index($loadbalancer_IP1)) | .id' -r newAllocatedFIP.json) )
loadbalancer_IP2_ID_Arr=( $(jq --arg loadbalancer_IP2 "$loadbalancer_IP2" '.[]| select(.floating_ip_address | index($loadbalancer_IP2)) | .id' -r newAllocatedFIP.json) )


loadbalancer_IP1_ID="${loadbalancer_IP1_ID_Arr[0]}"
loadbalancer_IP2_ID="${loadbalancer_IP2_ID_Arr[0]}"

echo "$loadbalancer_IP1 ($loadbalancer_IP1_ID)"
echo "$loadbalancer_IP2 ($loadbalancer_IP2_ID)"


# Loadbalancer IP's (PORT ID)
printf "####################\nDedicated Loadbalancer IP's (PORT ID):\n"
loadbalancer_IP1_Port_ID_Arr=( $(jq --arg loadbalancer_IP1 "$loadbalancer_IP1" '.[]| select(.floating_ip_address | index($loadbalancer_IP1)) | .port_id' -r newAllocatedFIP.json) )
loadbalancer_IP2_Port_ID_Arr=( $(jq --arg loadbalancer_IP2 "$loadbalancer_IP2" '.[]| select(.floating_ip_address | index($loadbalancer_IP2)) | .port_id' -r newAllocatedFIP.json) )

loadbalancer_IP1_Port_ID="${loadbalancer_IP1_Port_ID_Arr[0]}"
loadbalancer_IP2_Port_ID="${loadbalancer_IP2_Port_ID_Arr[0]}"

echo "$loadbalancer_IP1 ($loadbalancer_IP1_Port_ID)"
echo "$loadbalancer_IP2 ($loadbalancer_IP2_Port_ID)"


# Loadbalancer PORT (ID)
printf "####################\nLoadbalancer PORTS's:\n"
blue_loadbalancer_port=( $(jq -r '.vip_port_id' blue_loadbalancer.json) )
green_loadbalancer_port=( $(jq -r '.vip_port_id' green_loadbalancer.json) )

echo "$blue_loadbalancer_port (blue_loadbalancer)"
echo "$green_loadbalancer_port (green_loadbalancer)"


printf "####################\nFINAL Loadbalancer IP's:\n"

FINAL_PROD_IP=""
FINAL_STAG_IP=""
STAG_USE_IP=""

if [ "$blue_loadbalancer_port" = "$loadbalancer_IP2_Port_ID" ]
then
    echo "PROD 1"
    FINAL_PROD_IP="$loadbalancer_IP2"
    FINAL_STAG_IP="$loadbalancer_IP1"
    STAG_USE_IP="$loadbalancer_IP1_ID"
elif [ "$blue_loadbalancer_port" = "$loadbalancer_IP1_Port_ID" ]
then
    echo "PROD 2"
    FINAL_PROD_IP="$loadbalancer_IP1"
    FINAL_STAG_IP="$loadbalancer_IP2"
    STAG_USE_IP="$loadbalancer_IP2_ID"
else
    echo "No IP assigned to production loadbalancer. Assigning floating IP..."

    if [ "$green_loadbalancer_port" != "$loadbalancer_IP1_Port_ID" ]
    then
        echo "PROD 3"
        FINAL_PROD_IP="$loadbalancer_IP1"
        FINAL_STAG_IP="$loadbalancer_IP2"
        STAG_USE_IP="$loadbalancer_IP2_ID"
        neutron floatingip-associate "$loadbalancer_IP1_ID" "$blue_loadbalancer_port" 
    elif [ "$green_loadbalancer_port" != "$loadbalancer_IP2_Port_ID" ]
    then
        echo "PROD 4"
        FINAL_PROD_IP="$loadbalancer_IP2"
        FINAL_STAG_IP="$loadbalancer_IP1"
        STAG_USE_IP="$loadbalancer_IP1_ID"
        neutron floatingip-associate "$loadbalancer_IP2_ID" "$blue_loadbalancer_port" 
    else
        echo "PROD 5"
        FINAL_PROD_IP="$loadbalancer_IP1"
        FINAL_STAG_IP="$loadbalancer_IP2"
        STAG_USE_IP="$loadbalancer_IP2_ID"
        neutron floatingip-associate "$loadbalancer_IP1_ID" "$blue_loadbalancer_port" 
    fi
fi
 

if [ "$green_loadbalancer_port" = "$loadbalancer_IP1_Port_ID" ]
then
    FINAL_STAG_IP="$loadbalancer_IP1"
elif [ "$green_loadbalancer_port" = "$loadbalancer_IP2_Port_ID" ]
then
    FINAL_STAG_IP="$loadbalancer_IP2"
else
    echo "No IP assigned to staging loadbalancer. Assigning floating IP..."
    STAG_USE_IP="$STAG_USE_IP"
    FINAL_STAG_IP="$FINAL_STAG_IP"
    neutron floatingip-associate "$STAG_USE_IP" "$green_loadbalancer_port"
fi


echo "PRODUCTION IP = $FINAL_PROD_IP"
echo "STAGING IP = $FINAL_STAG_IP"

# Write IP to files
# production_ip_path="${rootPath}/environment/playbooks/production_ip.txt"
# echo "$production_ip_path"
# echo "$FINAL_PROD_IP" > "$production_ip_path"

# staging_ip_path="${rootPath}/environment/playbooks/staging_ip.txt"
# echo "$staging_ip_path"
# echo "$FINAL_STAG_IP" > "$staging_ip_path"

# neutron floatingip-disassociate 

