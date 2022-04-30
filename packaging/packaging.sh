#!/bin/bash

# to sign the package, you need to create a Developer ID Installer certificate
# then create in this folder an id.sh file containing the following lines:
#
# export APPLE_DEVELOPER_CERTIFICATE_ID="Your name (your_id)"
# export APPLE_DEVELOPER_EMAIL="your_email_address"
# export APPLE_NOTARIZATION_PASS="xxxx-xxxx-xxxx-xxxx"
# 
# To create an app specific password, you need to follow these instructions:
# https://support.apple.com/en-us/HT204397


if [ -f id.sh ]; 
then 
    source id.sh
fi

VERSION="0.2.0"
rm -rf ./package ./tmp
mkdir -p ./package/Dictionaries
mkdir ./tmp
cp -r "../ddk_lod_project/objects/Lëtzebuerger Online Dictionnaire (LOD).dictionary" ./package/Dictionaries
curl -L https://github.com/spellchecker-lu/dictionary-lb-lu/archive/refs/heads/master.zip -o ./tmp/dictionary-lb-lu.zip
unzip -o ./tmp/dictionary-lb-lu.zip -d ./tmp
mv ./tmp/dictionary-lb-lu-master ./package/Spelling
pkgbuild --identifier "org.sous-anneau.lod4mac" --version "${VERSION}" --root ./package --component-plist lod-pkg.plist ./lod.pkg
productbuild  --distribution distribution.plist --resources ./resources --package-path ./lod.pkg "../LOD4Mac-Installer-v${VERSION}-unsigned.pkg"
if [ -n "${APPLE_DEVELOPER_CERTIFICATE_ID+x}" ];
then
    echo "id: ${APPLE_DEVELOPER_CERTIFICATE_ID}" 
    productsign --timestamp --sign "Developer ID Installer: ${APPLE_DEVELOPER_CERTIFICATE_ID}" "../LOD4Mac-Installer-v${VERSION}-unsigned.pkg" "../LOD4Mac-Installer-v${VERSION}.pkg"
    pkgutil --check-signature "../LOD4Mac-Installer-v${VERSION}.pkg"	
fi

if [ -n "${APPLE_NOTARIZATION_PASS+x}" ];
then
    echo "Uploading file for notarization"
    requestUUID="$(xcrun altool --notarize-app --primary-bundle-id "org.sous-anneau.lod4mac" -u "${APPLE_DEVELOPER_EMAIL}" -p "${APPLE_NOTARIZATION_PASS}" -t macos -f "../LOD4Mac-Installer-v${VERSION}.pkg" | grep "RequestUUID" | sed "s/^.*=\ //")"
    echo "Uploaded! Request ID: ${requestUUID}"
    # FIXME manage error cases...
    while [ 0 -eq "$(xcrun altool --notarization-history 0 -u "${APPLE_DEVELOPER_EMAIL}" -p "${APPLE_NOTARIZATION_PASS}" | grep "${requestUUID}" | grep "success" | wc -w)" ]; 
    do 
        echo "waiting for an answer..."
        sleep 10
    done
    xcrun stapler staple "../LOD4Mac-Installer-v${VERSION}.pkg"
fi
