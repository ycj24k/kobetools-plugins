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
const routes = generateRoutes(config.routes);
routes.forEach((item) => {
  console.log(`Building with abc=${item.path}`);
  execSync(`npm run build --abc=${item.path}`, { stdio: "inherit" });
});
