./teardown.sh;
./setup.sh;
echo "give it a second..."
sleep 5s;
pushd ./util
node add-data.js;
popd;
