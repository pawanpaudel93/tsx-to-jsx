# tsx-to-jsx

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![JSDocs][jsdocs-src]][jsdocs-href]
[![License][license-src]][license-href]

`tsx-to-jsx` is a Node.js package that converts TypeScript (ts/tsx) files to JavaScript (js/jsx) files from a specified source directory, saving the result in a destination directory.

## Installation

Before using the tool, make sure you have [Node.js](https://nodejs.org/) installed on your machine. Please install the package using your preferred package manager.

```bash
npm install tsx-to-jsx
```

```bash
yarn add tsx-to-jsx
```

```bash
pnpm add tsx-to-jsx
```

```bash
bun install tsx-to-jsx
```

## Usage

```Typescript
import { convertTsxToJsx } from 'tsx-to-jsx'
const srcDirectory = "/Users/pawan/ts/ReactApp/src"
const destDirectory = "/Users/pawan/js/ReactApp/src"
await convertTsxToJsx(srcDirectory, dstDirectory)
```

## License

[MIT](./LICENSE) License © 2023-PRESENT [Pawan Paudel](https://github.com/pawanpaudel93)

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/tsx-to-jsx?style=flat&colorA=080f12&colorB=1fa669
[npm-version-href]: https://npmjs.com/package/tsx-to-jsx
[npm-downloads-src]: https://img.shields.io/npm/dm/tsx-to-jsx?style=flat&colorA=080f12&colorB=1fa669
[npm-downloads-href]: https://npmjs.com/package/tsx-to-jsx
[bundle-src]: https://img.shields.io/bundlephobia/minzip/tsx-to-jsx?style=flat&colorA=080f12&colorB=1fa669&label=minzip
[bundle-href]: https://bundlephobia.com/result?p=tsx-to-jsx
[license-src]: https://img.shields.io/github/license/pawanpaudel93/tsx-to-jsx.svg?style=flat&colorA=080f12&colorB=1fa669
[license-href]: https://github.com/pawanpaudel93/tsx-to-jsx/blob/main/LICENSE
[jsdocs-src]: https://img.shields.io/badge/jsdocs-reference-080f12?style=flat&colorA=080f12&colorB=1fa669
[jsdocs-href]: https://www.jsdocs.io/package/tsx-to-jsx
