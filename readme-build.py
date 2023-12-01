import markdown

# create initial variable values
targetFile = "index.html"
targetType = "section"
targetSel = "</" + targetType
beginTarget, endTarget = 0, 0

# read markdown file
with open('README.md', 'r', encoding="utf8") as f:
  readmeMarkdown = f.read()

# read destination html file
with open(targetFile, 'r', encoding="utf8") as f:
  destinationLines = f.readlines()
  for line in destinationLines:
    # check if readme section exists & where it ends
    if line.find('data-readme-marker') != -1:
      # get index of where section begins
      beginTarget = destinationLines.index(line) + 1
      # get element type & end tag to query
      targetType = "".join(line)
      targetType = targetType.split("<")
      targetType = targetType[1].split(" ")
      targetSel = "</" + str(targetType[0])

    if line.find(targetSel) != -1:
      # get index of where section ends
      endTarget = destinationLines.index(line) - 1
      break;

# remove existing section (but keep end tag)
del destinationLines[beginTarget:endTarget]
print("Removed content in marked section")

# turn the markdown into html
# extensions for keeping code blocks intact and to account for my usual tab spacing
readmeHTML = markdown.markdown(readmeMarkdown, extensions = ['fenced_code'], tab_length = 2) + "\n"

# insert rendered HTML into destination
destinationLines.insert(beginTarget, readmeHTML)

# write to destination html file
with open('index.html', 'w', encoding="utf8") as f:
  destinationLines = "".join(destinationLines)
  f.write(destinationLines)
  print("README content copied into " + targetFile)
