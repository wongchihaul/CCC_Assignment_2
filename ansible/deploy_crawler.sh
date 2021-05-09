#!/usr/bin/env bash
. ./hao-openrc.sh; ansible-playbook deploy_crawler.yaml -i inventory/customize_hosts.ini