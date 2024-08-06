#! /bin/bash
rm -rf ./dist/tsconfig.tsbuildinfo

mkdir tempDist

cp ./package.json ./tempDist/package.json
cp ./README.md ./tempDist/README.md
cp ./LICENSE ./tempDist/LICENSE
cp ./CHANGELOG.md ./tempDist/CHANGELOG.md
cp -r ./dist/* ./tempDist

sed -i -e 's/".\/dist/"./g' ./tempDist/package.json

cd tempDist
