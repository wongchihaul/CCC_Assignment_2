# User Guide

**FYI:**

**1. You should open `ansible/unimelb-comp90024-2021-grp-10-openrc.sh` and change *OS_USERNAME* to your MRC username**

**2. Make sure you are in root directory**

```bash
cd ansible
sh create_instance.sh
sh deploy_couchdb.sh && sh deploy_crawler.sh
sh git_clone.sh && sh deploy_frontend.sh && sh deploy_backend.sh
```
Wait a while for the set up completes. Then open browser, enter `http://45.113.233.83:3000` in address bar and you should see our website 
