#!/usr/bin/env bash
. ./unimelb-comp90024-2021-grp-10-openrc.sh; ansible-playbook -vv deploy_frontend.yaml -i inventory/customize_hosts.ini