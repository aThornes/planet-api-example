#!/bin/bash
cd "$(dirname "$0")"
cd ..

red=1
green=2
blue=6

write () {
  if [ -t 1 ]; then
    tput setaf $green
    echo -n "[Planet API] " 
    tput setaf $1
    echo -n $2
    tput sgr0
  else
    echo -n "[Planet API] "
    echo -n $2
  fi
}

write_line () {
  if [ -t 1 ]; then
    tput setaf $green
    if [ -z "$3" ] || [ "$3" = "true" ]; then
      echo -n "[Planet API] " 
    fi
    tput setaf $1
    echo $2
    tput sgr0
  else
    if [ -z "$3" ] || [ "$3" = "true" ]; then
      echo -n "[Planet API] "
    fi
    echo $2
  fi
}

write_line "$blue" "Building api docs"

node ./scripts/js/yamlBuilder.js

write "$blue" "API docs compiled. File modified: "
write_line "$green" "/docs/openapi/apiDocs.yaml" false
