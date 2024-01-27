#!/usr/bin/env bash

on_change() {
    vol=$(pamixer --get-volume)
    muted=$(pamixer --get-mute)
    json=$(jq \
        --arg volume $vol \
        --arg muted $muted \
        -n '{ "volume": $volume, "muted": $muted }')

    echo $json
}

on_change

pactl subscribe | grep --line-buffered "sink" | while read
do
    on_change
done
