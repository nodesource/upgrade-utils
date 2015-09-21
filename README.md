# upgrade-utils

**A tool from [NodeSource](https://nodesource.com/) to help with the process of upgrading modules to the latest version of Node.js, replacing old [NAN](https://github.com/nodejs/nan) C++ bindings and adjusting for Node.js API changes.**

## SYPNOSIS
`upgrade-utils [-p <path>] [-e <extensions>] [OPTIONS]`

## DESCRIPTION
Search, report and optionally replace changes in a module's code, helping in the process of updating to the latest Node version.

## USAGE
Using with no parameters will search recursively by default in the current directory for files with extensions: .js, .cc .c .cpp .h and .hh, and will display required changes to apply in them in order to update the module to the latest version of Node and NAN. a log will generate will all the information in an HTML file opening this in a browser

`upgrade-utils`

You can customize the path where the command will act with *-p* or *--path* options

`upgrade-utils -p /the/module/path`
`upgrade-utils --path /the/module/path`

You can customize the extensions to search for with *-e* or *--extensions* options and providing a coma separated list of extensions

`upgrade-utils -e .c,.cpp,.cp`
`upgrade-utils --extensions .c,.cpp,.cp`

You can perform all changes in all files with *-u* or *--update* options

`upgrade-utils -u`
`upgrade-utils --update`

You can avoid launching the browser with *-q* or *--quiet*

`upgrade-utils -q`
`upgrade-utils --quiet`

## Authors and Contributors

<table><tbody>
<tr><th align="left">Adrián Estrada</th><td><a href="https://github.com/edsadr">GitHub/edsadr</a></td><td><a href="http://twitter.com/edsadr">Twitter/@edsadr</a></td></tr>
<tr><th align="left">Julián Duque</th><td><a href="https://github.com/julianduque">GitHub/julianduque</a></td><td><a href="http://twitter.com/julian_duque">Twitter/@julian_duque</a></td></tr>
</tbody></table>

Contributions are welcomed from anyone wanting to improve this project!

## License & Copyright

**upgrade-utils** is Copyright (c) 2015 NodeSource and licensed under the MIT licence. All rights not explicitly granted in the MIT license are reserved. See the included LICENSE.md file for more details.
