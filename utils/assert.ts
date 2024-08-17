export { assert }

const projectNpmPackageName = 'part-regex'
const projectRepo = 'https://github.com/brillout/part-regex'

function assert(condition: unknown) {
  if (condition) return
  throw new Error(
    `[${projectNpmPackageName}][Internal Failure] You stumbled upon a bug in \`${projectNpmPackageName}\`'s source code (an internal \`assert()\` failed). This should definitely not be happening, and you should create a new GitHub issue at ${projectRepo}/issues/new that includes this error stack (the error stack is usually enough for the maintainers to debug the error). A fix will be written promptly.`,
  )
}
