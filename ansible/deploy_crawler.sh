#!/usr/bin/env bash
. ./hao-openrc.sh; ansible-playbook deploy_db_and_crawler.yaml -i inventory/customize_hosts.ini