// Recursive function to build a directory tree
import { readdir } from 'fs/promises'
import path from 'path'
export const getDirectoryTree = async (directoryPath): Promise<any[]> => {
  const items = await readdir(directoryPath, { withFileTypes: true })
  const tree: any[] = []

  for (const item of items) {
    const fullPath = path.join(directoryPath, item.name)
    const isDirectory = item.isDirectory()

    tree.push({
      name: item.name,
      path: fullPath,
      isDirectory,
      children: isDirectory ? await getDirectoryTree(fullPath) : []
    })
  }

  return tree
}
