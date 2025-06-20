import markdown
from pathlib import Path

root_dir = Path(__file__).resolve().parent

def build_readme():
  print("Starting Readme build...")

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
  with open(targetFile, 'w', encoding="utf8") as f:
    destinationLines = "".join(destinationLines)
    f.write(destinationLines)
    print("README content copied into " + targetFile)

  print("Finished Readme build!")


def build_combine_css():
  print("Starting Combined CSS build...")

  # create initial variable values
  targetFile = "au.css"
  targetVersion = "v1.0"
  targetSrc = root_dir / "packages" / targetVersion / targetFile

  # delete current contents of the css file
  open(targetSrc, 'w').close()

  # make the 'take from' file names from some kind of array??
    # just repeat the process for all files inside the array?

  fileNames = ["au.reset.css", "au.flex.css"]

  for x in fileNames:
    fileSrc = root_dir / "packages" / targetVersion / x

    # read reset css
    with open(fileSrc, 'r', encoding="utf8") as f:
      fileContent = f.read()

    # write to destination html file
    with open(targetSrc, 'a', encoding="utf8") as f:
      # destinationLines = "".join(destinationLines)
      f.write(fileContent)
      print(x + " copied into " + targetFile)
      f.write("\n\n")

  print("Finished Combined CSS build!")


# actually call functions
build_readme()
build_combine_css()