import json

# Open the file in read mode
with open('op_types.txt', 'r') as file:
    # Read lines in the file
    lines = file.readlines()

# Print each line
counter = 0;
typeDict = {}
for line in lines:
    typeDict[counter] = line.strip()
    counter +=1

print(json.dumps(typeDict, indent=2))
