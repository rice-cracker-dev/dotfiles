#!/usr/bin/env bash

interface=$(iwgetid | awk '{ print $1 }')
state=$(cat "/sys/class/net/$interface/operstate")

json="{ \"state\": \"$state\" }"

if [[ $state == "up" ]]; then
    ssid=$(iwgetid -r)
    json=$(jq --arg ssid "$ssid" '. += { "ssid": $ssid }' <<< $json)
fi

echo $json

