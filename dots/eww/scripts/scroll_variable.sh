var=$(eww get $1)
prevar=$4
dir=$2
length=$3

eww update $4=$var

if [[ $dir = "up" ]]; then
    if [[ $var -lt $(($length - 1)) ]]; then
        eww update $1=$(($var + 1))
    else
        eww update $1=0
    fi
else
    if [[ $var -gt 0 ]]; then
        eww update $1=$(($var - 1))
    else
        eww update $1=$(($length - 1))
    fi
fi
