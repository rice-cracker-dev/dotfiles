#!/usr/bin/env bash

eval $(xdotool getactivewindow getwindowgeometry --shell)
flameshot screen --region ${WIDTH}x${HEIGHT}+${X}+${Y} -c
