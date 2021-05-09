#!/usr/bin/env bash
. ./hao-openrc.sh; ansible-playbook -vv deploy_couchdb_cluster.yaml -i inventory/customize_hosts.ini