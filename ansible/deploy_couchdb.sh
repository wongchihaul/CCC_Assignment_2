#!/usr/bin/env bash
. ./hao-openrc.sh; ansible-playbook -vv deploy_couchdb.yaml -i inventory/customize_hosts.ini