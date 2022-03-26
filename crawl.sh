#!/bin/bash
rm -fr ./data/crawled
mkdir ./data/crawled
find ./*-lod-opendata -type f | while read i; do echo $i| sed 's/^.*\///g' | sed 's/\.json//g'; done > ./data/words.txt
cat ./data/words.txt | while read i; do curl "https://www.lod.lu/php/getart.php?artid=$i.xml" -H "Referer: https://www.lod.lu/?$i" -H 'User-Agent: Firefox' --output ./data/crawled/$i.html; sleep 1; done
rm -f ./data/words.txt