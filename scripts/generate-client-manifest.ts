import fs from 'fs'
import path from 'path'
import { sync as globSync } from 'glob'
import { parse } from '@babel/parser'
import { File, Directive } from '@babel/types'
import { fileURLToPath } from 'url'

type ClientManifest = Record<string, string>

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const COMPONENTS_DIR = path.resolve(__dirname, '../src/components')
const OUTPUT_PATH = path.resolve(__dirname, '../dist/client-manifest.json')

function findUseClient(fileContent: string): boolean {
  let ast: File
  try {
    ast = parse(fileContent, {
      sourceType: 'module',
      plugins: ['jsx', 'typescript'],
    })
  } catch {
    return false
  }

  const directives = ast.program.directives as Directive[]
  for (const dir of directives) {
    const literal = dir.value
    if (literal.type === 'DirectiveLiteral' && literal.value === 'use client') {
      return true
    }
  }

  return false
}

function generateManifest() {
  const pattern = `${COMPONENTS_DIR}/**/*.tsx`
  const files = globSync(pattern)

  const manifest: ClientManifest = {}

  for (const filePath of files) {
    let content: string
    try {
      content = fs.readFileSync(filePath, 'utf-8')
    } catch {
      continue
    }

    if (findUseClient(content)) {
      const relative = path.relative(COMPONENTS_DIR, filePath).replace(/\\/g, '/')
      manifest[relative] = `client:${relative}`
    }
  }

  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true })
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(manifest, null, 2), 'utf-8')
}

generateManifest()
