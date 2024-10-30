import { promises as fs } from 'fs'
import * as path from 'path'

interface ExtensionMapping {
  from: string
  to: string
}

export interface ConversionOptions {
  path: string
  extensions: ExtensionMapping[]
  excludes?: string[]
}

export async function convertExtensions({
  path: basePath,
  extensions,
  excludes = []
}: ConversionOptions): Promise<void> {
  const files = await getFilesRecursively(basePath)

  for (const file of files) {
    const extensionMapping = extensions.find((ext) => file.endsWith(ext.from))
    if (extensionMapping && !isExcluded(file, excludes)) {
      const newFilePath = file.replace(new RegExp(`${extensionMapping.from}$`), extensionMapping.to)
      await fs.rename(file, newFilePath)
      console.log(`Renamed: ${file} -> ${newFilePath}`)
    }
  }
}

// Helper function: Recursively gets all files in a directory
async function getFilesRecursively(dir: string): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name)
      return entry.isDirectory() ? await getFilesRecursively(fullPath) : fullPath
    })
  )
  return Array.prototype.concat(...files)
}

// Helper function: Checks if a file is in the excludes list
function isExcluded(filePath: string, excludes: string[]): boolean {
  return excludes.some((pattern) => {
    const regex = new RegExp(`^${pattern.replace(/\*/g, '.*')}$`)
    return regex.test(filePath)
  })
}

// Usage
convertExtensions({
  path: './src',
  extensions: [
    { from: '.js', to: '.ts' },
    { from: '.jsx', to: '.tsx' }
  ],
  excludes: ['my.file.jsx', '*.felan.jsx']
})
  .then(() => console.log('Conversion complete!'))
  .catch((err) => console.error('Error during conversion:', err))
