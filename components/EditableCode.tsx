import React from 'react'
import Code from './Code'

function EditableCode({ code }: any) {
  return (
    <Code
        code={code}
        lang="tsx"
        theme="ayu-dark"
        filename="app/page.tsx"
      />
  )
}

export default EditableCode