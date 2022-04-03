# LOD4Mac

## What is this?

LOD is the Luxembourgish Online Dictionary, it is available on [lod.lu](https://www.lod.lu/). The purpose of this project is to package the definitions from LOD into a dictionary file compatible with Dictionary.app on MacOS, thus enabling the user to right-click with a mouse or to force tap with a trackpad on any word in luxembourgish in most of the apps and get directly access to its definition.

picture

## Installation

0. Create the folder `~/Library/Dictionaries` if it does not exist (in the Finder, you can go to this folder with <kbd>Command-Shift-G</kbd>)
1. Download the latest release from the [release page](https://github.com/AlainVagner/LOD4Mac/releases).
2. Unzip the zip archive.
3. Copy the folder named "Lëtzebuerger Online Dictionnaire (LOD).dictionary" into ~/Library/Dictionaries 
4. Open Dictionary.app
5. Go to the menu Dictionary > Preferences
6. In the list on top of the window, find in it the "Lëtzebuerger Online Dictionnaire (LOD)" and activate it.
7. Congratulations, the dictionary is now installed on your system! 

## Usage

### Get access to the definition of a word in most apps

When in an application supporting it (ex: Safari, TextEdit, Notes, ...), to get the definition of a word, you can [force click](https://support.apple.com/en-us/HT204352) on it if you have a trackpad or right-click then select "look up" in the menu. The first time you use this feature, you will need to configure it to display information coming from dictionaries.

video

### With Dictionary.app

You can select the LOD dictionary in the tabs on top of the window, then use the search field. For now, you can only search words in luxembourgish.

## Development

The dictionary is produced using [Apple's Dictionary Development Kit](https://github.com/SebastianSzturo/Dictionary-Development-Kit). A conversion script from the data coming from LOD and the format needed by the Dictionary Development is available in this repository.

To be able to generate the dictionary, please follow these steps:

1. Clone the Dictionary Development Kit
2. Clone this repository on your computer 
3. Install the required npm packages with `npm install`
4. The HTML from the definitions comes from lod.lu, all the pages from the site will be crawled locally. To do this, run `npm run crawl` (duration: ~ 10 hours)
5. Build the dictionary with `npm run build`. This command will also deploy the dictionary into your `~/Library/Dictionaries` folder and create an archive called `LOD.dictionary.zip` 

## Open Data

This dictionary is a reuse of the open data published by [ZLS](https://portal.education.lu/zls) on [data.public.lu](https://data.public.lu/):
- [Lëtzebuerger Online Dictionnaire](https://data.public.lu/fr/datasets/letzebuerger-online-dictionnaire/)
- [Lëtzebuerger Online Dictionnaire - komplett Wuertlëscht / complete wordlist ](https://data.public.lu/fr/datasets/letzebuerger-online-dictionnaire-komplett-wuertlescht-complete-wordlist/)


## License

This software is licensed under the [MIT license](./LICENSE). The dictionary producted by this software is published under [Creative Commons Zero](https://creativecommons.org/publicdomain/zero/1.0/deed.en) (public domain).





