#!/bin/bash
rm -rf ../Geomixer-client/plugins/forestproject;
cp -R dist ../Geomixer-client/plugins;
mv ../Geomixer-client/plugins/dist ../Geomixer-client/plugins/forestproject
echo plugin replaced
