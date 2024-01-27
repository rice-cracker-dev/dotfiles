mode=$1

# export installed package list
if [[ $mode = x ]]; then
    packages=$(yay -Q | awk '{ print $1 }' | tr '\n' ' ')
    echo $packages > packages.txt
fi
