	#!/bin/bash
    rm -rf ./package ./tmp
	mkdir -p ./package/Dictionaries
    mkdir ./tmp
	cp -r "../ddk_lod_project/objects/Lëtzebuerger Online Dictionnaire (LOD).dictionary" ./package/Dictionaries
	curl -L https://github.com/spellchecker-lu/dictionary-lb-lu/archive/refs/heads/master.zip -o ./tmp/dictionary-lb-lu.zip
	unzip -o ./tmp/dictionary-lb-lu.zip -d ./tmp
	mv ./tmp/dictionary-lb-lu-master ./package/Spelling
	pkgbuild  --root ./package --component-plist lod-pkg.plist ./lod.pkg
	productbuild  --distribution distribution.plist --resources ./resources --package-path ./lod.pkg ../LOD4Mac.pkg	