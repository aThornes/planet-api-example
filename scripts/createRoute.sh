#!/bin/bash
basePath="$(dirname "$0")/.."

pathPrefix="$basePath/src/routes"

# Route creation script, makes making a new route a bit easier
valid_methods=("GET" "POST" "PUT" "DELETE" "PATCH" "OPTIONS")

# User inputted path
echo "Creating a new endpoint route"
echo "Enter your desired path:"
read path

# User inputted method
echo "Enter HTTP method:"
read method

methodLower=$(echo $method | tr '[:upper:]' '[:lower:]'])
methodUpper=$(echo $method | tr '[:lower:]' '[:upper:]'])

# Validate method is allowed
if [[ ! " ${valid_methods[@]} " =~ " ${methodUpper} " ]]; then
    echo "$methodUpper is not a valid HTTP method"
    exit 1
fi

full_path="$pathPrefix/$path/$methodLower"

# Validate path doesn't already exist
if [ -e "$full_path" ]; then
    echo "Endpoint path already in use"
    exit 1
fi

doc_file="$full_path/docs.yaml"
schema_file="$full_path/responseSchema.json"
ts_file="$full_path/handler.ts"

# Create folder structure
mkdir -p "$pathPrefix/$path/$methodLower"

# Write docs.yaml file
echo "tags:" > $doc_file
echo "  - $(echo "$path" | cut -d'/' -f1)" >> $doc_file
echo "summary: Test endpoint" >> $doc_file
echo "description: Just an intial test" >> $doc_file
echo "responses:" >> $doc_file
echo "  \"200\":" >> $doc_file
echo "    description: Hello World!" >> $doc_file
echo "  \"400\":" >> $doc_file
echo "    description: Response description" >> $doc_file


# Write response schema file
echo "{" > $schema_file
echo "  \"\$schema\": \"http://json-schema.org/draft-07/schema\", " >> $schema_file
echo "  \"\$id\": \"/test/get/responseSchema\", " >> $schema_file
echo "  \"title\": \"Example response schema\", " >> $schema_file
echo "  \"description\": \"Example response schema for test endpoint\", " >> $schema_file
echo "  \"type\": \"object\", " >> $schema_file
echo "  \"properties\": { " >> $schema_file
echo "    \"message\": { " >> $schema_file
echo "      \"type\": \"string\", " >> $schema_file
echo "      \"description\": \"Response text from endpoint\", " >> $schema_file
echo "      \"pattern\": \"^[a-zA-Z0-9!]*$\", " >> $schema_file
echo "      \"minLength\": 0, " >> $schema_file
echo "      \"maxLength\": 256, " >> $schema_file
echo "      \"example\": \"Hello world!\" " >> $schema_file
echo "    } " >> $schema_file
echo "  }, " >> $schema_file
echo "  \"additionalProperties\": false " >> $schema_file
echo "}" >> $schema_file

# Write handler.ts file
echo "const handler = async (req: ExpressRequest, res: ExpressResponse) => {" > $ts_file
echo "  return res.status(200).json({ message: \"Hello, World!\" });" >> $ts_file
echo "};" >> $ts_file
echo "" >> $ts_file
echo "export default handler;" >> $ts_file