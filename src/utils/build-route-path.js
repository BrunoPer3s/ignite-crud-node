// /users/:id

export function buildRoutePath(path) {
  const routeParametersRegex = /:([a-zA-Z]+)/g
  console.log(path.matchAll(routeParametersRegex));
}