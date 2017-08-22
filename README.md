## requirements

* Docker (tested with 17.x only)
* NodeJS 6.x+ (will likely work with 4.x, but is untested)
* a pinch of bash know-how

## setup

```
git clone git@github.com:capax/docker-processing-example.git
cd docker-processing-example.git
./setup.sh
```

This will pull down all of the appropriate base images and build the `ddp` family of images on them.  Note that this script _has_ to be run from the project directory - at present, there are dependencies built as relative directories to the base of the project.

### add data
Run `node util/add-data.js`.

### look at the destination
Run `node util/pg-dump.js`.
