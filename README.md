# LOD4Mac

## What is this?

LOD is the Luxembourgish Online Dictionary, it is available on [lod.lu](https://www.lod.lu/). The purpose of this project is to package the definitions from LOD into a dictionary file compatible with Dictionary.app on MacOS, thus enabling the user to right-click with a mouse or to force tap with a trackpad on any word in Luxembourgish in most of the apps and get a direct access to its definition.

<img width="831" alt="Screenshot of TextEdit showing the definition of a luxembourgish word" src="https://user-images.githubusercontent.com/16536731/161426311-aaaf9047-6061-4fd1-91c4-48fde6d57e58.png">


## Installation

0. Create the folder `~/Library/Dictionaries` if it does not exist (in the Finder, you can go to this folder with <kbd>Command-Shift-G</kbd>)
1. Download the latest release from the [release page](https://github.com/AlainVagner/LOD4Mac/releases). The file name follows the pattern `LOD.dictionary.vX.X.X.zip`.
2. Unzip the zip archive.
3. Copy the folder named "Lëtzebuerger Online Dictionnaire (LOD).dictionary" into `~/Library/Dictionaries` 
4. Open Dictionary.app
5. Go to the menu "Dictionary" > "Preferences"
6. In the list at the top of the window, find in it the "Lëtzebuerger Online Dictionnaire (LOD)" and activate it.
7. Congratulations, the dictionary is now installed on your system! :tada:

## Usage

### Get access to the definition of a word in most apps

When in an application supporting it (ex: Safari, TextEdit, Notes, ...), to get the definition of a word, you can [force-click](https://support.apple.com/en-us/HT204352) on it if you have a trackpad or right-click then select "Look Up" in the menu. The first time you use this feature, you will need to configure it to display information coming from dictionaries.

https://user-images.githubusercontent.com/16536731/161426372-de15175c-85ac-4d01-b598-3aa7b7266778.mp4

### With Dictionary.app

You can select the LOD dictionary in the tabs on top of the window, then use the search field. For now, you can only search words in Luxembourgish.

<img width="957" alt="Screenshot of Dictionary.app showing the definition of the word Squirrel in Luxembourgish" src="https://user-images.githubusercontent.com/16536731/161427895-2d26de33-fd37-4016-aedc-bde898287c0c.png">

### With Spotlight

It is possible to search the definition of a word with [Spotlight](https://support.apple.com/en-gb/guide/mac-help/mchlp1008/mac). You can type the first letters of a word and Spotlight will try to automatically complete the word. In the results list, in the "definition" section, you can select the item corresponding to the word you are looking for and access its definition directly in the Spotlight window.

<img width="792" alt="Screenshot of a Spotlight window with a luxembourgish word in the search field and the definition is shown" src="https://user-images.githubusercontent.com/16536731/162815758-67174475-98c8-452e-9350-5e254240987c.png">

To enable this feature, you may need to configure it in the "System Preferences" then "Spotlight" and activate "Definition" in the "search results" tab.

## Development

The dictionary is produced using [Apple's Dictionary Development Kit](https://github.com/SebastianSzturo/Dictionary-Development-Kit). A conversion script from the data coming from LOD and the format needed by the Dictionary Development is available in this repository.

To be able to generate the dictionary, please follow these steps:

0. Clone the Dictionary Development Kit
1. Clone this repository 
2. Adjust if necessary the variable DICT_BUILD_TOOL_DIR in `ddk_lod_project/Makefile`
3. Install the required npm packages with `npm install`
4. The HTML from the definitions comes from lod.lu, all the pages from the site will be crawled locally. To do this, run `npm run crawl` (duration: ~ 10 hours)
5. Build the dictionary with `npm run build`. This command will also deploy the dictionary into your `~/Library/Dictionaries` folder and create an archive called `LOD.dictionary.zip` 

## Open Data

This dictionary is a reuse of the open data published by [ZLS](https://portal.education.lu/zls) on [data.public.lu](https://data.public.lu/):
- [Lëtzebuerger Online Dictionnaire](https://data.public.lu/fr/datasets/letzebuerger-online-dictionnaire/)
- [Lëtzebuerger Online Dictionnaire - komplett Wuertlëscht / complete wordlist ](https://data.public.lu/fr/datasets/letzebuerger-online-dictionnaire-komplett-wuertlescht-complete-wordlist/)

## Related projects

The [dictionary-lb-lu](https://github.com/spellchecker-lu/dictionary-lb-lu/) project from [Spellchecker.lu](https://spellchecker.lu/) is a HunSpell dictionary for the Luxembourgish language. MacOS can use HunSpell dictionaries for spell checking. Once you have installed this dictionary onto your system, you will be able to use it for spell checking in most applications.

<img width="464" alt="Screenshot of a text field in Safari containing some text with spelling errors and a pop-up showing correction proposals" src="https://user-images.githubusercontent.com/16536731/162820443-417d725d-f095-4af2-97a1-68602616bfdd.png">

In the compatible apps, you can find the spell checker by right-clicking on a text input area and selecting "Spelling and grammar" then "Show spelling and grammar".

When using the MacOS spell checker, it seems to be more reliable to select the spelling dictionary than to rely on automatic language detection. 

<img width="719" alt="Screenshot of the MacOS spellchecker window" src="https://user-images.githubusercontent.com/16536731/162820513-d7554b08-6644-4816-9c7e-2891ae38f529.png">

To install the Luxembourgish HunSpell dictionary, you need to download the files lb_LU.aff and lb_LU.dic from the [dictionary-lb-lu](https://github.com/spellchecker-lu/dictionary-lb-lu/) repository and copy them into `~/Library/Spelling` (create this folder if it does not exist yet). Then go to the "System preferences" > "Keyboard" > "Text". In the "Spelling" drop-down, select "Set up..." at the bottom of the list and then activate "Lëtzebuergesch (Library)". This dictionary will now be available in the MacOS spell checker.


## License

This software is licensed under the [MIT license](./LICENSE). The dictionary produced by this software is published under [Creative Commons Zero](https://creativecommons.org/publicdomain/zero/1.0/deed.en) (public domain).





