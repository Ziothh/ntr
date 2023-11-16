tsc 
cp -r ./generated ./npm/generated 
rm -rf ./npm/types
cp -r ./types ./npm/types 
(rm -rf npm/package.json || '')
