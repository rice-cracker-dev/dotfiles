#!/usr/bin/env bash

device="intel_backlight"
brightness_file="/sys/class/backlight/$device/brightness"
max_brightness_file="/sys/class/backlight/$device/max_brightness"

on_change() {
    brightness=$(cat $brightness_file)
    max_brightness=$(cat $max_brightness_file)
    percentage=$(bc -l <<< "$brightness / $max_brightness * 100")
    json=$(jq \
        --arg brightness $brightness \
        --arg max_brightness $max_brightness \
        --arg percentage $percentage \
        -n '{ "brightness": $brightness, "max_brightness": $max_brightness, "percentage": $percentage }')

    echo $json
}

on_change

while inotifywait -qq -e close_write $brightness_file;
do
    on_change
done

