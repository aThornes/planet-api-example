#!/bin/bash

# ----------------------------------------------------------------------
#   This script is used to build all routes for the application
#   Routes are picked up by app.py through a function call
# ----------------------------------------------------------------------

function get_camelcase() {
    file=$1
    directory=$(dirname $file)
    camelCase=$(echo $directory | awk -F/ '{for (i=2; i<=NF; i++) $i=toupper(substr($i,1,1)) substr($i,2)} 1' OFS="")
    echo $camelCase
}

routes_dir="$(dirname "$0")/src/routes"
output_file="$(dirname "$0")/src/router.ts"

valid_methods=("GET" "POST" "PUT" "DELETE" "PATCH" "OPTIONS")

# Retrieve all routes from routes_dir folder
files=$(find $routes_dir -type f -name "*.ts" | sed -e "s|^$routes_dir/||" -e 's/\.[^.]*$//')

# Write notice on top of router.ts file
echo "/*" > $output_file
echo "  |---------------------------------------------------------|" >> $output_file
echo "  |---                                                    --|" >> $output_file
echo "  |--                    DO NOT MODIFY                    --|" >> $output_file
echo "  |--        Autogenerated file: built by build.sh        --|" >> $output_file
echo "  |---                                                    --|" >> $output_file
echo "  |---------------------------------------------------------|" >> $output_file
echo "*/" >> $output_file


# Write imports to file
for file in $files
do
    camelCase=$(get_camelcase $file)
    echo "import $camelCase from './routes/$file';" >> $output_file
done

# Defines our function of which is called by app.ts
echo "" >> $output_file
echo "const defineRoutes = (app: import('express').Application) => {" >> $output_file

# Include each router to application
for file in $files
do
    camelCase=$(get_camelcase $file)
    
    # Extract method from final directory and make uppercase
    method=$(basename $(dirname $file))
    methodUpper=$(echo $method | tr '[:lower:]' '[:upper:]'])
    methodLower=$(echo $method | tr '[:upper:]' '[:lower:]')

    # Validate method is allowed
    if [[ ! " ${valid_methods[@]} " =~ " ${methodUpper} " ]]; then
        echo "$methodUpper is not a valid HTTP method, please check your file path name at $file.py"
        exit 1
    fi

    # Prefix is directory path without method item
    prefix=$(dirname $(dirname $file))

    # Write comment and router include to file
    echo "  // $methodUpper /$prefix" >> $output_file
    echo "  app.$methodLower('/$prefix', $camelCase);" >> $output_file
    echo "" >> $output_file
done

echo "};" >> $output_file
echo "" >> $output_file
echo "export default defineRoutes;" >> $output_file