#!/usr/bin/env bash
root="$HOME/profile"

# init submodules
git submodule update --init --recursive

root_paths=$(find "$root/root" -maxdepth 1 -mindepth 1 -type f)
dots_paths=$(find "$root/dots/" -maxdepth 1 -mindepth 1) 

# symlink nvchad
ln -sfn $root/dots/nvchad $root/dots/nvim/lua/custom

# symlink to dots and such
while IFS= read -r line; do
  destination="$HOME/$(basename -- $line)"
  rm -rf $destination
  ln -sfn $line $destination
done <<< "$root_paths"

while IFS= read -r line; do
  destination="$HOME/.config/$(basename -- $line)"
  rm -rf $destination
  ln -sfn $line $destination
done <<< "$dots_paths"
