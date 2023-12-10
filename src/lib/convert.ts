import path from 'node:path'
import fsPromises from 'node:fs/promises'
import fs from 'node:fs'
import { glob } from 'glob'
import { execa } from 'execa'
import { logger } from './utils'

/**
 * The text to be replaced in the file content.
 * @type {string}
 */
const TEXT_TO_REPLACE: string = '// COMMENT-TO-REPLACE'

/**
 * Removes comments matching a specific text in the given file paths.
 * @param {fs.PathLike[] | fsPromises.FileHandle[]} filePaths - Array of file paths or file handles.
 * @returns {Promise<void[]>} A promise that resolves when all files have been processed.
 */
async function removeComments(filePaths: any[]): Promise<void[]> {
  return Promise.all(
    filePaths.map(async (file: fs.PathLike | fsPromises.FileHandle) => {
      try {
        let content = await fsPromises.readFile(file, 'utf8')
        content = content
          .split('\n')
          .map(line => (line.trim() === TEXT_TO_REPLACE ? '' : line))
          .join('\n')
        await fsPromises.writeFile(file, content)
      }
      catch (error: any) {
        logger.error(`${error.message}`)
      }
    }),
  )
}

/**
 * Adds comments to the files where lines are empty.
 * @param {fs.PathLike[] | fsPromises.FileHandle[]} filePaths - Array of file paths or file handles.
 * @returns {Promise<void[]>} A promise that resolves when all files have been processed.
 */
async function addComments(filePaths: any[]): Promise<void[]> {
  return Promise.all(
    filePaths.map(async (file) => {
      let content = await fsPromises.readFile(file, 'utf8')
      content = content
        .split('\n')
        .map(line => (line.trim() === '' ? TEXT_TO_REPLACE : line))
        .join('\n')
      await fsPromises.writeFile(file, content)
    }),
  )
}

/**
 * Retrieves file paths matching a pattern in the source directory.
 * @param {string} srcDir - Source directory path.
 * @param {string} pattern - Glob pattern to match files.
 * @returns {Promise<string[]>} A promise that resolves with an array of matching file paths.
 */
async function getFilePaths(srcDir: string, pattern: string): Promise<string[]> {
  return glob(path.join(srcDir, pattern), {
    ignore: path.join(srcDir, `/node_modules/**`),
  })
}

/**
 * Converts TypeScript (.tsx) files to JavaScript (.jsx) files in a source directory.
 * Removes and adds comments as specified, compiles TypeScript to JavaScript, and runs Prettier.
 * @param {string} srcDir - Source directory path containing TypeScript files.
 * @param {string} dstDir - Destination directory path for the compiled JavaScript files.
 * @returns {Promise<void>} A promise that resolves when the conversion process is complete.
 */
export async function convertTsxToJsx(srcDir: string, dstDir: string): Promise<void> {
  try {
    if (!fs.existsSync(srcDir))
      throw new Error('Source directory does not exist.')

    const tsxFiles = await getFilePaths(srcDir, `/**/*.{ts,tsx}`)

    await addComments(tsxFiles)

    // Compile tsx files to jsx
    await execa('npx', `tsc --jsx preserve -t esnext --outDir ${dstDir} --noEmit false`.split(' '), {
      cwd: srcDir,
      stdout: 'ignore',
    })

    const jsxFiles = await getFilePaths(dstDir, `/**/*.{js,jsx}`)

    await removeComments([...tsxFiles, ...jsxFiles])

    // Run prettier on javascript files
    await execa('npx', `prettier --write ${dstDir}`.split(' '), {
      stdout: 'ignore',
    })
  }
  catch (error: any) {
    logger.error(`${error.message}`)
  }
}
