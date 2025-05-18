const { execSync } = require("child_process");
const fs = require("fs");
const config = JSON.parse(fs.readFileSync("./src/router/run-config.json", "utf8"));
function generateRoutes(route, parentPath = "") {
  const routes = [];
  const currentPath = `${parentPath}/${route.name}`;

  if (route.children) {
    route.children.forEach((child) => {
      routes.push(...generateRoutes(child, currentPath));
    });
  } else {
    routes.push({
      path: currentPath,
    });
  }

  return routes;
}
let routes = []
const routeList = config.routes.map(item => {
    return generateRoutes(item)
});
routeList.forEach(item => {
    item.forEach(child => {
        routes.push(child)
    })
})
routes.forEach((item) => {
  console.log(`Building with abc=${item.path}`);
  execSync(`npm run build --abc=${item.path}`, { stdio: "inherit" });
});
