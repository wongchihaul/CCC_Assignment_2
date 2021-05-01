# CCC_Assignment_2

1. You should manually source your github ssh private key. E.g. `export SSHPrivateKey=~/.ssh/git_id_rsa`
2. You should change the path of python interpreter according to your own environment. 
3. I've changed my Nectar password to plaintext in `unimelb-comp90024-2021-grp-10-openrc.sh` to make development less annoying. Feel free to use it.
## TODO:
1. Continue configuring roles; 
2. Set up CouchDB clusters (Or, install CouchDB directly);
3. Optional: Set our account envs invisible;

## DONE
1. Set up runtime environment for and installed dependencies for couchdb_servers and demo_servers separately.
2. Assigned IP addresses derived from tasks to our servers to avoid hardcoding.
3. Changed `mrc.yaml` in root directory to a more convention name `site.yaml` 
4. Moved contents in `couchdb.yaml` and `demo.yaml` to `local.yaml` because all of those contents should be used locally to set up servers.

