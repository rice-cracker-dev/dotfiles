#!/usr/bin/env bash
source ./commons.sh

# init submodules
git submodule update --init --recursive

home_paths=$(find $home -maxdepth 1 -mindepth 1 -type f)
dots_paths=$(find $dots -maxdepth 1 -mindepth 1) 

# copy all ./root files to /
sudo rsync -rv ./root/ /

# symlink nvchad
ln -sfn $dots/nvchad $dots/nvim/lua/custom

# symlink to dots and such
while IFS= read -r line; do
  destination="$HOME/$(basename -- $line)"
  rm -rf $destination
  ln -sfn $line $destination
done <<< "$home_paths"

while IFS= read -r line; do
  destination="$HOME/.config/$(basename -- $line)"
  rm -rf $destination
  ln -sfn $line $destination
done <<< "$dots_paths"
