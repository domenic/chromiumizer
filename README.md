# Chromiumizer

This is a progressive web app for converting an image into a "Chromiumized" version, i.e. one that uses the [Chromium](https://www.chromium.org/) color palette. I originally created it so I could have a distinguishable avatar image for my @chromium.org email address.

## Browser compatibility and interop

Since this project is a playground for me, I used all the latest fancy web technologies, and in particular JavaScript modules. As of the time of this writing, [they only work in Chrome and Safari](https://caniuse.com/#feat=es6-module). So that sets a lower bound.

However, I wasn't able to get this working on Safari on my iPad. (After uploading an image, nothing happens.) So it doesn't work in anything but Chrome for now :(. Maybe we can debug what's causing failures in Safari and find out what kind of interop issue is present there.

Some people have also reported issues, even on Chrome, with desktop drag-and-drop functionality. It works fine on Windows 10, but maybe we can debug it on other operating systems and see what type of interop issue there is to be discovered in that regard.

## Credits

The original impetus for this comes from [@bsittler](https://github.com/bsittler/), who suggested a series of arcane command-line tools one could string together to achieve this effect. I thought, why not just use web technologies, and get a nice user interface while we're at it? Thus, Chromiumizer was born. Thanks to Ben for showing me the right underlying technique!
