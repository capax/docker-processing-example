# docker cheatsheet

* creating an image: `docker build -t [name] [dockerfile location]`
* listing images: `docker image list`
* running a container: `docker run -d --name [name] [imagename]`
    * `-d` means the container starts detatched
* listing all containers: `docker container ls -al`

* test that hap config: `docker run -it --network ddp --rm --name haproxy-syntax-check ddp-haproxy haproxy -c -f /usr/local/etc/haproxy/haproxy.cfg`
    * note that the hap config location must match the one in the `COPY` directive in the dockerfile
    * `--rm` torches the container on exit 
