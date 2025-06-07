import fs from 'fs'
import path from 'path'
import { sync as globSync } from 'glob'
import { parse } from '@babel/parser'
import { File, Directive } from '@babel/types'
import { fileURLToPath } from 'url'

type ClientManifest = {
  [id: string]: {
    id: string;
    chunks: string[];
    name: string;
  }
}

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

  return ast.program.directives.some(
    (directive: Directive) => directive.value.value === 'use client'
  )
}

function generateClientManifest() {
  const clientComponents = globSync('**/*.{tsx,jsx}', {
    cwd: COMPONENTS_DIR,
    absolute: true,
  }).filter((filepath) => {
    const content = fs.readFileSync(filepath, 'utf-8')
    return findUseClient(content)
  })
  
  
  const manifest: ClientManifest = {}
  
  clientComponents.forEach((filepath) => {
    const relativePath = path.relative(COMPONENTS_DIR, filepath)
    const filename = path.basename(relativePath)
    const modulePath = `./src/components/${relativePath}`
    
    manifest[filename] = {
      id: modulePath.replace(/\\/g, '/'),
      chunks: ['index'],
      name: path.basename(filename, path.extname(filename))
    }
  })
  
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(manifest, null, 2))
  console.log(`클라이언트 매니페스트 생성 : ${OUTPUT_PATH}`)
}

generateClientManifest()
