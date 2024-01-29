#!/usr/bin/env bash

reload() {
    pkill -15 ags
    ags &
}

reload

while inotifywait -e close_write -r ./src; do
    reload
done
