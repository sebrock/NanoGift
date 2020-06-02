
mkdir -p firefox-addon/popup/

cp -r src/manifest.json src/icons/ src/popup/ firefox-addon/
cp -r src/lib/qrcode-source.js build/

cd build/ 
npm install minify
node minify.js

cd ..
mv ./build/qrcode.js ./firefox-addon/popup/
