clone-story
==========================

Clones a Pivotal Ticket Story via a JavaScript bookmarklet.

This is a known issue over at Pivotal and it appears they may eventually get around to implementing it themselves sometime in 2014 per this discussion:

http://community.pivotaltracker.com/pivotal/topics/new_feature_duplicate_story

This JavaScript bookmarklet was created to deal with a minor annoyance with PivotalTracker when attempting to do iteration planning and wanting to clone a bunch of tickets when creating stories.

I decided to go with a bookmarklet approach because I use Safari and don't enjoy installing plugins if not totally necessary. 

## Installation

* copy source from bookmarklet.js
* create new bookmark in your browser
* paste code into the 'address' field

## Usage

The bookmarklet duplicates the Pivotal Tracker story that is currently selected via a focus on the textarea. It will prompt you if you have not selected the text field of the ticket you wish to duplicate/clone.

![Example of Usage](https://raw.github.com/mjelks/pivotaltracker-clone-story/master/img/screen1.png "Usage Example (Screenshot 1)")

## Compatibility

Tested in the latest version of Chrome and Safari 6.1. You will need at least Safari 6.0+ as I believe that is that first version that supports the MutationObserver. Here is a handy chart with the latest support:

http://caniuse.com/mutationobserver


## Current Issues

* This is heavily reliant on jQuery and specific selectors. I can imagine this will break if the selector(s) change. Any better approaches would be appreciated, but this is a quick solution.
* Currently the bookmarklet may behave strangely due to the MutationObserver(). I am currently unable to run the .disconnect() method without it not working (?)
* ~~copying owner. I need to add another function to handle that. any other fields should be added as additional functions and added as part of the observer method. Make sure to add any values to the json object that gets passed to the hidden field.~~

## Contributing

If you want to alter this code (totally fine as it's under the MIT license), please start at the source.js file. Feel free to modify that since it is nicely commented. I have created a perl script that will strip out comments and console.log statements and is used to generate the final bookmarklet.js file. To execute simply run the command:

```
perl compile.pl
```

from the source repo location.
