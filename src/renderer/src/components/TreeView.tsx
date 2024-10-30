// TreeView.js
import React from 'react'

const TreeNode = ({ node }) => {
  const [expanded, setExpanded] = React.useState(false)

  if (node.isDirectory) {
    return (
      <div>
        <div
          onClick={() => setExpanded(!expanded)}
          style={{ cursor: 'pointer', fontWeight: 'bold' }}
        >
          {expanded ? '📂' : '📁'} {node.name}
        </div>
        {expanded && (
          <div style={{ paddingLeft: 20 }}>
            {node.children.map((child, index) => (
              <TreeNode key={index} node={child} />
            ))}
          </div>
        )}
      </div>
    )
  }

  return <div style={{ paddingLeft: 20 }}>📄 {node.name}</div>
}

const TreeView = ({ data }) => {
  return (
    <div>
      {data.map((node, index) => (
        <TreeNode key={index} node={node} />
      ))}
    </div>
  )
}

export default TreeView
