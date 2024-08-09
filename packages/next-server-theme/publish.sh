#! /bin/bash
rm -rf ./dist/tsconfig.tsbuildinfo

mkdir tempDist

cp ./package.json ./tempDist/package.json
cp ./README.md ./tempDist/README.md
cp ./LICENSE ./tempDist/LICENSE
cp ./CHANGELOG.md ./tempDist/CHANGELOG.md
cp -r ./dist/* ./tempDist

sed -i 's/".\/dist/"./g' ./tempDist/package.json
sed -i -E '/development/,/}/d' ./tempDist/package.json

cd tempDist